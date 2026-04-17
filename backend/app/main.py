import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.database import Base, engine
from app.routers import auth, chat, content, game, report
from app.services.content import (
    CITY_WALL_COVER,
    CITY_WALL_TITLE,
    CLOCK_TOWER_COVER,
    CLOCK_TOWER_TITLE,
    ENAMEL_MUG_COVER,
    ENAMEL_MUG_TITLE,
    MUSLIM_STREET_COVER,
    MUSLIM_STREET_TITLE,
    OLD_RAILWAY_STATION_COVER,
    OLD_RAILWAY_STATION_TITLE,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    _seed_data()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(content.router)
app.include_router(game.router)
app.include_router(chat.router)
app.include_router(report.router)


@app.get("/")
def root():
    return {"code": 200, "message": "success", "data": {"name": settings.APP_NAME, "version": settings.APP_VERSION}}


uploads_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(uploads_dir, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=uploads_dir), name="uploads")


def _clock_tower_defaults() -> dict:
    return {
        "title": CLOCK_TOWER_TITLE,
        "description": "从老西安人的记忆讲起，顺着钟楼的一砖一瓦，慢慢说说几代人进城、逛街、等人、过日子的旧时光。",
        "media_url": CLOCK_TOWER_COVER,
        "thumbnail_url": CLOCK_TOWER_COVER,
        "era": "1960s-2020s",
        "region": "西安城中心",
        "theme_tags": ["钟楼", "老西安", "城市记忆", "街巷烟火"],
        "emotion_tag": "nostalgic",
        "cognitive_level": 1,
        "copyright_status": "public",
    }


def _muslim_street_defaults() -> dict:
    return {
        "title": MUSLIM_STREET_TITLE,
        "description": "从清晨到夜晚，沿着回民街慢慢走一圈，闻汤香、听吆喝，看看老西安人怎样把一顿泡馍吃成日子的热气。",
        "media_url": MUSLIM_STREET_COVER,
        "thumbnail_url": MUSLIM_STREET_COVER,
        "era": "1970s-2020s",
        "region": "莲湖区",
        "theme_tags": ["回民街", "泡馍", "街巷烟火", "老西安味道"],
        "emotion_tag": "warm",
        "cognitive_level": 1,
        "copyright_status": "public",
    }


def _old_railway_station_defaults() -> dict:
    return {
        "title": OLD_RAILWAY_STATION_TITLE,
        "description": "从送别到接站，顺着老火车站的站台、广播和绿皮火车，把一家人牵挂与团圆的旧日心事慢慢讲回来。",
        "media_url": OLD_RAILWAY_STATION_COVER,
        "thumbnail_url": OLD_RAILWAY_STATION_COVER,
        "era": "1960s-2020s",
        "region": "新城区",
        "theme_tags": ["火车站", "绿皮火车", "送别接站", "团圆牵挂"],
        "emotion_tag": "nostalgic",
        "cognitive_level": 1,
        "copyright_status": "public",
    }


def _city_wall_defaults() -> dict:
    return {
        "title": CITY_WALL_TITLE,
        "description": "从清晨早市到节庆灯火，顺着老城墙脚下的人声、晚风和脚步声，把老西安人过日子的踏实劲儿慢慢讲回来。",
        "media_url": CITY_WALL_COVER,
        "thumbnail_url": CITY_WALL_COVER,
        "era": "1970s-2010s",
        "region": "碑林区",
        "theme_tags": ["城墙", "早市", "城墙根生活", "节庆灯火"],
        "emotion_tag": "warm",
        "cognitive_level": 1,
        "copyright_status": "public",
    }


def _enamel_mug_defaults() -> dict:
    return {
        "title": ENAMEL_MUG_TITLE,
        "description": "从清晨倒热水到家里待客，顺着一只搪瓷缸子的热气、磕碰和旧字样，把许多人家过日子的手感与温度慢慢讲回来。",
        "media_url": ENAMEL_MUG_COVER,
        "thumbnail_url": ENAMEL_MUG_COVER,
        "era": "1960s-2010s",
        "region": "碑林区",
        "theme_tags": ["搪瓷缸子", "老物件", "家常日子", "待客喝水"],
        "emotion_tag": "warm",
        "cognitive_level": 1,
        "copyright_status": "public",
    }


