# E-learning — Contact Center Aerolínea

LMS a medida para el Modelo CREA (100% async individual). Ver [PROPUESTA.md](PROPUESTA.md) para el diseño completo (niveles, reemplazos de dinámicas, arquitectura).

## Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp ../.env.example ../.env
python -m app.seed_crea      # carga los niveles del Modelo CREA
uvicorn app.main:app --reload
```

API disponible en `http://localhost:8000`, docs interactivas en `http://localhost:8000/docs`.

## Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Portal en `http://localhost:5173` (requiere el backend corriendo en paralelo). Registro/login, listado de niveles con progreso, detalle de nivel con sus actividades (video, interactivas, quiz) y marcado de progreso — probado end-to-end en navegador.

## Estado
- Motor de niveles/actividades/quizzes/progreso (backend): MVP funcional
- Portal Agente (frontend): MVP funcional — login, niveles, progreso, quiz
- Contenido real (videos, imágenes, preguntas de quiz): pendiente de carga — el seed trae la estructura con placeholders donde falta el material original
- Mecánica específica de cada ejercicio interactivo (Stroop digital, mapa de empatía, llamada simulada, etc.): hoy se muestra como texto descriptivo + botón "marcar completada"; falta diseñar/construir cada una como UI propia
- Panel Admin/Supervisor: pendiente

## Despliegue inicial

El frontend se puede desplegar en Vercel configurando `frontend/` como Root Directory y `VITE_API_URL` con la URL pública del backend. El backend se puede desplegar como servicio Python en Render usando `render.yaml`; requiere una base PostgreSQL y las variables `DATABASE_URL` y `CORS_ORIGINS`.

Para desarrollo, copiar `.env.example` a `.env` en la raíz y `frontend/.env.example` a `frontend/.env`. El registro público siempre crea usuarios con rol `agente`; los privilegios administrativos no se asignan desde el cliente.
