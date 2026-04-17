import random
from datetime import datetime

from sqlalchemy.orm import Session

from app.models.game import Game, GameResult, UserDifficulty
from app.models.user import User
from app.schemas.game import GameResultSubmit, GameQuestion, GameSessionResponse


COMMONS_FILE_BASE = "https://commons.wikimedia.org/wiki/Special:FilePath/"


OBJECT_OPTION_MEDIA = {
    "搪瓷缸": f"{COMMONS_FILE_BASE}Enamel%20mug.jpg",
    "保温瓶": f"{COMMONS_FILE_BASE}Thermos%20bottle.jpg",
    "玻璃瓶": f"{COMMONS_FILE_BASE}Glass%20bottle.jpg",
    "陶瓷碗": f"{COMMONS_FILE_BASE}Simple-ceramic-bowl.jpg",
    "蜂窝煤炉": f"{COMMONS_FILE_BASE}Brazier.JPG",
    "煤气灶": f"{COMMONS_FILE_BASE}Gas%20stove%20%281%29.jpg",
    "电暖器": f"{COMMONS_FILE_BASE}Electric%20Heater.jpg",
    "火盆": f"{COMMONS_FILE_BASE}Brazier.JPG",
    "计算器": f"{COMMONS_FILE_BASE}Calculator.JPG",
    "算盘": f"{COMMONS_FILE_BASE}Abacus%20%285750178671%29.jpg",
    "尺子": f"{COMMONS_FILE_BASE}Ruler.jpg",
    "圆规": f"{COMMONS_FILE_BASE}Compass%20%28drawing%20tool%29.jpg",
    "织布机": f"{COMMONS_FILE_BASE}Hand%20weaving%20loom.JPG",
    "缝纫机": f"{COMMONS_FILE_BASE}Sewing%20machine%20%2841211488245%29.jpg",
    "洗衣机": f"{COMMONS_FILE_BASE}Washing%20machine.jpg",
    "熨斗": f"{COMMONS_FILE_BASE}ClothesIron.JPG",
    "塑料盆": f"{COMMONS_FILE_BASE}Plastic%20basin.jpg",
    "搪瓷脸盆": f"{COMMONS_FILE_BASE}Wash%20Basin%20MET%20DP262012.jpg",
    "不锈钢盆": f"{COMMONS_FILE_BASE}Stacked%20stainless%20steel%20bowls.jpg",
    "木盆": f"{COMMONS_FILE_BASE}Wooden%20washtub.jpg",
}


def _build_option_media(options: list[str]) -> dict[str, str]:
    return {option: OBJECT_OPTION_MEDIA[option] for option in options}


GAME_QUESTIONS = {
    "object_match": [
        {
            "question_id": "om1",
            "type": "match",
            "content": '请找出与“搪瓷缸”相同的图片',
            "options": ["搪瓷缸", "保温瓶", "玻璃瓶", "陶瓷碗"],
            "option_media": _build_option_media(["搪瓷缸", "保温瓶", "玻璃瓶", "陶瓷碗"]),
            "correct_answer": "搪瓷缸",
            "hint": "这是以前家家户户都常见的搪瓷水杯。",
            "media_url": "",
        },
        {
            "question_id": "om2",
            "type": "match",
            "content": '请找出与“蜂窝煤炉”相同的图片',
            "options": ["蜂窝煤炉", "煤气灶", "电暖器", "火盆"],
            "option_media": _build_option_media(["蜂窝煤炉", "煤气灶", "电暖器", "火盆"]),
            "correct_answer": "蜂窝煤炉",
            "hint": "以前冬天常用来取暖、烧水。",
            "media_url": "",
        },
        {
            "question_id": "om3",
            "type": "match",
            "content": '请找出与“算盘”相同的图片',
            "options": ["计算器", "算盘", "尺子", "圆规"],
            "option_media": _build_option_media(["计算器", "算盘", "尺子", "圆规"]),
            "correct_answer": "算盘",
            "hint": "老一辈算账时很常用。",
            "media_url": "",
        },
        {
            "question_id": "om4",
            "type": "match",
            "content": '请找出与“缝纫机”相同的图片',
            "options": ["织布机", "缝纫机", "洗衣机", "熨斗"],
            "option_media": _build_option_media(["织布机", "缝纫机", "洗衣机", "熨斗"]),
            "correct_answer": "缝纫机",
            "hint": "以前做衣服、改裤脚都离不开它。",
            "media_url": "",
        },
        {
            "question_id": "om5",
            "type": "match",
            "content": '请找出与“搪瓷脸盆”相同的图片',
            "options": ["塑料盆", "搪瓷脸盆", "不锈钢盆", "木盆"],
            "option_media": _build_option_media(["塑料盆", "搪瓷脸盆", "不锈钢盆", "木盆"]),
            "correct_answer": "搪瓷脸盆",
            "hint": "不少老人家里以前都用过红字搪瓷盆。",
            "media_url": "",
        },
    ],
    "opera_melody": [
        {
            "question_id": "qm1",
            "type": "choice",
            "content": "秦腔《三滴血》讲的是什么故事？",
            "options": ["兄弟相认", "父子团圆", "夫妻重逢", "朋友相聚"],
            "correct_answer": "兄弟相认",
            "hint": "这是一个关于真假兄弟的故事。",
            "media_url": "",
        },
        {
            "question_id": "qm2",
            "type": "choice",
            "content": "秦腔中最常见的乐器是什么？",
            "options": ["二胡", "板胡", "琵琶", "古筝"],
            "correct_answer": "板胡",
            "hint": "秦腔的主奏乐器，声音高亢。",
            "media_url": "",
        },
        {
            "question_id": "qm3",
            "type": "choice",
            "content": "“他大舅他二舅都是他舅”是哪部秦腔的台词？",
            "options": ["三滴血", "周仁回府", "火焰驹", "柜中缘"],
            "correct_answer": "三滴血",
            "hint": "这是最经典的秦腔台词之一。",
            "media_url": "",
        },
        {
            "question_id": "qm4",
            "type": "choice",
            "content": "秦腔的起源地是哪里？",
            "options": ["西安", "宝鸡", "咸阳", "延安"],
            "correct_answer": "宝鸡",
            "hint": "西府秦腔的发源地。",
            "media_url": "",
        },
        {
            "question_id": "qm5",
            "type": "choice",
            "content": "秦腔属于哪种声腔体系？",
            "options": ["梆子腔", "皮黄腔", "昆腔", "高腔"],
            "correct_answer": "梆子腔",
            "hint": "中国很有代表性的梆子腔戏曲。",
            "media_url": "",
        },
    ],
    "map_connect": [
        {
            "question_id": "mc1",
            "type": "choice",
            "content": "老西安城墙的南门叫什么？",
            "options": ["永宁门", "安定门", "长乐门", "安远门"],
            "correct_answer": "永宁门",
            "hint": "南门是西安城墙最热闹的门。",
            "media_url": "",
        },
        {
            "question_id": "mc2",
            "type": "choice",
            "content": "钟楼位于西安城的哪个方向中心？",
            "options": ["正中心", "偏东", "偏西", "偏南"],
            "correct_answer": "正中心",
            "hint": "钟楼是西安城的中心标志。",
            "media_url": "",
        },
        {
            "question_id": "mc3",
            "type": "choice",
            "content": "大雁塔在唐代是作什么用途？",
            "options": ["藏经", "瞭望", "祭祀", "居住"],
            "correct_answer": "藏经",
            "hint": "玄奘法师翻译佛经的地方。",
            "media_url": "",
        },
        {
            "question_id": "mc4",
            "type": "choice",
            "content": "回民街在西安城墙的哪个门附近？",
            "options": ["西门", "北门", "南门", "东门"],
            "correct_answer": "西门",
            "hint": "靠近鼓楼的那条美食街。",
            "media_url": "",
        },
        {
            "question_id": "mc5",
            "type": "choice",
            "content": "西安老城区的布局是什么形状？",
            "options": ["方形", "圆形", "长方形", "不规则"],
            "correct_answer": "方形",
            "hint": "城墙围起来的老城。",
            "media_url": "",
        },
    ],
}


