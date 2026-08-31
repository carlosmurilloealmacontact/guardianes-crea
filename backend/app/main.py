from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.config import CORS_ORIGINS
from app.routers import auth, niveles, progreso, quizzes

Base.metadata.create_all(bind=engine)

app = FastAPI(title="E-learning Contact Center Aerolínea", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(auth.router)
app.include_router(niveles.router)
app.include_router(progreso.router)
app.include_router(quizzes.router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}
