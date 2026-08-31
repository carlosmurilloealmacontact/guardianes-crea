"""Carga los niveles del Modelo CREA (versión async) en la base de datos.

Fuente: elearning/PROPUESTA.md — tabla de niveles y de reemplazos de dinámicas.
Los niveles 1 y 7 quedan marcados como `gap`: el 1 no tiene actividades en el
documento original: el 7 tiene el desarrollo de "tipos de cierre" incompleto.
Ejecutar: python -m app.seed_crea
"""

from app.database import Base, SessionLocal, engine
from app.models import (
    Actividad,
    ActividadTipo,
    Intento,
    Nivel,
    NivelEstado,
    Pregunta,
    Progreso,
    Quiz,
)

EMOCIONES = [
    {"clave": "alegria", "label": "Alegría / Satisfacción", "emoji": "😄"},
    {"clave": "tristeza", "label": "Tristeza / Desánimo", "emoji": "😢"},
    {"clave": "enojo", "label": "Enojo / Frustración", "emoji": "😠"},
    {"clave": "miedo", "label": "Miedo / Inseguridad", "emoji": "😨"},
    {"clave": "sorpresa", "label": "Sorpresa", "emoji": "😲"},
    {"clave": "desagrado", "label": "Desagrado / Decepción", "emoji": "😒"},
]

TIPOS_PASAJERO = [
    {"clave": "analitico", "label": "Analítico", "emoji": "🧐"},
    {"clave": "practico", "label": "Práctico", "emoji": "⚡"},
    {"clave": "expresivo", "label": "Expresivo", "emoji": "🎉"},
    {"clave": "diplomatico", "label": "Diplomático", "emoji": "🤝"},
]

