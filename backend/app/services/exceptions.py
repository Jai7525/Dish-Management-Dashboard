"""Domain exceptions raised by application services."""


class DishNotFoundError(Exception):
    """Raised when a requested dish does not exist."""

    def __init__(self, dish_id: int) -> None:
        self.dish_id = dish_id
        super().__init__(f"Dish with id {dish_id} was not found")


class DatabaseServiceError(Exception):
    """Raised when a service cannot complete a database operation."""

    def __init__(self, operation: str) -> None:
        self.operation = operation
        super().__init__(f"Database operation failed: {operation}")