def get_all_games(db: Session) -> list[Game]:
    return db.query(Game).filter(Game.is_active == True).all()


def get_game_by_code(db: Session, code: str) -> Game | None:
    return db.query(Game).filter(Game.code == code, Game.is_active == True).first()


def get_user_difficulty(db: Session, user_id: str, game_id: str) -> UserDifficulty:
    ud = db.query(UserDifficulty).filter(
        UserDifficulty.user_id == user_id,
        UserDifficulty.game_id == game_id,
    ).first()
    if not ud:
        ud = UserDifficulty(user_id=user_id, game_id=game_id, current_level=1)
        db.add(ud)
        db.commit()
        db.refresh(ud)
    return ud


def get_daily_game(db: Session, user: User) -> dict:
    games = get_all_games(db)
    if not games:
        return None
    game = random.choice(games)
    ud = get_user_difficulty(db, user.id, game.id)
    return {
        "game": game,
        "recommended_difficulty": ud.current_level,
        "reason": f"根据您当前的水平，推荐难度 {ud.current_level}",
    }


def generate_game_session(db: Session, game_code: str, difficulty: int, user_id: str) -> GameSessionResponse:
    game = get_game_by_code(db, game_code)
    if not game:
        raise ValueError("游戏不存在")

    questions_pool = GAME_QUESTIONS.get(game_code, [])
    if not questions_pool:
        questions_pool = GAME_QUESTIONS.get("object_match", [])

    num_questions = min(3 + difficulty * 2, len(questions_pool))
    selected = random.sample(questions_pool, min(num_questions, len(questions_pool)))
    questions = [GameQuestion(**q) for q in selected]

    if difficulty > 1:
        for q in questions:
            q.hint = ""

    return GameSessionResponse(
        game_id=game.id,
        difficulty=difficulty,
        questions=questions,
    )


def submit_game_result(db: Session, user_id: str, result: GameResultSubmit) -> GameResult:
    game_result = GameResult(
        user_id=user_id,
        game_id=result.game_id,
        difficulty=result.difficulty,
        score=result.score,
        accuracy=result.accuracy,
        reaction_time_ms=result.reaction_time_ms,
        duration_seconds=result.duration_seconds,
        detail=result.detail,
    )
    db.add(game_result)

    ud = get_user_difficulty(db, user_id, result.game_id)

    if result.accuracy >= 0.8:
        ud.consecutive_high += 1
        ud.consecutive_low = 0
        if ud.consecutive_high >= 3 and ud.current_level < 5:
            ud.current_level += 1
            ud.consecutive_high = 0
    elif result.accuracy < 0.5:
        ud.consecutive_low += 1
        ud.consecutive_high = 0
        if ud.consecutive_low >= 2 and ud.current_level > 1:
            ud.current_level -= 1
            ud.consecutive_low = 0
    else:
        ud.consecutive_high = 0
        ud.consecutive_low = 0

    ud.updated_at = datetime.now()
    db.commit()
    db.refresh(game_result)
    return game_result


def get_game_history(db: Session, user_id: str, game_id: str | None = None, limit: int = 20) -> list[GameResult]:
    query = db.query(GameResult).filter(GameResult.user_id == user_id)
    if game_id:
        query = query.filter(GameResult.game_id == game_id)
    return query.order_by(GameResult.created_at.desc()).limit(limit).all()
