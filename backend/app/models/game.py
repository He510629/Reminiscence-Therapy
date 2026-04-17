import uuid
from datetime import datetime

from sqlalchemy import String, Integer, DateTime, Float, JSON, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Game(Base):
    __tablename__ = "games"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    code: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    cognitive_domain: Mapped[str] = mapped_column(String(50), nullable=False)
    nostalgia_element: Mapped[str] = mapped_column(String(200), default="")
    config: Mapped[dict] = mapped_column(JSON, default=dict)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)


class GameResult(Base):
    __tablename__ = "game_results"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    game_id: Mapped[str] = mapped_column(String(36), ForeignKey("games.id"), nullable=False, index=True)
    difficulty: Mapped[int] = mapped_column(Integer, default=1)
    score: Mapped[int] = mapped_column(Integer, default=0)
    accuracy: Mapped[float] = mapped_column(Float, default=0.0)
    reaction_time_ms: Mapped[int] = mapped_column(Integer, default=0)
    duration_seconds: Mapped[int] = mapped_column(Integer, default=0)
    detail: Mapped[dict] = mapped_column(JSON, default=dict)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)


class UserDifficulty(Base):
    __tablename__ = "user_difficulties"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    game_id: Mapped[str] = mapped_column(String(36), ForeignKey("games.id"), nullable=False, index=True)
    current_level: Mapped[int] = mapped_column(Integer, default=1)
    consecutive_high: Mapped[int] = mapped_column(Integer, default=0)
    consecutive_low: Mapped[int] = mapped_column(Integer, default=0)
    abandon_count: Mapped[int] = mapped_column(Integer, default=0)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
