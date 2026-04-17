from datetime import datetime, timedelta

from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.game import GameResult
from app.models.report import Report
from app.models.user import User
from app.database import mongo_db


def generate_weekly_report(db: Session, user_id: str) -> Report | None:
    now = datetime.now()
    week_ago = now - timedelta(days=7)

    results = db.query(GameResult).filter(
        GameResult.user_id == user_id,
        GameResult.created_at >= week_ago,
    ).all()

    if not results:
        return None

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        return None

    memory_scores = [r.accuracy for r in results if r.game_id]
    avg_accuracy = sum(memory_scores) / len(memory_scores) if memory_scores else 0

    domain_scores = _calculate_domain_scores(results)

    emotion_summary = _get_emotion_summary(user_id, week_ago, now)

    overall = sum(domain_scores.values()) / len(domain_scores) if domain_scores else 0

    is_warning = _check_warning(db, user_id, week_ago)

    suggestions = _generate_suggestions(domain_scores, emotion_summary, is_warning)

    report = Report(
        user_id=user_id,
        report_type="weekly",
        period_start=week_ago,
        period_end=now,
        memory_score=domain_scores.get("memory", 0),
        language_score=domain_scores.get("language", 0),
        spatial_score=domain_scores.get("spatial", 0),
        semantic_score=domain_scores.get("semantic", 0),
        overall_score=overall,
        emotion_summary=emotion_summary,
        suggestions=suggestions,
        is_warning=is_warning,
    )
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


def get_reports(db: Session, user_id: str, report_type: str | None = None, limit: int = 10) -> list[Report]:
    query = db.query(Report).filter(Report.user_id == user_id)
    if report_type:
        query = query.filter(Report.report_type == report_type)
    return query.order_by(Report.created_at.desc()).limit(limit).all()


def _calculate_domain_scores(results: list[GameResult]) -> dict:
    domain_map = {
        "memory": [],
        "language": [],
        "spatial": [],
        "semantic": [],
    }

    for r in results:
        detail = r.detail or {}
        domain = detail.get("cognitive_domain", "memory")
        if domain in domain_map:
            domain_map[domain].append(r.accuracy)

    scores = {}
    for domain, accuracies in domain_map.items():
        if accuracies:
            scores[domain] = round(sum(accuracies) / len(accuracies) * 100, 1)
    return scores


def _get_emotion_summary(user_id: str, start: datetime, end: datetime) -> dict:
    if not mongo_db:
        return {"neutral": 1}
    try:
        collection = mongo_db["conversations"]
        pipeline = [
            {"$match": {"user_id": user_id, "created_at": {"$gte": start, "$lte": end}}},
            {"$group": {"_id": "$emotion", "count": {"$sum": 1}}},
        ]
        import asyncio
        loop = asyncio.get_event_loop()
        if loop.is_running():
            return {"neutral": 1}
        result = loop.run_until_complete(collection.aggregate(pipeline).to_list(length=10))
        return {item["_id"]: item["count"] for item in result}
    except Exception:
        return {"neutral": 1}


def _check_warning(db: Session, user_id: str, since: datetime) -> bool:
    results = db.query(GameResult).filter(
        GameResult.user_id == user_id,
        GameResult.created_at >= since,
    ).order_by(GameResult.created_at).all()

    if len(results) < 3:
        return False

    half = len(results) // 2
    first_half_avg = sum(r.accuracy for r in results[:half]) / half
    second_half_avg = sum(r.accuracy for r in results[half:]) / (len(results) - half)

    if first_half_avg > 0 and (first_half_avg - second_half_avg) / first_half_avg > 0.2:
        return True
    return False


def _generate_suggestions(domain_scores: dict, emotion_summary: dict, is_warning: bool) -> str:
    parts = []

    if is_warning:
        parts.append("近期认知训练表现有所下降，建议增加训练频次，并关注老人情绪变化。")

    weak_domains = [d for d, s in domain_scores.items() if s < 60]
    domain_names = {"memory": "记忆力", "language": "语言能力", "spatial": "空间定向", "semantic": "语义记忆"}
    for d in weak_domains:
        parts.append(f"{domain_names.get(d, d)}方面可以多加练习，建议每天进行相关训练。")

    sad_count = emotion_summary.get("sad", 0) + emotion_summary.get("anxious", 0)
    if sad_count > 3:
        parts.append("近期情绪波动较大，建议多陪伴聊天，浏览温馨的怀旧内容。")

    if not parts:
        parts.append("本周表现良好，继续保持！建议坚持每日训练，浏览怀旧内容保持好心情。")

    return "；".join(parts)
