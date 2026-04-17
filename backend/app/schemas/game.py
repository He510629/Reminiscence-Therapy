from datetime import datetime
from typing import Optional, List, Dict, Any

from pydantic import BaseModel, Field


class GameResponse(BaseModel):
    id: str
    name: str
    code: str
    description: str = ""
    cognitive_domain: str
    nostalgia_element: str = ""
    config: dict = {}

    class Config:
        from_attributes = True


class GameResultSubmit(BaseModel):
    game_id: str
    difficulty: int = Field(default=1, ge=1, le=5)
    score: int = Field(..., ge=0)
    accuracy: float = Field(..., ge=0.0, le=1.0)
    reaction_time_ms: int = Field(default=0, ge=0)
    duration_seconds: int = Field(default=0, ge=0)
    detail: Dict[str, Any] = Field(default_factory=dict)


class GameResultResponse(BaseModel):
    id: str
    user_id: str
    game_id: str
    difficulty: int
    score: int
    accuracy: float
    reaction_time_ms: int
    duration_seconds: int
    detail: dict = {}
    created_at: datetime

    class Config:
        from_attributes = True


class DailyGameResponse(BaseModel):
    game: GameResponse
    recommended_difficulty: int
    reason: str = ""


class GameQuestion(BaseModel):
    question_id: str
    type: str
    content: str
    options: List[str] = []
    option_media: Dict[str, str] = Field(default_factory=dict)
    correct_answer: str = ""
    hint: str = ""
    media_url: str = ""


class GameSessionResponse(BaseModel):
    game_id: str
    difficulty: int
    questions: List[GameQuestion]
