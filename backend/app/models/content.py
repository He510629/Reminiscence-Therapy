import uuid
from datetime import datetime

from sqlalchemy import String, Integer, DateTime, Enum as SAEnum, Text, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Content(Base):
    __tablename__ = "contents"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    type: Mapped[str] = mapped_column(SAEnum("photo", "audio", "video", name="content_type"), nullable=False)
    title: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[str] = mapped_column(Text, default="")
    media_url: Mapped[str] = mapped_column(String(500), nullable=False)
    thumbnail_url: Mapped[str] = mapped_column(String(500), default="")
    era: Mapped[str] = mapped_column(String(20), default="1960s")
    region: Mapped[str] = mapped_column(String(50), default="碑林区")
    theme_tags: Mapped[dict] = mapped_column(JSON, default=list)
    emotion_tag: Mapped[str] = mapped_column(SAEnum("warm", "cheerful", "nostalgic", name="emotion_tag"), default="warm")
    cognitive_level: Mapped[int] = mapped_column(Integer, default=1)
    copyright_status: Mapped[str] = mapped_column(SAEnum("public", "licensed", "user_uploaded", name="copyright_status"), default="public")
    voice_over_url: Mapped[str] = mapped_column(String(500), default="")
    uploader_id: Mapped[str] = mapped_column(String(36), default="")
    view_count: Mapped[int] = mapped_column(Integer, default=0)
    is_active: Mapped[bool] = mapped_column(default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now, onupdate=datetime.now)
