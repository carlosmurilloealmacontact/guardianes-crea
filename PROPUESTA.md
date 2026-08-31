# Propuesta — Plataforma E-learning Asesores Contact Center Aerolínea

## Decisiones (cerradas)
- **Arquitectura:** LMS a medida (opción 1), no LMS estándar SCORM/xAPI.
- **Alcance:** dual — nuevos ingresos (onboarding) y planta actual (refuerzo), con **foco prioritario en planta actual**.
- **Contenido base:** Modelo CREA (documento compartido), no el set genérico de 6 módulos por tema de la v1 de esta propuesta (queda como backlog futuro, ver abajo).
- **Modalidad:** 100% async individual. No hay sesiones en vivo ni consola de facilitador — cada asesor avanza solo, a su ritmo. Toda dinámica grupal del documento original se rediseña a una versión individual (ver tabla de reemplazos abajo).

## Público objetivo
Asesores de contact center (voz/chat/email) de una aerolínea. Dos rutas sobre el mismo motor:
- **Onboarding:** recorrido secuencial y obligatorio de los niveles CREA, ritmo de cohorte de ingreso.
- **Refuerzo (planta actual — prioridad de esta fase):** reasignación periódica de niveles/actividades puntuales, sesiones de facilitador programadas, sin depender de que sea su primer paso por el programa.

## Contenido base aportado: Modelo CREA
Ya existe un modelo pedagógico propio en construcción (fuente: `Cronograma modelo crea.md`), que reemplaza el esquema de "6 módulos por tema" de la primera versión de esta propuesta. El documento original fue diseñado **facilitado/presencial** (formador en vivo, dinámicas de salón); esta propuesta lo rediseña completo a **100% async individual** — cada dinámica grupal se reemplaza por una versión que el asesor resuelve solo (ver tabla de reemplazos abajo).

### Estructura fija por nivel
1. Principio (de servicio)
2. Objetivo
3. Competencia a desarrollar
4. Actividad rompehielos / activación cognitiva
5. Recorderis (recap del nivel anterior)
6. Video de introducción/contextualización
7. Actividad central del nivel (taller, laboratorio de casos, test)
8. Actividad y frase de cierre

### Niveles identificados (1–7) — revisión corregida, con lectura de modalidad
| Nivel | Foco | Principio | Actividades clave (fuente) | Dependencia presencial |
|---|---|---|---|---|
| 1 | Exploración clara — apertura de confianza | P4: Confianza es la prioridad | **Ninguna declarada** (solo principio/objetivo/competencia) | — (gap total) |
| 2 | Empatía y validación emocional | *(sin declarar — falta encabezado)* | Video + identificar emoción en imágenes y audios + dato LEA/MACA | Baja — traduce directo a individual/async |
| 3 | Exploración clara — indagación y escucha activa | P4: Anticipar evita fricción | Rompehielos Pulgar-Meñique y Colores/palabras (en vivo); taller de perfilamiento en mesas de 3; laboratorio de casos con tablero grupal; cierre "Dibujo a ciegas" en pareja | **Alta** — casi todo el nivel es dinámica grupal en salón |
| 4 | Lectura de momento — tipos de pasajero (analítico, práctico, expresivo, diplomático) | — | Debate en vivo; "Adivina el personaje" (preguntas a otro participante); cierre grupal con tarjetas de perfiles | **Alta** — depende de interacción entre pares |
| 5 | Manejo de silencios/hold — impacto en NPS | — | "El Formador Fantasma" (facilitador sale del salón); "La Noticia Ininterrumpida" (leer en voz alta mientras te lanzan números) | **Alta** — el efecto pedagógico depende de la sorpresa/tensión social en vivo |
| 6 | Resolución clara — alternativas y decisión | P2: Resolver bien genera experiencias | Rompehielos "Asociación Forzada" (señalar a alguien); test vía Google Forms + portal de resultados; video comparativo; cierre "Me voy de viaje" (cadena de memoria grupal) | Media — el test ya es async; los rompehielos/cierre son grupales |
| 7 | Anticipación y cierre — tipos de cierre | — | Role-play 30s; debate con ejemplos de vida real; desarrollo de "tipos de cierre" (Anticipación/Automático/Básico) **incompleto, corta a mitad** | Media-alta, y además contenido inacabado |

