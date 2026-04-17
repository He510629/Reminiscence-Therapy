import uuid
from datetime import datetime

from sqlalchemy import String, Integer, DateTime, Float, JSON, Text, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Report(Base):
    __tablename__ = "reports"

    id: Mapped[str] = mapped_column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id: Mapped[str] = mapped_column(String(36), ForeignKey("users.id"), nullable=False, index=True)
    report_type: Mapped[str] = mapped_column(String(20), nullable=False)
    period_start: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    period_end: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    memory_score: Mapped[float] = mapped_column(Float, default=0.0)
    language_score: Mapped[float] = mapped_column(Float, default=0.0)
    spatial_score: Mapped[float] = mapped_column(Float, default=0.0)
    semantic_score: Mapped[float] = mapped_column(Float, default=0.0)
    overall_score: Mapped[float] = mapped_column(Float, default=0.0)
    emotion_summary: Mapped[dict] = mapped_column(JSON, default=dict)
    suggestions: Mapped[str] = mapped_column(Text, default="")
    trend_data: Mapped[dict] = mapped_column(JSON, default=dict)
    is_warning: Mapped[bool] = mapped_column(default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.now)
