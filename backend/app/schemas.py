from datetime import datetime

from pydantic import BaseModel, EmailStr

from app.models import ActividadTipo, NivelEstado, ProgresoEstado, Rol, RutaTipo


class UsuarioCreate(BaseModel):
    nombre: str
    email: EmailStr
    password: str
    equipo: str | None = None


class UsuarioOut(BaseModel):
    id: int
    nombre: str
    email: EmailStr
    rol: Rol
    equipo: str | None

    model_config = {"from_attributes": True}


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class ActividadOut(BaseModel):
    id: int
    nivel_id: int
    tipo: ActividadTipo
    orden: int
    titulo: str
    contenido: dict
    asset_ref: str | None

    model_config = {"from_attributes": True}


class NivelOut(BaseModel):
    id: int
    numero: int
    nombre: str
    principio: str | None
    objetivo: str | None
    competencia: str | None
    estado: NivelEstado
    actividades: list[ActividadOut] = []

    model_config = {"from_attributes": True}


class PreguntaOut(BaseModel):
    id: int
    orden: int
    enunciado: str
    opciones: dict

    model_config = {"from_attributes": True}


class QuizOut(BaseModel):
    id: int
    actividad_id: int
    preguntas: list[PreguntaOut] = []

    model_config = {"from_attributes": True}


class IntentoCreate(BaseModel):
    respuestas: dict[str, str]


class IntentoOut(BaseModel):
    id: int
    score: float
    creado_en: datetime
    respuestas: dict

    model_config = {"from_attributes": True}


class ProgresoUpdate(BaseModel):
    estado: ProgresoEstado


class ProgresoOut(BaseModel):
    id: int
    nivel_id: int
    actividad_id: int
    estado: ProgresoEstado
    actualizado_en: datetime

    model_config = {"from_attributes": True}


class CohorteCreate(BaseModel):
    nombre: str
    tipo: RutaTipo
