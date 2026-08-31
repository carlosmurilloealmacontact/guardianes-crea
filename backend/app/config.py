import os

from typing import Final

from dotenv import load_dotenv

load_dotenv()

DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./elearning.db")
JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "change-me")
JWT_ALGORITHM: str = "HS256"
JWT_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES", "480"))

_cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173")
CORS_ORIGINS: Final[list[str]] = [origin.strip() for origin in _cors_origins.split(",") if origin.strip()]

if JWT_SECRET_KEY == "change-me" and os.getenv("ENVIRONMENT", "development") != "development":
    raise RuntimeError("JWT_SECRET_KEY debe configurarse fuera de desarrollo")
