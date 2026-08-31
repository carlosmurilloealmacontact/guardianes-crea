from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import Intento, Progreso, ProgresoEstado, Quiz, Usuario
from app.schemas import IntentoCreate, IntentoOut, QuizOut
from app.security import get_current_user

router = APIRouter(prefix="/quizzes", tags=["quizzes"])


@router.get("/by-actividad/{actividad_id}", response_model=QuizOut)
def obtener_quiz_por_actividad(
    actividad_id: int, db: Session = Depends(get_db), _: Usuario = Depends(get_current_user)
) -> Quiz:
    quiz = (
        db.query(Quiz)
        .options(joinedload(Quiz.preguntas))
        .filter(Quiz.actividad_id == actividad_id)
        .first()
    )
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz no encontrado para esta actividad")
    return quiz


@router.get("/{quiz_id}", response_model=QuizOut)
def obtener_quiz(
    quiz_id: int, db: Session = Depends(get_db), _: Usuario = Depends(get_current_user)
) -> Quiz:
    quiz = (
        db.query(Quiz)
        .options(joinedload(Quiz.preguntas))
        .filter(Quiz.id == quiz_id)
        .first()
    )
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz no encontrado")
    return quiz


@router.post("/{quiz_id}/intentos", response_model=IntentoOut)
def enviar_intento(
    quiz_id: int,
    payload: IntentoCreate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user),
) -> Intento:
    quiz = (
        db.query(Quiz)
        .options(joinedload(Quiz.preguntas))
        .filter(Quiz.id == quiz_id)
        .first()
    )
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz no encontrado")

    total = len(quiz.preguntas)
    aciertos = sum(
        1
        for pregunta in quiz.preguntas
        if payload.respuestas.get(str(pregunta.id)) == pregunta.respuesta_correcta
    )
    score = round((aciertos / total) * 100, 2) if total else 0.0
    aprobado = score >= quiz.aprobacion_minima

    intento = Intento(
        usuario_id=usuario.id,
        quiz_id=quiz_id,
        respuestas=payload.respuestas,
        score=score,
        aprobado=aprobado,
    )
    db.add(intento)

    registro_progreso = (
        db.query(Progreso)
        .filter(
            Progreso.usuario_id == usuario.id,
            Progreso.actividad_id == quiz.actividad_id,
        )
        .first()
    )
    if registro_progreso is None:
        registro_progreso = Progreso(
            usuario_id=usuario.id,
            nivel_id=quiz.actividad.nivel_id,
            actividad_id=quiz.actividad_id,
        )
        db.add(registro_progreso)
    if aprobado:
        registro_progreso.estado = ProgresoEstado.completado

    db.commit()
    db.refresh(intento)
    return intento
