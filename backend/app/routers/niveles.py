from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import Nivel, Usuario
from app.schemas import NivelOut
from app.security import get_current_user

router = APIRouter(prefix="/niveles", tags=["niveles"])


@router.get("", response_model=list[NivelOut])
def listar_niveles(
    db: Session = Depends(get_db), _: Usuario = Depends(get_current_user)
) -> list[Nivel]:
    return (
        db.query(Nivel)
        .options(joinedload(Nivel.actividades))
        .order_by(Nivel.numero)
        .all()
    )


@router.get("/{nivel_id}", response_model=NivelOut)
def obtener_nivel(
    nivel_id: int, db: Session = Depends(get_db), _: Usuario = Depends(get_current_user)
) -> Nivel:
    nivel = (
        db.query(Nivel)
        .options(joinedload(Nivel.actividades))
        .filter(Nivel.id == nivel_id)
        .first()
    )
    if nivel is None:
        raise HTTPException(status_code=404, detail="Nivel no encontrado")
    return nivel
