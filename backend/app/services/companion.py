import httpx
from datetime import datetime

from app.config import settings
from app.database import mongo_db
from app.schemas.common import ChatResponse


XI_AN_KNOWLEDGE = """
你是"忆往开来"数字陪伴官，专门陪伴西安的老年朋友聊天。你需要：
1. 用亲切、温暖的语气交流，像老朋友一样
2. 多聊西安的老故事、老地方、老习俗
3. 适当引导老人回忆过去美好的事情
4. 如果老人表达消极情绪，要温和地安慰和引导
5. 回复简洁易懂，不要说太长的话

西安相关知识：
- 西安古称长安，十三朝古都
- 老西安有钟楼、鼓楼、城墙、大雁塔等标志建筑
- 回民街有牛羊肉泡馍、肉夹馍、凉皮等美食
- 秦腔是陕西最有名的戏曲，代表作有《三滴血》《周仁回府》
- 西安方言特点：把"什么"说成"啥"，"很好"说成"嫽扎咧"
- 老西安人过年要蒸花馍、贴门神、放鞭炮
- 以前西安人出行主要靠自行车，公交车很少
"""

_conversation_cache: dict[str, list[dict]] = {}


async def chat_with_companion(user_id: str, message: str, context: str | None = None) -> ChatResponse:
    messages = [{"role": "system", "content": XI_AN_KNOWLEDGE}]

    if mongo_db:
        try:
            conversation_collection = mongo_db["conversations"]
            history_cursor = conversation_collection.find(
                {"user_id": user_id}
            ).sort("created_at", -1).limit(5)
            history = await history_cursor.to_list(length=5)
            history.reverse()
            for h in history:
                messages.append({"role": "user", "content": h["user_message"]})
                messages.append({"role": "assistant", "content": h["assistant_reply"]})
        except Exception:
            pass
    else:
        cache = _conversation_cache.get(user_id, [])
        for h in cache[-5:]:
            messages.append({"role": "user", "content": h["user_message"]})
            messages.append({"role": "assistant", "content": h["assistant_reply"]})

    if context:
        messages.append({"role": "system", "content": f"上下文信息：{context}"})

    messages.append({"role": "user", "content": message})

    reply = await _call_llm(messages)

    intent = _detect_intent(message)
    emotion = _detect_emotion(message)

    record = {
        "user_id": user_id,
        "user_message": message,
        "assistant_reply": reply,
        "intent": intent,
        "emotion": emotion,
        "context": context,
        "created_at": datetime.now(),
    }

    if mongo_db:
        try:
            await mongo_db["conversations"].insert_one(record)
        except Exception:
            pass
    else:
        if user_id not in _conversation_cache:
            _conversation_cache[user_id] = []
        _conversation_cache[user_id].append(record)

    suggestions = _get_suggestions(intent, emotion)

    return ChatResponse(
        reply=reply,
        emotion_detected=emotion,
        intent=intent,
        suggestions=suggestions,
    )


async def _call_llm(messages: list[dict]) -> str:
    if not settings.LLM_API_KEY:
        return _local_reply(messages[-1]["content"])

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            resp = await client.post(
                settings.LLM_API_URL,
                headers={"Authorization": f"Bearer {settings.LLM_API_KEY}"},
                json={
                    "model": settings.LLM_MODEL,
                    "messages": messages,
                    "max_tokens": 300,
                    "temperature": 0.8,
                },
            )
            resp.raise_for_status()
            data = resp.json()
            return data["choices"][0]["message"]["content"]
    except Exception:
        return _local_reply(messages[-1]["content"])


def _local_reply(message: str) -> str:
    if any(w in message for w in ["你好", "嗨", "在吗"]):
        return "你好呀！今天想聊点啥？咱西安最近天气不错，你出去转了没？"
    if any(w in message for w in ["想吃", "吃啥", "泡馍"]):
        return "说到吃，咱西安的牛羊肉泡馍那可是一绝！你以前常去哪家吃泡馍？"
    if any(w in message for w in ["无聊", "没意思", "闷"]):
        return "别闷着啦！要不咱回忆回忆以前的事？你小时候住在西安哪个地方？"
    if any(w in message for w in ["难受", "不舒服", "伤心"]):
        return "别难过，有我陪着你呢。要不咱聊点开心的事？你年轻时候有啥特别高兴的事不？"
    if any(w in message for w in ["秦腔", "戏", "唱戏"]):
        return "秦腔可是咱陕西的宝贝！你爱听哪出戏？《三滴血》还是《周仁回府》？"
    if any(w in message for w in ["城墙", "钟楼", "大雁塔"]):
        return "咱西安这些老建筑可有年头了。你以前常去城墙根下转不？"
    if any(w in message for w in ["以前", "过去", "老时候"]):
        return "以前的日子虽然苦，但人情味浓啊。你印象最深的老西安是啥样的？"
    if any(w in message for w in ["谢谢", "感谢"]):
        return "不用谢！能陪你聊天我也高兴。有啥想说的随时找我！"
    return "嗯嗯，我听着呢。你再给我说说？咱慢慢聊，不着急。"


def _detect_intent(message: str) -> str:
    if any(w in message for w in ["帮我", "怎么办", "求助"]):
        return "help"
    if any(w in message for w in ["提醒", "别忘了", "记住"]):
        return "reminder"
    if any(w in message for w in ["以前", "过去", "记得", "回忆", "老时候"]):
        return "memory"
    return "chat"


def _detect_emotion(message: str) -> str:
    if any(w in message for w in ["开心", "高兴", "快乐", "好", "棒", "嫽"]):
        return "happy"
    if any(w in message for w in ["难过", "伤心", "难受", "想哭", "孤独"]):
        return "sad"
    if any(w in message for w in ["生气", "烦", "恼", "讨厌"]):
        return "angry"
    if any(w in message for w in ["害怕", "担心", "焦虑"]):
        return "anxious"
    return "neutral"


def _get_suggestions(intent: str, emotion: str) -> list[str]:
    suggestions = []
    if emotion == "sad":
        suggestions = ["看看老照片回忆美好时光", "听一段秦腔放松心情"]
    elif emotion == "anxious":
        suggestions = ["做一组简单的健脑游戏", "和陪伴官聊聊天散散心"]
    elif intent == "memory":
        suggestions = ["浏览怀旧策展馆", "记录这段回忆"]
    elif intent == "help":
        suggestions = ["联系家人", "查看使用帮助"]
    else:
        suggestions = ["玩个健脑小游戏", "看看今天的怀旧内容", "听听老戏曲"]
    return suggestions
