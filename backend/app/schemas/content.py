from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field


class ContentStoryImage(BaseModel):
    title: str
    era: str = ""
    image_url: str
    source_label: str = ""
    source_url: str = ""


class ContentStorySection(BaseModel):
    era: str
    title: str
    image_url: str = ""
    source_label: str = ""
    source_url: str = ""
    body: str


class ContentResponse(BaseModel):
    id: str
    type: str
    title: str
    description: str = ""
    media_url: str
    thumbnail_url: str = ""
    era: str
    region: str
    theme_tags: list = []
    emotion_tag: str
    cognitive_level: int
    copyright_status: str
    voice_over_url: str = ""
    view_count: int = 0
    created_at: datetime
    cover_image_url: str = ""
    gallery: List[ContentStoryImage] = []
    story_sections: List[ContentStorySection] = []

    class Config:
        from_attributes = True


class ContentListResponse(BaseModel):
    total: int
    items: List[ContentResponse]


class ContentRecommendRequest(BaseModel):
    user_id: str
    limit: int = Field(default=10, ge=1, le=50)
    era: Optional[str] = None
    region: Optional[str] = None
    emotion_tag: Optional[str] = None


class ContentUploadRequest(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: str = ""
    type: str = Field(..., pattern="^(photo|audio|video)$")
    era: str = "1960s"
    region: str = "碑林区"
    theme_tags: List[str] = []
    emotion_tag: str = "warm"
