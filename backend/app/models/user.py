import uuid
from datetime import datetime

from sqlalchemy import String, Integer, DateTime, Enum as SAEnum, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    phone: Mapped[str] = mapped_column(String(20), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    name: Mapped[str] = mapped_column(String(50), nullable=False)
    avatar: Mapped[str] = mapped_column(String(500), default="")
    role: Mapped[str] = mapped_column(SAEnum("elder", "family", "institution", "admin", name="user_role"), default="elder")
    birth_year: Mapped[int] = mapped_column(Integer, default=1950)
    region: Mapped[str] = mapped_column(String(50), default="碑林区")
    cognitive_level: Mapped[int] = mapped_column(Integer, default=1)
    family_id: Mapped[str] = mapped_column(String(36), default="")
    institution_id: Mapped[str] = mapped_column(String(36), default="")
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
