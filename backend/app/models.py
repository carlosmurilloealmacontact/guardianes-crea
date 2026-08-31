import enum
from datetime import datetime

from sqlalchemy import (
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Integer,
    Boolean,
    JSON,
    String,
    Text,
    UniqueConstraint,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Rol(str, enum.Enum):
    agente = "agente"
    admin = "admin"


class RutaTipo(str, enum.Enum):
    onboarding = "onboarding"
    refuerzo = "refuerzo"


class ActividadTipo(str, enum.Enum):
    rompehielos = "rompehielos"
    recorderis = "recorderis"
    video = "video"
    interactiva = "interactiva"
    quiz = "quiz"
    cierre = "cierre"


class NivelEstado(str, enum.Enum):
    completo = "completo"
    gap = "gap"


class ProgresoEstado(str, enum.Enum):
    pendiente = "pendiente"
    en_progreso = "en_progreso"
    completado = "completado"


class Usuario(Base):
    __tablename__ = "usuarios"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120))
    email: Mapped[str] = mapped_column(String(160), unique=True, index=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    rol: Mapped[Rol] = mapped_column(Enum(Rol), default=Rol.agente)
    equipo: Mapped[str | None] = mapped_column(String(120), nullable=True)
    creado_en: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    progresos: Mapped[list["Progreso"]] = relationship(back_populates="usuario")
    intentos: Mapped[list["Intento"]] = relationship(back_populates="usuario")


class Nivel(Base):
    __tablename__ = "niveles"

    id: Mapped[int] = mapped_column(primary_key=True)
    numero: Mapped[int] = mapped_column(Integer, unique=True)
    nombre: Mapped[str] = mapped_column(String(160))
    principio: Mapped[str | None] = mapped_column(String(200), nullable=True)
    objetivo: Mapped[str | None] = mapped_column(Text, nullable=True)
    competencia: Mapped[str | None] = mapped_column(Text, nullable=True)
    estado: Mapped[NivelEstado] = mapped_column(Enum(NivelEstado), default=NivelEstado.gap)
    codigo: Mapped[str | None] = mapped_column(String(40), nullable=True, unique=True)
    orden_ruta: Mapped[float | None] = mapped_column(Float, nullable=True)
    duracion_minutos: Mapped[int | None] = mapped_column(Integer, nullable=True)
    momento: Mapped[str | None] = mapped_column(String(30), nullable=True)
    es_transversal: Mapped[bool] = mapped_column(Boolean, default=False)
    requiere_certificacion_presencial: Mapped[bool] = mapped_column(Boolean, default=False)
    conexion_sala: Mapped[str | None] = mapped_column(Text, nullable=True)

    actividades: Mapped[list["Actividad"]] = relationship(
        back_populates="nivel", order_by="Actividad.orden"
    )


class Actividad(Base):
    __tablename__ = "actividades"

    id: Mapped[int] = mapped_column(primary_key=True)
    nivel_id: Mapped[int] = mapped_column(ForeignKey("niveles.id"))
    tipo: Mapped[ActividadTipo] = mapped_column(Enum(ActividadTipo))
    orden: Mapped[int] = mapped_column(Integer)
    titulo: Mapped[str] = mapped_column(String(200))
    contenido: Mapped[dict] = mapped_column(JSON, default=dict)
    asset_ref: Mapped[str | None] = mapped_column(String(300), nullable=True)

    nivel: Mapped["Nivel"] = relationship(back_populates="actividades")
    quiz: Mapped["Quiz | None"] = relationship(back_populates="actividad", uselist=False)
    progresos: Mapped[list["Progreso"]] = relationship(back_populates="actividad")

    __table_args__ = (UniqueConstraint("nivel_id", "orden", name="uq_actividad_orden_por_nivel"),)


class Quiz(Base):
    __tablename__ = "quizzes"

    id: Mapped[int] = mapped_column(primary_key=True)
    actividad_id: Mapped[int] = mapped_column(ForeignKey("actividades.id"), unique=True)
    aprobacion_minima: Mapped[int] = mapped_column(Integer, default=80)

    actividad: Mapped["Actividad"] = relationship(back_populates="quiz")
    preguntas: Mapped[list["Pregunta"]] = relationship(
        back_populates="quiz", order_by="Pregunta.orden"
    )
    intentos: Mapped[list["Intento"]] = relationship(back_populates="quiz")


class Pregunta(Base):
    __tablename__ = "preguntas"

    id: Mapped[int] = mapped_column(primary_key=True)
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id"))
    orden: Mapped[int] = mapped_column(Integer)
    enunciado: Mapped[str] = mapped_column(Text)
    opciones: Mapped[dict] = mapped_column(JSON)
    respuesta_correcta: Mapped[str] = mapped_column(String(200))

    quiz: Mapped["Quiz"] = relationship(back_populates="preguntas")


class Intento(Base):
    __tablename__ = "intentos"

    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    quiz_id: Mapped[int] = mapped_column(ForeignKey("quizzes.id"))
    respuestas: Mapped[dict] = mapped_column(JSON)
    score: Mapped[float] = mapped_column(Integer)
    aprobado: Mapped[bool] = mapped_column(Boolean, default=False)
    creado_en: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    usuario: Mapped["Usuario"] = relationship(back_populates="intentos")
    quiz: Mapped["Quiz"] = relationship(back_populates="intentos")


class Cohorte(Base):
    __tablename__ = "cohortes"

    id: Mapped[int] = mapped_column(primary_key=True)
    nombre: Mapped[str] = mapped_column(String(160))
    tipo: Mapped[RutaTipo] = mapped_column(Enum(RutaTipo))
    fecha_inicio: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    usuarios: Mapped[list["CohorteUsuario"]] = relationship(back_populates="cohorte")


class CohorteUsuario(Base):
    __tablename__ = "cohorte_usuarios"

    cohorte_id: Mapped[int] = mapped_column(ForeignKey("cohortes.id"), primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"), primary_key=True)

    cohorte: Mapped["Cohorte"] = relationship(back_populates="usuarios")


class Progreso(Base):
    __tablename__ = "progreso"

    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    nivel_id: Mapped[int] = mapped_column(ForeignKey("niveles.id"))
    actividad_id: Mapped[int] = mapped_column(ForeignKey("actividades.id"))
    estado: Mapped[ProgresoEstado] = mapped_column(
        Enum(ProgresoEstado), default=ProgresoEstado.pendiente
    )
    actualizado_en: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )

    usuario: Mapped["Usuario"] = relationship(back_populates="progresos")
    actividad: Mapped["Actividad"] = relationship(back_populates="progresos")

    __table_args__ = (
        UniqueConstraint("usuario_id", "actividad_id", name="uq_progreso_usuario_actividad"),
    )


class RefuerzoRND(Base):
    __tablename__ = "refuerzos_rnd"

    id: Mapped[int] = mapped_column(primary_key=True)
    usuario_id: Mapped[int] = mapped_column(ForeignKey("usuarios.id"))
    numero_ronda: Mapped[int] = mapped_column(Integer)
    dias_despues: Mapped[int] = mapped_column(Integer)
    fecha_objetivo: Mapped[datetime] = mapped_column(DateTime)
    estado: Mapped[str] = mapped_column(String(20), default="pendiente")
    creado_en: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    __table_args__ = (
        UniqueConstraint("usuario_id", "numero_ronda", name="uq_refuerzo_rnd_usuario_ronda"),
    )
