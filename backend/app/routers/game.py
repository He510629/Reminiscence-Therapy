from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.game import (
    get_all_games, get_daily_game, generate_game_session,
    submit_game_result, get_game_history,
)
from app.services.auth import get_user_by_id
from app.schemas.game import GameResponse, GameResultSubmit, GameResultResponse, DailyGameResponse, GameSessionResponse
from app.schemas.common import ApiResponse
from app.utils.security import decode_access_token
from app.models.user import User

router = APIRouter(prefix="/api/v1/game", tags=["趣味健脑营"])


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


@router.get("/list", response_model=ApiResponse)
def list_games(db: Session = Depends(get_db)):
    games = get_all_games(db)
    return ApiResponse(data=[GameResponse.model_validate(g).model_dump() for g in games])


@router.get("/daily", response_model=ApiResponse)
def daily_game(request: Request, db: Session = Depends(get_db)):
    user = _extract_user(request, db)
    result = get_daily_game(db, user)
    if not result:
        raise HTTPException(status_code=404, detail="暂无可用游戏")
    return ApiResponse(data=DailyGameResponse(
        game=GameResponse.model_validate(result["game"]),
        recommended_difficulty=result["recommended_difficulty"],
        reason=result["reason"],
    ).model_dump())


@router.get("/session/{game_code}", response_model=ApiResponse)
def get_game_session(
    game_code: str,
    difficulty: int = 1,
    request: Request = None,
    db: Session = Depends(get_db),
):
    user = _extract_user(request, db)
    try:
        session = generate_game_session(db, game_code, difficulty, user.id)
        return ApiResponse(data=session.model_dump())
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/result", response_model=ApiResponse)
def post_game_result(
    req: GameResultSubmit,
    request: Request,
    db: Session = Depends(get_db),
):
    user = _extract_user(request, db)
    result = submit_game_result(db, user.id, req)
    return ApiResponse(data=GameResultResponse.model_validate(result).model_dump())


@router.get("/history", response_model=ApiResponse)
def game_history(
    request: Request,
    game_id: str = None,
    limit: int = 20,
    db: Session = Depends(get_db),
):
    user = _extract_user(request, db)
    results = get_game_history(db, user.id, game_id, limit)
    return ApiResponse(data=[GameResultResponse.model_validate(r).model_dump() for r in results])
