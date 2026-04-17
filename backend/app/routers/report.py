from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.report import generate_weekly_report, get_reports
from app.services.auth import get_user_by_id
from app.schemas.common import ApiResponse, ReportResponse
from app.utils.security import decode_access_token
from app.models.user import User

router = APIRouter(prefix="/api/v1/report", tags=["认知报告"])


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


@router.get("/weekly", response_model=ApiResponse)
def get_weekly_report(request: Request, db: Session = Depends(get_db)):
    user = _extract_user(request, db)
    reports = get_reports(db, user.id, "weekly", 1)
    if not reports:
        report = generate_weekly_report(db, user.id)
        if not report:
            return ApiResponse(data={"message": "本周暂无训练数据，请先完成一些健脑游戏"})
    else:
        report = reports[0]
    return ApiResponse(data=ReportResponse.model_validate(report).model_dump())


@router.post("/weekly/generate", response_model=ApiResponse)
def create_weekly_report(request: Request, db: Session = Depends(get_db)):
    user = _extract_user(request, db)
    report = generate_weekly_report(db, user.id)
    if not report:
        return ApiResponse(data={"message": "本周暂无训练数据"})
    return ApiResponse(data=ReportResponse.model_validate(report).model_dump())


@router.get("/list", response_model=ApiResponse)
def list_reports(
    request: Request,
    report_type: str = None,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    user = _extract_user(request, db)
    reports = get_reports(db, user.id, report_type, limit)
    return ApiResponse(data=[ReportResponse.model_validate(r).model_dump() for r in reports])
