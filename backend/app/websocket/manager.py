"""WebSocket client lifecycle and event broadcasting."""

import asyncio
from typing import Any

from fastapi import WebSocket


class ConnectionManager:
    """Track active clients and broadcast JSON messages to each of them."""

    def __init__(self) -> None:
        self._connections: set[WebSocket] = set()
        self._lock = asyncio.Lock()

    @property
    def active_connection_count(self) -> int:
        return len(self._connections)

    async def connect(self, websocket: WebSocket) -> None:
        await websocket.accept()
        async with self._lock:
            self._connections.add(websocket)

    async def disconnect(self, websocket: WebSocket) -> None:
        async with self._lock:
            self._connections.discard(websocket)

    async def broadcast(self, message: dict[str, Any]) -> None:
        """Send an event to all clients and remove unreachable connections."""
        async with self._lock:
            connections = tuple(self._connections)

        if not connections:
            return

        results = await asyncio.gather(
            *(connection.send_json(message) for connection in connections),
            return_exceptions=True,
        )
        stale_connections = [
            connection
            for connection, result in zip(connections, results, strict=True)
            if isinstance(result, BaseException)
        ]

        if stale_connections:
            async with self._lock:
                self._connections.difference_update(stale_connections)


manager = ConnectionManager()
