from datetime import datetime
from typing import Optional, List, Dict, Any

from pydantic import BaseModel


class ChatMessage(BaseModel):
    message: str
    context: Optional[str] = None


class ChatResponse(BaseModel):
    reply: str
    emotion_detected: str = ""
    intent: str = ""
    suggestions: List[str] = []


class ReportResponse(BaseModel):
    id: str
    user_id: str
    report_type: str
    period_start: datetime
    period_end: datetime
    memory_score: float
    language_score: float
    spatial_score: float
    semantic_score: float
    overall_score: float
    emotion_summary: dict = {}
    suggestions: str = ""
    trend_data: dict = {}
    is_warning: bool = False
    created_at: datetime

    class Config:
        from_attributes = True


class ApiResponse(BaseModel):
    code: int = 200
    message: str = "success"
    data: Optional[Any] = None
