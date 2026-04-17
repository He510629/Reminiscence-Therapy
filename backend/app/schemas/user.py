from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field


class LoginRequest(BaseModel):
    phone: str = Field(..., min_length=11, max_length=11)
    password: str = Field(..., min_length=6, max_length=50)


class RegisterRequest(BaseModel):
    phone: str = Field(..., min_length=11, max_length=11)
    password: str = Field(..., min_length=6, max_length=50)
    name: str = Field(..., min_length=1, max_length=50)
    role: str = Field(default="elder")
    birth_year: int = Field(default=1950)
    region: str = Field(default="碑林区")


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    name: str
    role: str


class UserResponse(BaseModel):
    id: str
    phone: str
    name: str
    avatar: str = ""
    role: str
    birth_year: int
    region: str
    cognitive_level: int
    family_id: str = ""
    institution_id: str = ""
    created_at: datetime

    class Config:
        from_attributes = True


class UserUpdateRequest(BaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None
    region: Optional[str] = None
    cognitive_level: Optional[int] = Field(None, ge=1, le=3)