### Gaps y problemas detectados (corregidos) — YA CERRADOS EN LA PLATAFORMA
- **Nivel 1 no tenía actividades** — solo el encabezado (principio/objetivo/competencia). Se diseñó contenido nuevo: video de bienvenida, "Encuentra el dato clave" (manejo de herramientas), "Arma la apertura perfecta" (ordenar los 4 pasos de una apertura que genera confianza) y un cierre de clasificación (frases que generan vs. debilitan confianza).
- **Nivel 2 no tiene principio/objetivo/competencia declarados**, aunque sí tiene actividades completas. (Sin cambio — dato menor, no bloquea la plataforma.)
- **Nivel 7 cortaba a mitad** del desarrollo de "tipos de cierre". Se completó: clasificador de 3 categorías (Anticipación/Automático/Básico) con frases de cierre reales y explicación de cada una, más un cierre final con cronómetro para redactar un cierre de anticipación propio.
- Varios videos pendientes de grabar/agregar (marcados "FELIPE AGREGA/PRESENTA VIDEO") — sigue pendiente, no es bloqueante para el MVP.
- **Problema estructural de fondo:** los niveles 3, 4 y 5 están diseñados casi enteramente alrededor de dinámicas de salón con dependencia de grupo en tiempo real (señalar a un compañero, formador que desaparece, dibujar a ciegas en pareja, mesas de 3). Esto **no se traduce directo a e-learning autoguiado** — cada una de esas actividades necesita decidirse individualmente: ¿se rediseña para modalidad individual/async, o se preserva como sesión virtual sincrónica (videollamada con breakout rooms) usando la misma consola de facilitador?
- Ya existe un precedente async real y funcional: el test del Nivel 6 (Google Forms + portal Apps Script) — es el único componente del documento que ya nació pensado para consumo individual, y es la plantilla a seguir para el resto.
- Menciona datos de **LEA** (MACA) — hay que confirmar cómo se conecta con [Proyecto Nps x Lea](../Nps%20x%20Lea) si aplica, para no duplicar fuente de verdad de NPS/experiencia.

### Reemplazo de dinámicas grupales por versión individual (async)
Cada actividad que originalmente dependía de otra persona reaccionando en vivo se rediseña para que el asesor la resuelva solo, en pantalla:

