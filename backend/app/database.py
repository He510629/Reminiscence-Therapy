from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from motor.motor_asyncio import AsyncIOMotorClient

from app.config import settings

engine = create_engine(
    settings.DATABASE_URL,
    echo=settings.DEBUG,
    pool_pre_ping=True,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


try:
    mongo_client = AsyncIOMotorClient(settings.MONGO_URL, serverSelectionTimeoutMS=2000)
    mongo_db = mongo_client[settings.MONGO_DATABASE]
except Exception:
    mongo_db = None
