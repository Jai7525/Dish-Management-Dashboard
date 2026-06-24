"""Idempotently seed the database with the dashboard's initial dishes."""

from sqlalchemy import delete, select

from app.database import SessionLocal, init_db
from app.models import ActivityLog, Dish


DISHES = [
    {
        "name": "Pizza",
        "description": "Cheesy pizza with tomato and herbs",
        "image_url": "/images/pizza.jpg",
        "is_published": True,
    },
    {
        "name": "Burger",
        "description": "Classic burger with fresh vegetables",
        "image_url": "/images/burger.jpg",
        "is_published": True,
    },
    {
        "name": "Pasta",
        "description": "Italian pasta with white sauce",
        "image_url": "/images/pasta.jpg",
        "is_published": True,
    },
    {
        "name": "Chicken Biryani",
        "description": "Spicy chicken biryani with basmati rice",
        "image_url": "/images/biryani.jpg",
        "is_published": False,
    },
    {
        "name": "Caesar Salad",
        "description": "Fresh Caesar salad with chicken",
        "image_url": "/images/salad.jpg",
        "is_published": True,
    },
    {
        "name": "Chocolate Cake",
        "description": "Rich chocolate cake with ganache",
        "image_url": "/images/cake.jpg",
        "is_published": False,
    },
]


def seed_database() -> tuple[int, int, int]:
    """Synchronize the database with the six-dish starter catalog."""
    init_db()

    with SessionLocal.begin() as db:
        db.execute(delete(ActivityLog))
        existing_dishes = {dish.name: dish for dish in db.scalars(select(Dish)).all()}
        desired_names = {dish["name"] for dish in DISHES}
        removed = 0

        for name, dish in existing_dishes.items():
            if name not in desired_names:
                db.delete(dish)
                removed += 1

        inserted = 0
        for seed_data in DISHES:
            dish = existing_dishes.get(seed_data["name"])
            if dish is None:
                db.add(Dish(**seed_data))
                inserted += 1
                continue

            dish.description = seed_data["description"]
            dish.image_url = seed_data["image_url"]
            dish.is_published = seed_data["is_published"]

    with SessionLocal() as db:
        total = len(db.scalars(select(Dish.id)).all())

    return inserted, removed, total


if __name__ == "__main__":
    inserted, removed, total = seed_database()
    print(
        f"Seed complete: inserted {inserted}, removed {removed}; "
        f"database contains {total} dish(es)."
    )