def _seed_data():
    from app.database import SessionLocal
    from app.models.content import Content
    from app.models.game import Game
    from app.models.user import User
    from app.utils.security import hash_password

    db = SessionLocal()
    try:
        if db.query(Game).count() == 0:
            games = [
                Game(
                    name="老物件配对",
                    code="object_match",
                    description="找出记忆中的老物件，训练记忆力",
                    cognitive_domain="memory",
                    nostalgia_element="搪瓷缸、蜂窝煤炉等图片",
                    config={"time_limit": 60, "pairs_count": 6},
                ),
                Game(
                    name="跟着戏曲哼旋律",
                    code="opera_melody",
                    description="秦腔片段知识问答，训练语言和音乐记忆",
                    cognitive_domain="language",
                    nostalgia_element="秦腔经典片段",
                    config={"time_limit": 90, "questions_count": 5},
                ),
                Game(
                    name="老地图连线",
                    code="map_connect",
                    description="老西安城区地理知识，训练空间定向",
                    cognitive_domain="spatial",
                    nostalgia_element="上世纪西安城区地图",
                    config={"time_limit": 120, "questions_count": 5},
                ),
            ]
            db.add_all(games)

        if db.query(Content).count() == 0:
            contents = [
                Content(
                    type="photo",
                    title="钟楼旧影",
                    description="上世纪60年代的西安钟楼，周围还是低矮的平房。",
                    media_url="/uploads/placeholder.jpg",
                    era="1960s",
                    region="碑林区",
                    theme_tags=["建筑", "地标"],
                    emotion_tag="nostalgic",
                    cognitive_level=1,
                    copyright_status="public",
                ),
                Content(
                    type="photo",
                    title="回民街的泡馍馆",
                    description="老字号牛羊肉泡馍馆门口排着长队。",
                    media_url="/uploads/placeholder.jpg",
                    era="1970s",
                    region="莲湖区",
                    theme_tags=["饮食", "老街"],
                    emotion_tag="warm",
                    cognitive_level=1,
                    copyright_status="public",
                ),
                Content(
                    type="photo",
                    title="城墙根下的早市",
                    description="清晨城墙根下热闹的早市，卖菜的小贩吆喝着。",
                    media_url="/uploads/placeholder.jpg",
                    era="1980s",
                    region="碑林区",
                    theme_tags=["市井", "生活"],
                    emotion_tag="cheerful",
                    cognitive_level=1,
                    copyright_status="public",
                ),
                Content(
                    type="audio",
                    title="秦腔《三滴血》选段",
                    description="经典秦腔剧目《三滴血》精彩选段。",
                    media_url="/uploads/placeholder.mp3",
                    era="1970s",
                    region="碑林区",
                    theme_tags=["戏曲", "秦腔"],
                    emotion_tag="nostalgic",
                    cognitive_level=2,
                    copyright_status="licensed",
                ),
                Content(
                    type="photo",
                    title="大雁塔远眺",
                    description="从远处眺望大雁塔，周围还是一片农田。",
                    media_url="/uploads/placeholder.jpg",
                    era="1960s",
                    region="雁塔区",
                    theme_tags=["建筑", "地标"],
                    emotion_tag="nostalgic",
                    cognitive_level=1,
                    copyright_status="public",
                ),
                Content(
                    type="photo",
                    title="搪瓷缸子",
                    description='印着"为人民服务"的搪瓷缸子，家家户户都有。',
                    media_url="/uploads/placeholder.jpg",
                    era="1970s",
                    region="碑林区",
                    theme_tags=["物件", "生活"],
                    emotion_tag="warm",
                    cognitive_level=1,
                    copyright_status="public",
                ),
                Content(
                    type="video",
                    title="西安城墙修缮",
                    description="80年代西安城墙大规模修缮的珍贵影像。",
                    media_url="/uploads/placeholder.mp4",
                    era="1980s",
                    region="碑林区",
                    theme_tags=["建筑", "历史"],
                    emotion_tag="nostalgic",
                    cognitive_level=2,
                    copyright_status="licensed",
                ),
                Content(
                    type="photo",
                    title="老火车站",
                    description="西安老火车站，绿皮火车缓缓驶出站台。",
                    media_url="/uploads/placeholder.jpg",
                    era="1970s",
                    region="新城区",
                    theme_tags=["交通", "建筑"],
                    emotion_tag="nostalgic",
                    cognitive_level=1,
                    copyright_status="public",
                ),
            ]
            db.add_all(contents)

        clock_tower = db.query(Content).filter(Content.title == CLOCK_TOWER_TITLE).first()
        if clock_tower:
            for field, value in _clock_tower_defaults().items():
                setattr(clock_tower, field, value)

        muslim_street = db.query(Content).filter(Content.title == MUSLIM_STREET_TITLE).first()
        if muslim_street:
            for field, value in _muslim_street_defaults().items():
                setattr(muslim_street, field, value)

        old_railway_station = db.query(Content).filter(Content.title == OLD_RAILWAY_STATION_TITLE).first()
        if old_railway_station:
            for field, value in _old_railway_station_defaults().items():
                setattr(old_railway_station, field, value)

        city_wall = db.query(Content).filter(Content.title == CITY_WALL_TITLE).first()
        if city_wall:
            for field, value in _city_wall_defaults().items():
                setattr(city_wall, field, value)

        enamel_mug = db.query(Content).filter(Content.title == ENAMEL_MUG_TITLE).first()
        if enamel_mug:
            for field, value in _enamel_mug_defaults().items():
                setattr(enamel_mug, field, value)

        if db.query(User).count() == 0:
            demo_user = User(
                phone="13800000001",
                password_hash=hash_password("123456"),
                name="张大爷",
                role="elder",
                birth_year=1948,
                region="碑林区",
                cognitive_level=1,
            )
            demo_family = User(
                phone="13800000002",
                password_hash=hash_password("123456"),
                name="张小明",
                role="family",
                birth_year=1975,
                region="碑林区",
            )
            db.add_all([demo_user, demo_family])

        db.commit()
    finally:
        db.close()