NIVELES = [
    {
        "numero": 1,
        "nombre": "Exploración clara — apertura de confianza",
        "principio": "P4: Confianza es la prioridad",
        "objetivo": (
            "Generar confianza desde el inicio mediante una apertura clara, segura y "
            "contextualizada que prepare el camino para una resolución efectiva."
        ),
        "competencia": "Uso correcto de las herramientas en pro del beneficio y la resolutividad",
        "estado": NivelEstado.completo,
        "actividades": [
            {
                "tipo": ActividadTipo.video,
                "titulo": "Bienvenida al Modelo CREA",
                "contenido": {
                    "descripcion": (
                        "Introducción al programa: qué es el Modelo CREA y por qué la "
                        "confianza es el primer principio de servicio."
                    )
                },
            },
            {
                "tipo": ActividadTipo.rompehielos,
                "titulo": "Encuentra el dato clave",
                "contenido": {
                    "descripcion": (
                        "Ejercicio de manejo de herramientas: ubicar rápido los datos "
                        "correctos en un registro de reserva simulado, sin errores."
                    ),
                    "tipo_interactivo": "buscar_dato",
                    "campos": [
                        {"clave": "reserva", "label": "N° de reserva", "valor": "QF8K2M"},
                        {"clave": "apellido", "label": "Apellido", "valor": "Restrepo Gómez"},
                        {"clave": "vuelo", "label": "Vuelo", "valor": "AV205"},
                        {"clave": "fecha", "label": "Fecha", "valor": "14 de septiembre"},
                        {"clave": "asiento", "label": "Asiento", "valor": "22C"},
                        {"clave": "equipaje", "label": "Equipaje", "valor": "1 pieza, 23kg"},
                    ],
                    "preguntas": [
                        {"clave": "reserva", "texto": "¿Cuál es el número de reserva?"},
                        {"clave": "asiento", "texto": "¿Cuál es el asiento asignado?"},
                        {"clave": "vuelo", "texto": "¿Cuál es el número de vuelo?"},
                    ],
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Arma la apertura perfecta",
                "contenido": {
                    "descripcion": (
                        "Construir, en el orden correcto, una apertura que transmita "
                        "confianza desde el primer segundo de la llamada."
                    ),
                    "tipo_interactivo": "ordenar_pasos",
                    "pasos": [
                        {
                            "clave": "saludo",
                            "texto": "Buenos días, gracias por comunicarse con nosotros.",
                        },
                        {
                            "clave": "identificacion",
                            "texto": "Mi nombre es Camila, seré quien le atienda hoy.",
                        },
                        {
                            "clave": "contextualizacion",
                            "texto": "Para ayudarle mejor, ¿me permite su número de reserva?",
                        },
                        {
                            "clave": "pregunta_apertura",
                            "texto": "Cuénteme, ¿en qué le puedo colaborar hoy?",
                        },
                    ],
                },
            },
            {
                "tipo": ActividadTipo.cierre,
                "titulo": "¿Qué genera confianza al iniciar?",
                "contenido": {
                    "descripcion": (
                        "Clasificar frases de apertura entre las que generan confianza y "
                        "las que la debilitan."
                    ),
                    "tipo_interactivo": "clasificador",
                    "opciones": [
                        {"clave": "genera", "label": "Genera confianza", "emoji": "✅"},
                        {"clave": "debilita", "label": "Debilita la confianza", "emoji": "⚠️"},
                    ],
                    "items": [
                        {
                            "texto": "Mi nombre es Andrés, con gusto le ayudo a resolver esto.",
                            "correcta": "genera",
                            "explicacion": "Identificación clara y disposición genuina a ayudar.",
                        },
                        {
                            "texto": "Eh... a ver, espéreme un momento, no sé bien qué pasó ahí.",
                            "correcta": "debilita",
                            "explicacion": "Duda audible y falta de control de la situación.",
                        },
                        {
                            "texto": "Permítame confirmar sus datos para darle una atención precisa.",
                            "correcta": "genera",
                            "explicacion": "Contextualiza el paso siguiente y transmite orden.",
                        },
                        {
                            "texto": "No sé si le puedo ayudar con eso, mejor pregúntele a otro.",
                            "correcta": "debilita",
                            "explicacion": "Transfiere la responsabilidad sin ofrecer solución.",
                        },
                    ],
                },
            },
        ],
    },
    {
        "numero": 2,
        "nombre": "Empatía y validación emocional",
        "principio": None,
        "objetivo": "Reconocer la emoción predominante del pasajero para adaptar la respuesta.",
        "competencia": "Identificación de emociones en texto y audio",
        "estado": NivelEstado.completo,
        "actividades": [
            {
                "tipo": ActividadTipo.video,
                "titulo": "Empatía y validación emocional",
                "contenido": {"video_url": "https://www.youtube.com/watch?v=UV_MGEVbEWU"},
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Identificar emociones en frases de pasajeros",
                "contenido": {
                    "descripcion": (
                        "El agente observa imágenes con distintas expresiones emocionales "
                        "y registra a qué emoción corresponde cada una."
                    ),
                    "tipo_interactivo": "clasificador",
                    "opciones": EMOCIONES,
                    "items": [
                        {
                            "texto": (
                                "Muchas gracias por la ayuda, la verdad me quedo mucho más "
                                "tranquilo con la solución que me dieron."
                            ),
                            "correcta": "alegria",
                            "explicacion": "Agradecimiento y tranquilidad tras resolver el caso.",
                        },
                        {
                            "texto": (
                                "La verdad esta situación me tiene bastante preocupado porque "
                                "era un viaje muy importante para mí."
                            ),
                            "correcta": "tristeza",
                            "explicacion": "Preocupación por perder algo que le importaba mucho.",
                        },
                        {
                            "texto": (
                                "La verdad estoy bastante molesto porque ya he llamado varias "
                                "veces y todavía no me dan una solución clara."
                            ),
                            "correcta": "enojo",
                            "explicacion": "Frustración acumulada por falta de resolución.",
                        },
                    ],
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Identificar emoción en audios de pasajeros",
                "contenido": {
                    "descripcion": (
                        "El agente escucha/lee audios de interacciones reales y relaciona la "
                        "emoción predominante con la expresión facial correspondiente."
                    ),
                    "tipo_interactivo": "clasificador",
                    "opciones": EMOCIONES,
                    "items": [
                        {
                            "texto": (
                                "Me preocupa mucho no poder viajar porque tengo compromisos "
                                "importantes y no sé qué va a pasar."
                            ),
                            "correcta": "miedo",
                            "explicacion": "Incertidumbre sobre compromisos que dependen del viaje.",
                        },
                        {
                            "texto": (
                                "La verdad me sorprende mucho lo que me están diciendo porque "
                                "yo no tenía ninguna notificación de ese cambio."
                            ),
                            "correcta": "sorpresa",
                            "explicacion": "No esperaba el cambio, se enteró en el momento.",
                        },
                        {
                            "texto": (
                                "La verdad esta solución no me deja muy conforme porque "
                                "esperaba algo diferente."
                            ),
                            "correcta": "desagrado",
                            "explicacion": "La propuesta no cumplió su expectativa.",
                        },
                    ],
                },
            },
            {
                "tipo": ActividadTipo.cierre,
                "titulo": "Dato LEA: MACA",
                "contenido": {"descripcion": "Cierre del nivel con referencia a datos de LEA."},
            },
        ],
    },
    {
        "numero": 3,
        "nombre": "Exploración clara — indagación y escucha activa",
        "principio": "P4: Anticipar evita fricción",
        "objetivo": "Entrenar la habilidad de realizar preguntas focalizadas según el contexto.",
        "competencia": "Indagación y análisis",
        "estado": NivelEstado.completo,
        "actividades": [
            {
                "tipo": ActividadTipo.rompehielos,
                "titulo": "Activación cognitiva (Stroop digital)",
                "contenido": {
                    "descripcion": (
                        "Reemplaza Pulgar-Meñique / Colores y palabras: ejercicio de "
                        "coordinación con temporizador, tocar el color de la tinta y no "
                        "la palabra."
                    ),
                    "tipo_interactivo": "stroop",
                    "rondas": 8,
                },
            },
            {
                "tipo": ActividadTipo.recorderis,
                "titulo": "Recap del nivel anterior",
                "contenido": {"descripcion": "Retroalimentación breve sobre el Nivel 2."},
            },
            {
                "tipo": ActividadTipo.video,
                "titulo": "Escucha activa y formulación de preguntas",
                "contenido": {"descripcion": "Video de introducción del nivel."},
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Mapa de empatía del pasajero",
                "contenido": {
                    "descripcion": (
                        "Reemplaza el taller en mesas de 3: el agente llena solo las 6 "
                        "casillas del mapa de empatía para un perfil de pasajero y compara "
                        "su resultado contra un mapa de referencia."
                    ),
                    "tipo_interactivo": "mapa_empatia",
                    "perfil": (
                        "Pasajero con conexión ajustada (40 minutos), tono apurado, pregunta "
                        "reiteradamente cuánto falta y si va a alcanzar el siguiente vuelo."
                    ),
                    "referencia": {
                        "piensa_siente": "Cree que va a perder la conexión, siente ansiedad.",
                        "ve": "La fila de migración avanzando lento y su reloj.",
                        "oye": "Anuncios de abordaje de otros vuelos, no del suyo.",
                        "dice_hace": "Repite la pregunta y revisa constantemente la hora.",
                        "esfuerzos": "Miedo a quedar varado y perder el resto del itinerario.",
                        "resultados": "Que alguien le confirme un plan claro y lo tranquilice.",
                    },
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Semáforo de la pregunta",
                "contenido": {
                    "descripcion": (
                        "Reemplaza el laboratorio de casos grupal: clasificar preguntas "
                        "reales como verde/amarillo/rojo con feedback inmediato."
                    ),
                    "tipo_interactivo": "semaforo",
                    "preguntas": [
                        {
                            "texto": "¿Cuál es su número de reserva?",
                            "correcta": "verde",
                            "explicacion": "Concreta y necesaria para avanzar de inmediato.",
                        },
                        {
                            "texto": (
                                "¿Me confirma el apellido completo tal como aparece "
                                "en el pasaporte?"
                            ),
                            "correcta": "verde",
                            "explicacion": "Precisa, evita errores de identificación.",
                        },
                        {
                            "texto": "¿Usted qué opina de la aerolínea en general?",
                            "correcta": "rojo",
                            "explicacion": "No aporta a resolver el caso, alarga la llamada.",
                        },
                        {
                            "texto": (
                                "¿Prefiere que lo reubique en el vuelo de las 3pm o "
                                "en el de las 6pm?"
                            ),
                            "correcta": "verde",
                            "explicacion": "Cerrada, orientada a decisión inmediata.",
                        },
                        {
                            "texto": "¿Me podría contar un poco más sobre su viaje?",
                            "correcta": "amarillo",
                            "explicacion": "Válida pero ambigua — se puede enfocar mejor.",
                        },
                        {
                            "texto": "¿Cómo está el clima por allá?",
                            "correcta": "rojo",
                            "explicacion": "Charla informal sin valor para la resolución.",
                        },
                    ],
                },
            },
            {
                "tipo": ActividadTipo.cierre,
                "titulo": "Instrucciones ambiguas (simulación de audio)",
                "contenido": {
                    "descripcion": (
                        "Reemplaza el Dibujo a Ciegas: el agente escucha instrucciones "
                        "ambiguas y elige entre imágenes cuál cree que le describieron."
                    ),
                    "tipo_interactivo": "dibujo_ciegas",
                    "instrucciones": (
                        "\"Dibuja un círculo grande en el centro. Ahora pon dos triángulos "
                        "en la parte superior. Haz una línea curva en el medio. Dibuja "
                        "varias líneas rectas saliendo de los lados.\""
                    ),
                    "opciones": [
                        {"clave": "sol", "label": "Un sol", "emoji": "☀️"},
                        {"clave": "gato", "label": "Un gato", "emoji": "🐱"},
                        {"clave": "estrella", "label": "Una estrella", "emoji": "⭐"},
                        {"clave": "flor", "label": "Una flor", "emoji": "🌼"},
                    ],
                    "intencion_real": "sol",
                    "mensaje_cierre": (
                        "La instrucción original pretendía describir un sol, pero sin poder "
                        "preguntar, cada quien imagina algo distinto — un pasajero con "
                        "información ambigua hace exactamente lo mismo. Por eso las preguntas "
                        "abiertas evitan que le entreguemos al pasajero un gato cuando quería "
                        "un sol."
                    ),
                },
            },
        ],
    },
    {
        "numero": 4,
        "nombre": "Lectura de momento — tipos de pasajero",
        "principio": None,
        "objetivo": "Adaptar el mensaje según el estilo comportamental del pasajero.",
        "competencia": "Eficiencia con humanidad",
        "estado": NivelEstado.completo,
        "actividades": [
            {
                "tipo": ActividadTipo.recorderis,
                "titulo": "Recap del Nivel 3",
                "contenido": {"descripcion": "Retroalimentación breve sobre indagación."},
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "¿Cada pasajero necesita algo diferente?",
                "contenido": {
                    "descripcion": (
                        "Reemplaza el debate en vivo: reflexión escrita individual, luego "
                        "se muestra cómo respondieron otros asesores."
                    )
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Tipos de pasajero: analítico, práctico, expresivo, diplomático",
                "contenido": {
                    "descripcion": "Ejemplos en audio/texto por estilo comportamental.",
                    "tipo_interactivo": "clasificador",
                    "opciones": TIPOS_PASAJERO,
                    "items": [
                        {
                            "texto": "Quiero detalles y comparar opciones antes de decidir.",
                            "correcta": "analitico",
                            "explicacion": "Busca datos concretos para comparar antes de elegir.",
                        },
                        {
                            "texto": "Necesito una solución pronto, no tengo tiempo que perder.",
                            "correcta": "practico",
                            "explicacion": "Prioriza velocidad sobre detalle.",
                        },
                        {
                            "texto": "¡Estoy súper feliz porque tendré mi primer vuelo!",
                            "correcta": "expresivo",
                            "explicacion": "Comunica con emoción y quiere compartir la experiencia.",
                        },
                        {
                            "texto": "Según su experiencia, ¿qué tarifa me recomienda?",
                            "correcta": "diplomatico",
                            "explicacion": "Confía en el criterio del asesor para decidir.",
                        },
                    ],
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Llamada simulada: identifica al pasajero",
                "contenido": {
                    "descripcion": (
                        "Reemplaza Adivina el personaje: el sistema hace de pasajero, el "
                        "agente elige preguntas de una lista y debe identificar el tipo de "
                        "pasajero con el menor número de preguntas posible."
                    ),
                    "tipo_interactivo": "llamada_simulada",
                    "introduccion": (
                        "“¡No va a creer lo que me pasó! Fue toda una aventura, "
                        "casi pierdo el vuelo por el tráfico pero al final todo salió "
                        "increíble, se lo tengo que contar completo!”"
                    ),
                    "preguntas": [
                        {
                            "texto": "¿Podría contarme qué pasó con más detalle?",
                            "respuesta": (
                                "“¡Uy sí! Resulta que salí tardísimo de la casa, el taxi "
                                "no llegaba, ¡fue una película! Pero bueno, aquí estoy contándoselo.”"
                            ),
                        },
                        {
                            "texto": "¿Cuáles son las opciones disponibles y sus diferencias?",
                            "respuesta": (
                                "“Ay no sé, la verdad no me fijé en detalles, solo quiero "
                                "que usted me diga qué es lo mejor, ¡confío en usted!”"
                            ),
                        },
                        {
                            "texto": "¿Cuál es la forma más rápida de resolver esto?",
                            "respuesta": (
                                "“La verdad no tengo afán, ¡ya lo peor ya pasó! Cuénteme "
                                "usted con calma qué podemos hacer.”"
                            ),
                        },
                    ],
                    "opciones_tipo": ["analitico", "practico", "expresivo", "diplomatico"],
                    "tipo_correcto": "expresivo",
                },
            },
            {
                "tipo": ActividadTipo.cierre,
                "titulo": "Emparejar audio con perfil de pasajero",
                "contenido": {
                    "descripcion": "Reemplaza el cierre grupal con tarjetas.",
                    "tipo_interactivo": "clasificador",
                    "opciones": TIPOS_PASAJERO,
                    "items": [
                        {
                            "texto": (
                                "Envíeme por favor el desglose exacto de tarifas, impuestos "
                                "y penalidades antes de decidir."
                            ),
                            "correcta": "analitico",
                            "explicacion": "Pide desglose exacto para comparar con datos.",
                        },
                        {
                            "texto": "Lo que sea más rápido, dígame ya cuál es la opción.",
                            "correcta": "practico",
                            "explicacion": "Prioriza cerrar rápido sin más vueltas.",
                        },
                        {
                            "texto": (
                                "¡No puedo creer que esto me esté pasando justo antes de "
                                "mis vacaciones soñadas!"
                            ),
                            "correcta": "expresivo",
                            "explicacion": "Reacción emocional intensa ante la situación.",
                        },
                        {
                            "texto": "Usted que ha visto muchos casos, ¿qué haría en mi lugar?",
                            "correcta": "diplomatico",
                            "explicacion": "Delega la decisión en el criterio del asesor.",
                        },
                    ],
                },
            },
        ],
    },
    {
        "numero": 5,
        "nombre": "Manejo de silencios y espera — impacto en NPS",
        "principio": None,
        "objetivo": "Evitar el efecto de abandono/silencio que percibe el pasajero en espera.",
        "competencia": "Concentración dividida y comunicación continua",
        "estado": NivelEstado.completo,
        "actividades": [
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Modo pasajero en espera",
                "contenido": {
                    "descripcion": (
                        "Reemplaza El Formador Fantasma: el propio agente vive silencios "
                        "reales de 20-30s sin explicación dentro del módulo y luego "
                        "reflexiona antes de ver el paralelo con el pasajero."
                    ),
                    "tipo_interactivo": "espera",
                    "segundos": 15,
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Lectura con interrupciones",
                "contenido": {
                    "descripcion": (
                        "Reemplaza La Noticia Ininterrumpida: un texto avanza solo mientras "
                        "aparecen números aleatorios que el agente debe anotar sin dejar "
                        "de leer."
                    ),
                    "tipo_interactivo": "lectura_interrupciones",
                    "texto": (
                        "Le informamos que su vuelo ha sido reprogramado y el nuevo horario "
                        "de salida es a las nueve con cuarenta y cinco de la noche por lo "
                        "cual le pedimos estar en la sala de embarque con anticipación para "
                        "no tener inconvenientes con el proceso de abordaje"
                    ),
                    "duracion_palabra_ms": 260,
                    "vida_numero_ms": 1800,
                },
            },
        ],
    },
    {
        "numero": 6,
        "nombre": "Resolución clara — alternativas y decisión",
        "principio": "P2: Resolver bien genera experiencias",
        "objetivo": (
            "Asegurar una resolución estructurada, clara y recomendada que facilite la "
            "decisión del pasajero y maximice la resolución en el primer contacto."
        ),
        "competencia": "Impulsar decisiones centradas en el cliente con alternativas claras",
        "estado": NivelEstado.completo,
        "actividades": [
            {
                "tipo": ActividadTipo.rompehielos,
                "titulo": "Asociación forzada contra-reloj",
                "contenido": {
                    "descripcion": (
                        "El sistema muestra una palabra, el agente escribe la primera "
                        "palabra relacionada en menos de 1 segundo, varias rondas."
                    ),
                    "tipo_interactivo": "asociacion",
                    "palabras": ["Avión", "Maleta", "Pasaporte", "Retraso", "Boarding", "Turbulencia"],
                    "limite_ms": 2000,
                },
            },
            {
                "tipo": ActividadTipo.recorderis,
                "titulo": "Recap del Nivel 5",
                "contenido": {"descripcion": "Retroalimentación breve sobre manejo de silencios."},
            },
            {
                "tipo": ActividadTipo.video,
                "titulo": "Situación de indecisión sin orientación",
                "contenido": {"descripcion": "Video de introducción del nivel."},
            },
            {
                "tipo": ActividadTipo.quiz,
                "titulo": "Test de resolución efectiva",
                "contenido": {
                    "descripcion": (
                        "Migra el test de Google Forms del documento original a quiz "
                        "nativo con feedback inmediato."
                    )
                },
            },
            {
                "tipo": ActividadTipo.video,
                "titulo": "Video comparativo: interacción incorrecta vs. correcta",
                "contenido": {"descripcion": "Refuerza el Principio 2."},
            },
            {
                "tipo": ActividadTipo.cierre,
                "titulo": "Cadena de memoria: 'Me voy de viaje y me llevo...'",
                "contenido": {
                    "descripcion": (
                        "Versión contra el sistema: la plataforma revela una lista "
                        "creciente de objetos que el agente debe repetir en orden."
                    ),
                    "tipo_interactivo": "memoria_cadena",
                    "items": [
                        "pasaporte",
                        "cepillo de dientes",
                        "cargador",
                        "gafas de sol",
                        "cámara",
                        "snacks",
                        "audífonos",
                        "libro",
                    ],
                },
            },
        ],
    },
    {
        "numero": 7,
        "nombre": "Anticipación y cierre",
        "principio": None,
        "objetivo": "Cerrar la interacción de forma que el pasajero sienta que fue comprendido.",
        "competencia": "Cierre que no se sienta automático ni de bot",
        "estado": NivelEstado.completo,
        "actividades": [
            {
                "tipo": ActividadTipo.rompehielos,
                "titulo": "La mejor alternativa (cronómetro 30s)",
                "contenido": {
                    "descripcion": (
                        "El agente escribe su respuesta en 30 segundos ante un caso "
                        "(vuelo cancelado, equipaje retrasado, etc.); debe incluir "
                        "solución y frase de seguridad."
                    ),
                    "tipo_interactivo": "respuesta_cronometrada",
                    "caso": (
                        "Un pasajero le informa que su vuelo fue cancelado y tiene una boda "
                        "familiar en 5 horas. ¿Qué le responde?"
                    ),
                    "segundos": 30,
                    "palabras_clave_solucion": [
                        "reubic",
                        "otro vuelo",
                        "alternativa",
                        "opcion",
                        "opción",
                        "cambio",
                        "conex",
                    ],
                    "palabras_clave_seguridad": [
                        "tranquil",
                        "confirm",
                        "garantiz",
                        "acompañ",
                        "aseguro",
                        "estar pendiente",
                        "no se preocupe",
                    ],
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Preguntas situacionales de empatía",
                "contenido": {
                    "descripcion": "Reflexión escrita individual, luego comparar con el grupo."
                },
            },
            {
                "tipo": ActividadTipo.interactiva,
                "titulo": "Tipos de cierre: Anticipación / Automático / Básico",
                "contenido": {
                    "descripcion": (
                        "Clasifica cada frase de cierre según el tipo que representa."
                    ),
                    "tipo_interactivo": "clasificador",
                    "opciones": [
                        {"clave": "anticipacion", "label": "Anticipación", "emoji": "🔭"},
                        {"clave": "automatico", "label": "Automático", "emoji": "🤖"},
                        {"clave": "basico", "label": "Básico", "emoji": "➖"},
                    ],
                    "items": [
                        {
                            "texto": (
                                "Antes de despedirme, le confirmo que recibirá un correo con "
                                "todos los detalles, y si algo cambia, aquí estaremos."
                            ),
                            "correcta": "anticipacion",
                            "explicacion": (
                                "Da un parte de tranquilidad sin asumir que todo ya está "
                                "resuelto — anticiparse no es lo mismo que asumir."
                            ),
                        },
                        {
                            "texto": "Listo, quedó solucionado. Que tenga buen día.",
                            "correcta": "automatico",
                            "explicacion": (
                                "Da la gestión por finalizada sin confirmar que el pasajero "
                                "se sienta realmente tranquilo — un cierre así no te "
                                "diferencia de un bot."
                            ),
                        },
                        {
                            "texto": "Ya está, eso es todo.",
                            "correcta": "basico",
                            "explicacion": (
                                "Cumple el mínimo, pero no refuerza la solución ni genera "
                                "cercanía con el pasajero."
                            ),
                        },
                        {
                            "texto": (
                                "Quedo pendiente de su viaje, cualquier novedad me puede "
                                "escribir directamente a esta misma línea."
                            ),
                            "correcta": "anticipacion",
                            "explicacion": "Deja una puerta abierta concreta, no solo una frase de cortesía.",
                        },
                        {
                            "texto": "Perfecto, cualquier cosa vuelve a llamar.",
                            "correcta": "basico",
                            "explicacion": "Cortesía genérica sin compromiso concreto de seguimiento.",
                        },
                    ],
                },
            },
            {
                "tipo": ActividadTipo.cierre,
                "titulo": "Escribe tu propio cierre de anticipación",
                "contenido": {
                    "descripcion": (
                        "Cierre del nivel y del programa: redactar un cierre real que "
                        "aplique lo aprendido en los 7 niveles."
                    ),
                    "tipo_interactivo": "respuesta_cronometrada",
                    "caso": (
                        "Acabas de reubicar a un pasajero en un nuevo vuelo tras una "
                        "cancelación. ¿Cómo cierras la llamada?"
                    ),
                    "segundos": 40,
                    "palabras_clave_solucion": ["reubic", "nuevo vuelo", "confirm", "correo", "detalle"],
                    "palabras_clave_seguridad": [
                        "pendiente",
                        "seguimiento",
                        "cualquier cosa",
                        "aquí estaremos",
                        "no dude",
                        "contact",
                    ],
                },
            },
        ],
    },
]


def seed() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        db.query(Intento).delete()
        db.query(Progreso).delete()
        db.query(Pregunta).delete()
        db.query(Quiz).delete()
        db.query(Actividad).delete()
        db.query(Nivel).delete()
        db.commit()

        for nivel_data in NIVELES:
            nivel = Nivel(
                numero=nivel_data["numero"],
                nombre=nivel_data["nombre"],
                principio=nivel_data["principio"],
                objetivo=nivel_data["objetivo"],
                competencia=nivel_data["competencia"],
                estado=nivel_data["estado"],
            )
            db.add(nivel)
            db.flush()

            for orden, actividad_data in enumerate(nivel_data["actividades"], start=1):
                actividad = Actividad(
                    nivel_id=nivel.id,
                    tipo=actividad_data["tipo"],
                    orden=orden,
                    titulo=actividad_data["titulo"],
                    contenido=actividad_data["contenido"],
                )
                db.add(actividad)
                db.flush()

                if actividad.tipo == ActividadTipo.quiz:
                    quiz = Quiz(actividad_id=actividad.id)
                    db.add(quiz)
                    db.flush()
                    db.add(
                        Pregunta(
                            quiz_id=quiz.id,
                            orden=1,
                            enunciado="[Pendiente: cargar preguntas reales del test original]",
                            opciones={"a": "Pendiente", "b": "Pendiente"},
                            respuesta_correcta="a",
                        )
                    )

        db.commit()
        print(f"Sembrados {len(NIVELES)} niveles del Modelo CREA (async).")
    finally:
        db.close()


if __name__ == "__main__":
    seed()
