"""Business operations for dishes and dashboard statistics."""

from sqlalchemy import case, func, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models import ActivityLog, Dish, utc_now
from app.schemas import DishStats
from app.services.exceptions import DatabaseServiceError, DishNotFoundError


class DishService:
    """Coordinate dish persistence and related audit logging."""

    @staticmethod
    def list_dishes(db: Session) -> list[Dish]:
        try:
            return list(db.scalars(select(Dish).order_by(Dish.name.asc())).all())
        except SQLAlchemyError as exc:
            raise DatabaseServiceError("list dishes") from exc

    @staticmethod
    def get_stats(db: Session) -> DishStats:
        try:
            total, published = db.execute(
                select(
                    func.count(Dish.id),
                    func.sum(case((Dish.is_published.is_(True), 1), else_=0)),
                )
            ).one()
            total_count = int(total or 0)
            published_count = int(published or 0)
            return DishStats(
                total_dishes=total_count,
                published_count=published_count,
                unpublished_count=total_count - published_count,
            )
        except SQLAlchemyError as exc:
            raise DatabaseServiceError("calculate dish statistics") from exc

    @staticmethod
    def toggle_publish_status(db: Session, dish_id: int) -> Dish:
        try:
            dish = db.get(Dish, dish_id)
            if dish is None:
                raise DishNotFoundError(dish_id)

            dish.is_published = not dish.is_published
            dish.updated_at = utc_now()
            db.add(
                ActivityLog(
                    dish_id=dish.id,
                    dish_name=dish.name,
                    action="published" if dish.is_published else "unpublished",
                )
            )
            db.commit()
            db.refresh(dish)
            return dish
        except DishNotFoundError:
            db.rollback()
            raise
        except SQLAlchemyError as exc:
            db.rollback()
            raise DatabaseServiceError("toggle dish publish status") from exc
