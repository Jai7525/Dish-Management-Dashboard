"""HTTP endpoints for dashboard data and dish actions."""

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas import (
    ActivityLogRead,
    DishRead,
    DishStats,
    DishUpdatedEvent,
)
from app.services.activity_service import ActivityService
from app.services.dish_service import DishService
from app.websocket.manager import manager


router = APIRouter(prefix="/api")
DatabaseSession = Annotated[Session, Depends(get_db)]


@router.get("/dishes", response_model=list[DishRead], tags=["Dishes"])
def list_dishes(db: DatabaseSession) -> list[DishRead]:
    return DishService.list_dishes(db)


@router.get("/stats", response_model=DishStats, tags=["Dashboard"])
def get_stats(db: DatabaseSession) -> DishStats:
    return DishService.get_stats(db)


@router.get("/activity", response_model=list[ActivityLogRead], tags=["Dashboard"])
def list_recent_activity(db: DatabaseSession) -> list[ActivityLogRead]:
    return ActivityService.list_recent(db, limit=10)


@router.patch(
    "/dishes/{dish_id}/toggle",
    response_model=DishRead,
    status_code=status.HTTP_200_OK,
    tags=["Dishes"],
)
async def toggle_dish(dish_id: int, db: DatabaseSession) -> DishRead:
    dish = DishService.toggle_publish_status(db, dish_id)
    stats = DishService.get_stats(db)
    activity = ActivityService.list_recent(db, limit=1)[0]
    event = DishUpdatedEvent(
        dish=DishRead.model_validate(dish),
        stats=stats,
        activity=ActivityLogRead.model_validate(activity),
    )
    await manager.broadcast(event.model_dump(mode="json"))
    return dish
