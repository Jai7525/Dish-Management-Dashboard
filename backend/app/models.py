"""SQLAlchemy models for dishes and their activity history."""

from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, Index, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


def utc_now() -> datetime:
    """Return the current UTC time for model defaults."""
    return datetime.now(timezone.utc)


class Dish(Base):
    """A restaurant dish whose customer visibility can be managed."""

    __tablename__ = "dishes"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_url: Mapped[str] = mapped_column(String(500), nullable=False)
    is_published: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, onupdate=utc_now, nullable=False
    )

    activity_logs: Mapped[list["ActivityLog"]] = relationship(
        back_populates="dish",
        cascade="all, delete-orphan",
    )


class ActivityLog(Base):
    """An audit entry describing an action performed on a dish."""

    __tablename__ = "activity_logs"
    __table_args__ = (Index("ix_activity_logs_created_at", "created_at"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    dish_id: Mapped[int] = mapped_column(
        ForeignKey("dishes.id", ondelete="CASCADE"), nullable=False, index=True
    )
    dish_name: Mapped[str] = mapped_column(String(120), nullable=False)
    action: Mapped[str] = mapped_column(String(50), nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utc_now, nullable=False
    )

    dish: Mapped[Dish] = relationship(back_populates="activity_logs")
