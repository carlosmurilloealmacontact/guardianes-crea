from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Actividad, Progreso, RefuerzoRND, Usuario
from app.schemas import ProgresoOut, ProgresoUpdate, RefuerzoOut
from app.security import get_current_user

router = APIRouter(prefix="/progreso", tags=["progreso"])


@router.get("/refuerzos-rnd", response_model=list[RefuerzoOut])
def mis_refuerzos_rnd(
    db: Session = Depends(get_db), usuario: Usuario = Depends(get_current_user)
) -> list[RefuerzoRND]:
    return db.query(RefuerzoRND).filter(RefuerzoRND.usuario_id == usuario.id).order_by(RefuerzoRND.fecha_objetivo).all()


@router.get("/me", response_model=list[ProgresoOut])
def mi_progreso(
    db: Session = Depends(get_db), usuario: Usuario = Depends(get_current_user)
) -> list[Progreso]:
    return db.query(Progreso).filter(Progreso.usuario_id == usuario.id).all()


@router.put("/actividades/{actividad_id}", response_model=ProgresoOut)
def actualizar_progreso(
    actividad_id: int,
    payload: ProgresoUpdate,
    db: Session = Depends(get_db),
    usuario: Usuario = Depends(get_current_user),
) -> Progreso:
    actividad = db.get(Actividad, actividad_id)
    if actividad is None:
        raise HTTPException(status_code=404, detail="Actividad no encontrada")

    registro = (
        db.query(Progreso)
        .filter(Progreso.usuario_id == usuario.id, Progreso.actividad_id == actividad_id)
        .first()
    )
    if registro is None:
        registro = Progreso(
            usuario_id=usuario.id,
            nivel_id=actividad.nivel_id,
            actividad_id=actividad_id,
        )
        db.add(registro)

    registro.estado = payload.estado
    db.commit()
    db.refresh(registro)
    return registro
