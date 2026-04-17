from sqlalchemy.orm import Session

from app.models.user import User
from app.utils.security import hash_password, verify_password, create_access_token
from app.schemas.user import RegisterRequest, TokenResponse


def register_user(db: Session, req: RegisterRequest) -> User:
    existing = db.query(User).filter(User.phone == req.phone).first()
    if existing:
        raise ValueError("该手机号已注册")
    user = User(
        phone=req.phone,
        password_hash=hash_password(req.password),
        name=req.name,
        role=req.role,
        birth_year=req.birth_year,
        region=req.region,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def login_user(db: Session, phone: str, password: str) -> TokenResponse:
    user = db.query(User).filter(User.phone == phone).first()
    if not user or not verify_password(password, user.password_hash):
        raise ValueError("手机号或密码错误")
    if not user.is_active:
        raise ValueError("账户已被禁用")
    token = create_access_token(data={"sub": user.id, "role": user.role})
    return TokenResponse(
        access_token=token,
        user_id=user.id,
        name=user.name,
        role=user.role,
    )


def get_user_by_id(db: Session, user_id: str) -> User | None:
    return db.query(User).filter(User.id == user_id).first()
