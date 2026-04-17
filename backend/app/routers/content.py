from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional

from app.database import get_db
from app.services.content import (
    get_content_by_id, list_contents, recommend_contents,
    create_content, increment_view_count, build_content_response,
)
from app.services.auth import get_user_by_id
from app.schemas.content import ContentResponse, ContentListResponse, ContentUploadRequest
from app.schemas.common import ApiResponse
from app.utils.security import decode_access_token
from app.models.user import User

router = APIRouter(prefix="/api/v1/content", tags=["怀旧策展馆"])


def _extract_user(request: Request, db: Session) -> User:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="未登录")
    payload = decode_access_token(auth[7:])
    if not payload:
        raise HTTPException(status_code=401, detail="登录已过期")
    user = get_user_by_id(db, payload.get("sub"))
    if not user:
        raise HTTPException(status_code=401, detail="用户不存在")
    return user


@router.get("/recommend", response_model=ApiResponse)
def get_recommendations(
    request: Request,
    limit: int = 10,
    era: Optional[str] = None,
    region: Optional[str] = None,
    emotion_tag: Optional[str] = None,
    db: Session = Depends(get_db),
):
    user = _extract_user(request, db)
    items = recommend_contents(db, user, limit, era, region, emotion_tag)
    return ApiResponse(data=[build_content_response(c).model_dump() for c in items])


@router.get("/list", response_model=ApiResponse)
def get_content_list(
    era: Optional[str] = None,
    region: Optional[str] = None,
    emotion_tag: Optional[str] = None,
    type: Optional[str] = None,
    page: int = 1,
    page_size: int = 20,
    db: Session = Depends(get_db),
):
    items, total = list_contents(db, era, region, emotion_tag, type, page, page_size)
    return ApiResponse(data=ContentListResponse(
        total=total,
        items=[build_content_response(c) for c in items],
    ).model_dump())


@router.get("/{content_id}", response_model=ApiResponse)
def get_content_detail(content_id: str, db: Session = Depends(get_db)):
    content = get_content_by_id(db, content_id)
    if not content:
        raise HTTPException(status_code=404, detail="内容不存在")
    increment_view_count(db, content_id)
    return ApiResponse(data=build_content_response(content).model_dump())


@router.post("/upload", response_model=ApiResponse)
async def upload_content(
    request: Request,
    title: str = Form(...),
    description: str = Form(""),
    type: str = Form("photo"),
    era: str = Form("1960s"),
    region: str = Form("碑林区"),
    theme_tags: str = Form(""),
    emotion_tag: str = Form("warm"),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    user = _extract_user(request, db)
    media_url = f"/uploads/{file.filename}"
    content_dir = "uploads"
    import os
    os.makedirs(content_dir, exist_ok=True)
    file_path = os.path.join(content_dir, file.filename)
    with open(file_path, "wb") as f:
        content_bytes = await file.read()
        f.write(content_bytes)

    tags = [t.strip() for t in theme_tags.split(",") if t.strip()] if theme_tags else []
    req = ContentUploadRequest(
        title=title, description=description, type=type,
        era=era, region=region, theme_tags=tags, emotion_tag=emotion_tag,
    )
    content = create_content(db, user.id, req, media_url)
    return ApiResponse(data=build_content_response(content).model_dump())
