# Contexto del proyecto — E-learning Contact Center Aerolínea

## Propósito

LMS para formación asíncrona individual de agentes de un contact center de aerolínea, basado en el Modelo CREA. El portal permite autenticación, consulta de niveles, ejecución de actividades y registro de progreso.

## Estructura

- `backend/`: API FastAPI con SQLAlchemy.
  - `backend/app/main.py`: crea tablas, configura CORS y registra routers.
  - `backend/app/models.py`: modelos y enums de usuarios, niveles, actividades, quizzes, intentos, cohortes y progreso.
  - `backend/app/schemas.py`: contratos Pydantic de entrada/salida.
  - `backend/app/security.py`: hash bcrypt y JWT Bearer.
  - `backend/app/routers/`: endpoints de auth, niveles, progreso y quizzes.
  - `backend/app/seed_crea.py`: carga la estructura y contenido inicial del Modelo CREA.
- `frontend/`: SPA React 19 + Vite + React Router.
  - `src/pages/`: login, listado de niveles y detalle de nivel.
  - `src/components/activities/`: actividades interactivas individuales.
  - `src/components/Quiz.jsx`: flujo de preguntas y envío de intentos.
  - `src/context/AuthContext.jsx`: token persistido en `localStorage`.
  - `src/api.js`: cliente HTTP del backend.
- `Imagenes/`: recursos originales; los recursos servidos por la app están copiados en `frontend/public/brand/`.
- `PROPUESTA.md`: propuesta técnica y pedagógica inicial del proyecto.
- `CREA_2.0_Ruta_Elearning.docx` (fuera del repositorio, entregado por el usuario): guía funcional vigente de implementación de CREA 2.0; es la referencia principal para módulos, objetivos, secuencia, modalidad y criterios pedagógicos.

## Jerarquía de referencia funcional

La guía CREA 2.0 tiene prioridad sobre la propuesta inicial cuando exista una diferencia. El producto debe implementar esa guía y puede conservar o agregar actividades propias siempre que complementen sus objetivos, no cambien la secuencia ni contradigan sus criterios. Las decisiones nuevas deben documentarse antes de alterar la ruta formativa.

## Stack y configuración

- Backend: Python, FastAPI, Uvicorn, SQLAlchemy 2, SQLite por defecto o PostgreSQL mediante `DATABASE_URL`.
- Frontend: React, Vite, `react-router-dom`.
- Variables backend: `DATABASE_URL`, `JWT_SECRET_KEY`, `JWT_EXPIRE_MINUTES`; ejemplo en `.env.example`.
- URL frontend del backend: `VITE_API_URL`, con fallback a `http://localhost:8000`.

## Arranque local

Backend, desde `backend/`:

```powershell
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m app.seed_crea
uvicorn app.main:app --reload
```

Frontend, desde `frontend/`:

```powershell
npm install
npm run dev
```

API: `http://localhost:8000`; documentación: `/docs`; health check: `/health`.

## Flujos actuales

1. El usuario se registra o inicia sesión en `/login`.
2. El JWT se guarda en `localStorage` y protege `/niveles` y `/niveles/:id`.
3. El backend devuelve niveles con actividades ordenadas por `orden`.
4. Las actividades interactivas se resuelven en el navegador y notifican completitud al endpoint de progreso.
5. Los quizzes se califican en backend; cualquier intento marca su actividad como completada.

Endpoints principales: `POST /auth/register`, `POST /auth/login`, `GET /niveles`, `GET /niveles/{id}`, `GET /progreso/me`, `PUT /progreso/actividades/{id}`, `GET /quizzes/by-actividad/{id}`, `POST /quizzes/{id}/intentos`.

## Contenido y estado funcional

El seed define siete niveles del Modelo CREA. Los niveles 1–7 tienen actividades cargadas; la guía CREA 2.0 organiza además un eje transversal de sensibilidad intercultural y define el recorrido como complementario a la formación presencial. El estado actual combina la ruta de la propuesta inicial con actividades propias como Stroop, clasificador, mapa de empatía, semáforo, memoria, ordenamiento, respuesta cronometrada, dibujo a ciegas y llamada simulada. La siguiente evolución debe contrastar cada nivel con la guía vigente y conservar esas actividades como extensiones pedagógicas válidas.

El MVP del portal de agente está operativo. El contenido audiovisual real está incompleto y algunos videos usan placeholders o solo descripción. El panel de administración/supervisión aún no está implementado. No hay suite de tests automatizados visible en este proyecto.

## Convenciones y puntos de atención

- Mantener el contenido pedagógico y sus decisiones alineados con `PROPUESTA.md` y el esquema de `seed_crea.py`.
- Para añadir una actividad interactiva, registrar su componente en `src/components/activities/index.js` y usar el mismo contrato `data` + `onCompletar`.
- El progreso es por usuario y actividad, con restricción única en `(usuario_id, actividad_id)`.
- No exponer `respuesta_correcta` en las respuestas de quizzes; el schema actual ya la excluye.
- Cambiar `JWT_SECRET_KEY` antes de cualquier despliegue y restringir CORS; ambos valores actuales son adecuados solo para desarrollo.
- `Base.metadata.create_all` se ejecuta al importar la aplicación: no hay migraciones versionadas.
- El registro acepta `rol` desde el cliente; antes de producción debe impedir que un usuario se autoasigne privilegios de administrador.
- El `frontend/README.md` pertenece al scaffold de Vite; la documentación operativa principal está en el README raíz y aquí.

## Próximos pasos naturales

Implementar la guía CREA 2.0 como ruta canónica, incorporando el eje intercultural, el Protocolo RND, los objetivos y criterios de aprobación definidos allí; después integrar las actividades propias que los complementen. También completar y validar contenido, reemplazar placeholders por assets reales, mejorar persistencia/criterios de resultados, crear panel admin/supervisor, añadir migraciones y pruebas, y endurecer autenticación, CORS y permisos antes de producción.
