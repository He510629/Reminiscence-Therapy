from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.companion import chat_with_companion
from app.services.auth import get_user_by_id
from app.schemas.common import ChatMessage, ChatResponse, ApiResponse
from app.utils.security import decode_access_token
from app.models.user import User

router = APIRouter(prefix="/api/v1/chat", tags=["数字陪伴官"])


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


@router.post("/send", response_model=ApiResponse)
async def send_message(
    req: ChatMessage,
    request: Request,
    db: Session = Depends(get_db),
):
    user = _extract_user(request, db)
    result = await chat_with_companion(user.id, req.message, req.context)
    return ApiResponse(data=result.model_dump())