| Nivel | Actividad original (grupal/en vivo) | Por qué necesitaba grupo | Reemplazo async individual |
|---|---|---|---|
| 3 | Pulgar-Meñique / Colores y palabras | En realidad cada quien ya lo hacía solo | Mini-ejercicio interactivo de coordinación (test de Stroop digital: tocar el color de la tinta, no la palabra, con temporizador y puntaje) |
| 3 | Taller de perfilamiento en mesas de 3 | Construcción colaborativa del arquetipo | Mapa de empatía digital: el asesor llena solo las 6 casillas (piensa/siente, ve, oye, dice/hace, miedos, metas) para un perfil de pasajero; al terminar se le muestra un mapa de referencia hecho por expertos para comparar |
| 3 | Laboratorio de casos "Semáforo de la pregunta" (tablero grupal) | Discusión y contraste en equipo | Ejercicio de clasificación individual: preguntas reales (texto/audio) que el asesor etiqueta verde/amarillo/rojo, con feedback inmediato y explicación |
| 3 | Cierre "Dibujo a ciegas" (pareja) | Alguien debía dar instrucciones ambiguas en vivo | Simulación de audio: el asesor escucha instrucciones ambiguas y elige entre varias imágenes cuál cree que le describieron; al revelar la respuesta correcta ve la brecha sin necesitar a otra persona |
| 4 | Debate en vivo | Discusión abierta del grupo | Pregunta de reflexión con respuesta escrita corta; luego se le muestra cómo respondió el resto de sus compañeros (async, no en vivo) para dar sensación de comunidad |
| 4 | "Adivina el personaje" | Un compañero respondía preguntas | Llamada simulada: el sistema hace de pasajero, el asesor elige preguntas de una lista, cada una revela una pista; al final identifica el tipo de pasajero y la mejor respuesta, calificado por precisión y n.º de preguntas usadas |
| 4 | Cierre con tarjetas y audios en grupo | Actividad compartida en mesas | Ejercicio de emparejar: escuchar un audio y seleccionar el perfil de pasajero correcto, con feedback inmediato |
| 5 | "El Formador Fantasma" (el formador desaparece del salón) | La incomodidad dependía de vivirla junto al grupo en tiempo real | El propio asesor entra en modo "pasajero en espera": silencios reales de 20–30s sin explicación dentro del módulo; luego se le pregunta cómo se sintió antes de revelar el paralelo con el pasajero — la incomodidad la vive él mismo |
| 5 | "La Noticia Ininterrumpida" (leer en voz alta mientras te lanzan números) | Alguien más lanzaba los números | Mini-juego en pantalla: un texto avanza solo y el asesor debe seguir leyendo mientras aparecen números aleatorios que debe anotar sin detenerse — el sistema hace de "lanzador" |
| 6 | Rompehielos "Asociación Forzada" (señalar a alguien) | Necesitaba a otro respondiendo rápido | Contra-reloj individual: el sistema muestra una palabra, el asesor escribe la primera palabra relacionada en menos de 1 segundo, varias rondas, puntaje por velocidad |
| 6 | Cierre "Me voy de viaje y me llevo..." (cadena grupal) | Turnos entre varios participantes | Versión contra el sistema: la plataforma va revelando una lista creciente de objetos, el asesor repite toda la lista en orden antes de que se agregue el siguiente |
| 7 | Role-play de 30 segundos | Se decía en voz alta frente al grupo | Cronómetro en pantalla: se presenta el caso, el asesor escribe su respuesta en 30s, el sistema valida que incluya solución + frase de seguridad y da feedback |
| 7 | Preguntas situacionales/debate | Discusión grupal | Mismo patrón que Nivel 4: reflexión escrita individual + revelar después cómo respondieron otros asesores |

Los rompehielos, videos, recorderis y quizzes que ya eran de consumo individual (Nivel 2 completo, el test de Nivel 6) pasan directo sin rediseño.

### Implicación para la arquitectura
La plataforma necesita, además de lo ya propuesto:
- **Motor de actividades interactivas**, no solo reproductor de video: clasificación con feedback, emparejar audio-perfil, cronómetros/mini-juegos, formularios tipo mapa de empatía, escenarios de opción múltiple con ramificación simple.
- **"Comparar con el grupo" asíncrono**: mostrar cómo respondió el resto después de que el asesor ya contestó (reemplaza el efecto del debate en vivo sin requerir sincronía).
- **Reemplazo del test+portal actual**: quizzes nativos con resultados por agente y vista agregada para supervisores (ya existe como precedente funcional en Apps Script — migrar esa lógica, no reinventarla).
- **Assets multimedia versionados**: videos (hoy en Drive), audios de casos, imágenes de dinámicas, tarjetas didácticas.
- **Cohortes** se mantienen solo como agrupación para reportes (ej. "ingreso enero 2026", "equipo X en refuerzo Q1"), no como sesión en vivo con asistencia.

## Backlog de contenido futuro (post Modelo CREA)
No se descarta, pasa a Fase 3+ como ampliación de biblioteca de refuerzo una vez el motor esté validado con CREA: fundamentos del negocio aéreo (IATA/ICAO, tarifas, equipaje), sistemas/GDS/CRM, compliance (IROPS, protección de datos, PMR/menores no acompañados), y crisis operacionales. Se retoman del detalle de la v1 de esta propuesta si se necesitan.

## Diseño pedagógico
- **Microlearning**: cápsulas de 5–15 min, una por sesión
- **Formatos variados**: video corto, infografía, texto breve, simulación interactiva de caso
- **Quiz al cierre de cada cápsula** (3–5 preguntas, feedback inmediato)
- **Insignias/certificación** por módulo completado; certificado final de ruta
- **Rutas diferenciadas**: onboarding (secuencial, obligatorio) vs. refuerzo (biblioteca libre + asignaciones periódicas)

