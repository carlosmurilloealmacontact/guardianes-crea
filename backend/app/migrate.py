"""Aplica cambios de esquema pequeños en instalaciones existentes.

Ejecutar una vez antes de volver a sembrar contenido en una base ya creada.
"""

from sqlalchemy import inspect, text

from app.database import Base, engine


def migrate() -> None:
    Base.metadata.create_all(bind=engine)
    inspector = inspect(engine)
    with engine.begin() as connection:
        nivel_columns = {column["name"] for column in inspector.get_columns("niveles")}
        nivel_additions = {
            "codigo": "VARCHAR(40)",
            "duracion_minutos": "INTEGER",
            "momento": "VARCHAR(30)",
            "es_transversal": "BOOLEAN NOT NULL DEFAULT FALSE",
            "requiere_certificacion_presencial": "BOOLEAN NOT NULL DEFAULT FALSE",
            "conexion_sala": "TEXT",
            "orden_ruta": "DOUBLE PRECISION",
        }
        for column, definition in nivel_additions.items():
            if column not in nivel_columns:
                connection.execute(text(f"ALTER TABLE niveles ADD COLUMN {column} {definition}"))

        quiz_columns = {column["name"] for column in inspector.get_columns("quizzes")}
        if "aprobacion_minima" not in quiz_columns:
            connection.execute(
                text("ALTER TABLE quizzes ADD COLUMN aprobacion_minima INTEGER NOT NULL DEFAULT 80")
            )

        intento_columns = {column["name"] for column in inspector.get_columns("intentos")}
        if "aprobado" not in intento_columns:
            connection.execute(
                text("ALTER TABLE intentos ADD COLUMN aprobado BOOLEAN NOT NULL DEFAULT FALSE")
            )

        if "refuerzos_rnd" not in inspector.get_table_names():
            connection.execute(text(
                "CREATE TABLE refuerzos_rnd (id INTEGER PRIMARY KEY, "
                "usuario_id INTEGER NOT NULL, numero_ronda INTEGER NOT NULL, "
                "dias_despues INTEGER NOT NULL, fecha_objetivo TIMESTAMP NOT NULL, "
                "estado VARCHAR(20) NOT NULL DEFAULT 'pendiente', creado_en TIMESTAMP NOT NULL, "
                "CONSTRAINT uq_refuerzo_rnd_usuario_ronda UNIQUE (usuario_id, numero_ronda), "
                "FOREIGN KEY(usuario_id) REFERENCES usuarios(id))"
            ))

    print("Migración aplicada correctamente.")


if __name__ == "__main__":
    migrate()
