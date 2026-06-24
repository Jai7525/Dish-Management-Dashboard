"""Read operations for recent dashboard activity."""

from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models import ActivityLog
from app.services.exceptions import DatabaseServiceError


class ActivityService:
    """Provide activity-log data for API consumers."""

    @staticmethod
    def list_recent(db: Session, limit: int = 10) -> list[ActivityLog]:
        try:
            statement = (
                select(ActivityLog)
                .order_by(ActivityLog.created_at.desc(), ActivityLog.id.desc())
                .limit(limit)
            )
            return list(db.scalars(statement).all())
        except SQLAlchemyError as exc:
            raise DatabaseServiceError("list recent activity") from exc