## Estrategias de enfoque
- **Gamificación**: puntos, insignias, tabla de posiciones por equipo/turno (opcional, sin generar presión negativa)
- **Aprendizaje basado en escenarios**: simulaciones de llamada/chat real con ramificaciones según la respuesta elegida
- **Comunidad**: canal de preguntas entre asesores + biblioteca de "mejores respuestas" curada por calidad

## Arquitectura técnica — LMS a medida

### Stack
- **Backend:** Python + FastAPI (reutiliza el mismo lenguaje que Indicadores Completos / Nps x Lea)
- **Base de datos:** Postgres (SQLite solo para desarrollo local)
- **Frontend:** React ligero (o Streamlit si se prioriza velocidad de MVP sobre pulido visual) para el portal de agente/facilitador/admin
- **Autenticación:** login con roles (`agente`, `formador`, `admin`); SSO corporativo si existe, si no usuario/contraseña + reseteo
- **Assets:** videos servidos desde almacenamiento propio o embebidos desde Drive (fase 1), imágenes/tarjetas descargables versionadas en repo
- **Tracking:** eventos de progreso en tablas propias, mismo criterio de auditoría que ya usan en sus otros pipelines

### Roles de la aplicación
1. **Portal Agente:** ve su ruta (onboarding u refuerzo), consume actividades asignadas a su ritmo, resuelve quizzes/ejercicios interactivos, ve su historial/insignias
2. **Panel Admin/Supervisor:** gestión de niveles/actividades/quizzes (CMS simple), gestión de cohortes y asignaciones, reportes de completitud y resultados agregados por equipo — reemplaza el portal actual en Apps Script

### Modelo de datos (núcleo)
- `usuarios` (id, nombre, rol, equipo/supervisor)
- `niveles` (id, número, nombre, principio, objetivo, competencia, estado: completo/gap)
- `actividades` (id, nivel_id, tipo: rompehielos/recorderis/video/interactiva/quiz/cierre, orden, contenido/asset_ref)
- `quizzes` + `preguntas` + `intentos` (usuario_id, quiz_id, respuestas, score, fecha)
- `cohortes` (id, tipo: onboarding/refuerzo, fecha_inicio) — solo agrupación para reportes
- `cohorte_usuarios` (cohorte_id, usuario_id)
- `progreso` (usuario_id, nivel_id, actividad_id, estado, timestamp)

### Camino de migración del portal actual
El Google Apps Script + Forms de resultados del Nivel 6 es el precedente funcional más cercano: se migra su lógica (registrar intento → calcular score → mostrar feedback al agente → vista agregada al supervisor) a `quizzes`/`intentos` en vez de rediseñar desde cero.

## Métricas de la plataforma
- % de completitud por módulo/ruta, por asesor y por equipo
- Tiempo promedio de cápsula vs. tiempo estimado
- Resultado de quizzes (aciertos, reintentos, preguntas más falladas → señal de brecha de conocimiento)
- Correlación opcional con indicadores operativos (AHT, NPS, adherencia) para medir impacto real del entrenamiento

## Roadmap por fases
1. **Fase 0 — Propuesta** *(esta)*: estructura, alcance, arquitectura y modalidad (100% async) cerrados
2. **Fase 1 — MVP para planta actual**: motor de niveles/actividades interactivas/quizzes funcionando con los niveles con contenido completable (2, 3, 4, 5, 6) ya rediseñados a versión individual; portal de agente; cohortes de refuerzo primero, onboarding usa el mismo motor en paralelo sin ser el foco
3. **Fase 2 — Cierre de gaps de contenido**: diseñar actividades del Nivel 1 (no tiene ninguna) y completar el desarrollo de "tipos de cierre" del Nivel 7 con el equipo de contenido; cargarlos al motor ya construido
4. **Fase 3 — Integración de métricas**: cruce con indicadores operativos (AHT, NPS, FCR) y con LEA si aplica; dashboard de impacto para supervisores; ampliación con backlog de contenido futuro
5. **Fase 4 — Escenarios avanzados**: simulaciones ramificadas, gamificación entre equipos, certificaciones formales
