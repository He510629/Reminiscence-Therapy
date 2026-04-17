from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.auth import register_user, login_user, get_user_by_id
from app.schemas.user import LoginRequest, RegisterRequest, TokenResponse, UserResponse, UserUpdateRequest
from app.schemas.common import ApiResponse
from app.utils.security import decode_access_token
from app.models.user import User

router = APIRouter(prefix="/api/v1/auth", tags=["认证"])


def get_current_user(token: str = None, db: Session = Depends(get_db)) -> User:
    from fastapi import Request
    raise NotImplementedError("Use dependency")


from fastapi import Request


def _extract_user(request: Request, db: Session = Depends(get_db)) -> User:
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="未登录")
    token = auth[7:]
    payload = decode_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="登录已过期")
    user = get_user_by_id(db, payload.get("sub"))
    if not user:
        raise HTTPException(status_code=401, detail="用户不存在")
    return user


@router.post("/login", response_model=ApiResponse)
def login(req: LoginRequest, db: Session = Depends(get_db)):
    try:
        result = login_user(db, req.phone, req.password)
        return ApiResponse(data=result.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/register", response_model=ApiResponse)
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    try:
        user = register_user(db, req)
        return ApiResponse(data={"user_id": user.id, "name": user.name})
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/profile", response_model=ApiResponse)
def get_profile(request: Request, db: Session = Depends(get_db)):
    user = _extract_user(request, db)
    return ApiResponse(data=UserResponse.model_validate(user).model_dump())


@router.put("/profile", response_model=ApiResponse)
def update_profile(req: UserUpdateRequest, request: Request, db: Session = Depends(get_db)):
    user = _extract_user(request, db)
    if req.name is not None:
        user.name = req.name
    if req.avatar is not None:
        user.avatar = req.avatar
    if req.region is not None:
        user.region = req.region
    if req.cognitive_level is not None:
        user.cognitive_level = req.cognitive_level
    db.commit()
    db.refresh(user)
    return ApiResponse(data=UserResponse.model_validate(user).model_dump())
