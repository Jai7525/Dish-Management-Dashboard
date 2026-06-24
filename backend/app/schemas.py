"""Pydantic request and response schemas."""

from datetime import datetime, timezone
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_serializer


def serialize_utc(value: datetime) -> str:
    """Serialize SQLite datetimes as explicit UTC ISO-8601 values."""
    if value.tzinfo is None:
        value = value.replace(tzinfo=timezone.utc)
    else:
        value = value.astimezone(timezone.utc)
    return value.isoformat().replace("+00:00", "Z")


class DishBase(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    description: str = Field(min_length=1)
    image_url: str = Field(min_length=1, max_length=500)
    is_published: bool = False


class DishCreate(DishBase):
    pass


class DishRead(DishBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    updated_at: datetime

    @field_serializer("created_at", "updated_at")
    def serialize_timestamps(self, value: datetime) -> str:
        return serialize_utc(value)


class ActivityLogRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    dish_id: int
    dish_name: str
    action: str
    created_at: datetime

    @field_serializer("created_at")
    def serialize_timestamp(self, value: datetime) -> str:
        return serialize_utc(value)


class DishStats(BaseModel):
    total_dishes: int
    published_count: int
    unpublished_count: int


class DishUpdatedEvent(BaseModel):
    event: Literal["dish_updated"] = "dish_updated"
    dish: DishRead
    stats: DishStats
    activity: ActivityLogRead


class HealthResponse(BaseModel):
    status: str
    database: str
