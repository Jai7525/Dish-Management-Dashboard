"""FastAPI application entry point."""

from contextlib import asynccontextmanager
from collections.abc import AsyncIterator
import os

from fastapi import Depends, FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import text
from sqlalchemy.orm import Session

from app.database import get_db, init_db
from app.routes.api import router as api_router
from app.schemas import HealthResponse
from app.services.exceptions import DatabaseServiceError, DishNotFoundError
from app.websocket.routes import router as websocket_router


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    """Initialize application resources before accepting requests."""
    init_db()
    yield


app = FastAPI(
    title="Dish Management API",
    description="Backend API for managing restaurant dish visibility.",
    version="1.0.0",
    lifespan=lifespan,
)
default_origins = (
    "http://localhost:5173,http://127.0.0.1:5173,"
    "http://localhost:4173,http://127.0.0.1:4173"
)
allowed_origins = [
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", default_origins).split(",")
    if origin.strip()
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "PATCH", "OPTIONS"],
    allow_headers=["Content-Type"],
)
app.include_router(api_router)
app.include_router(websocket_router)


@app.exception_handler(DishNotFoundError)
async def dish_not_found_handler(
    _: Request, exc: DishNotFoundError
) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={"detail": str(exc)},
    )


@app.exception_handler(DatabaseServiceError)
async def database_error_handler(
    _: Request, __: DatabaseServiceError
) -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"detail": "A database error occurred"},
    )


@app.get("/health", response_model=HealthResponse, tags=["System"])
def health_check(db: Session = Depends(get_db)) -> HealthResponse:
    """Report API and database availability."""
    db.execute(text("SELECT 1"))
    return HealthResponse(status="healthy", database="connected")
