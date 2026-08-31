# Matriz de implementación — CREA 2.0 E-learning

Fuente funcional principal: `CREA_2.0_Ruta_Elearning.docx`, guía vigente entregada para la implementación de CREA 2.0. `PROPUESTA.md` y las actividades existentes sirven como complemento cuando no contradicen la guía.

## Decisiones de implementación

- El recorrido tendrá siete módulos formativos y un eje transversal entre los módulos 2 y 3.
- Cada unidad mostrará objetivo, duración estimada y momento (`pre_sala`, `post_sala` o `refuerzo`).
- El e-learning prepara y sostiene la formación presencial; no certifica por sí solo los módulos que requieren observación humana.
- Los quizzes tendrán criterio de aprobación de 80%. Un intento inferior registra resultado, pero no libera la unidad.
- Las actividades interactivas actuales se conservan cuando entrenan el objetivo de la guía; se reubican como refuerzo o extensión cuando no son el núcleo del módulo.

## Matriz módulo por módulo

| Unidad canónica | Objetivo de aprendizaje | Contenido/actividad exigida por la guía | Estado actual | Implementación prevista |
|---|---|---|---|---|
| 1. Apertura que genera confianza | Reconocer saludo cálido, nombre propio y validación breve; entender el impacto de los primeros 30 segundos. | Video de contraste cálido/rígido; escenario “elige la mejor apertura”; quiz 80%. | Parcial: existen video placeholder, ordenamiento de apertura y clasificador. | Añadir escenario de tres opciones con feedback y quiz alineado; conservar ordenamiento como práctica adicional. |
| 2. Empatía y validación emocional | Distinguir empatía genérica/específica y aplicar parafrasear, nombrar emoción y validar. | Escenario ramificado de validación; quiz 80%. | Parcial: clasificador de emociones y video; falta ramificación y validación específica. | Añadir escenario ramificado y preguntas del documento; conservar clasificador como activación. |
| Eje transversal. Sensibilidad intercultural | Reconocer diferencias de alto/bajo contexto y adaptar expectativas de pasajeros internacionales. | Tarjetas informativas + quiz breve; entre módulos 2 y 3. | Ausente. | Crear unidad transversal, visible en la ruta y con evaluación independiente. |
| 3. Exploración clara | Aplicar “una sola verdad” y confirmar datos existentes antes de volver a preguntar. | Arrastrar/ubicar preguntas en árbol de Equipaje, Devoluciones y Cambios/Cancelaciones; quiz 80%. | Parcial: buscar dato, semáforo y mapa de empatía entrenan indagación, pero no el árbol. | Crear actividad de clasificación por motivo; conservar semáforo y mapa como extensiones. |
| 4. Lectura del momento | Identificar señales verbales de escalada y clasificar intensidad baja/media/alta. | Clasificación de cuatro fragmentos con feedback inmediato; quiz 80%. | Parcial: tipos de pasajero y llamada simulada; falta intensidad emocional. | Añadir clasificador de intensidad; conservar tipos de pasajero como adaptación complementaria. |
| 5. Protocolo RND | Ordenar cinco pasos, detectar omisiones, evitar usar “políticas” como única explicación. | Escenario ramificado de equipaje dañado; quiz 80%; refuerzo 7/15/30 días. | Ausente como módulo explícito. | Crear contenido, escenario ramificado, quiz y modelo de asignación de refuerzos. |
| 6. Resolución clara | Transformar lenguaje ambiguo en una solución clara, específica y verificable. | Ejercicio de reescritura + banco de ejemplos; quiz 80%. | Parcial: quiz de resolución, asociación forzada y respuesta cronometrada. | Añadir reescritura con comparación; conservar respuesta cronometrada como práctica. |
| 7. Anticipación y cierre | Usar pregunta anti-Silent Churn y Resumen de Caso en el momento adecuado. | Video + quiz de aplicación; post-sala. | Parcial: cronómetro, tipos de cierre y cierre escrito; falta anti-Silent Churn/Resumen de Caso. | Incorporar video/quiz y conservar tipos de cierre como práctica de aplicación. |

## Cambios de datos requeridos

- Añadir metadatos de unidad: `codigo`, `duracion_minutos`, `momento`, `es_transversal`, `requiere_certificacion_presencial` y `descripcion_conexion_sala`.
- Añadir el eje transversal como unidad ordenable entre 2 y 3. La interfaz no debe depender de que el número sea entero.
- Añadir `aprobacion_minima` al quiz, con valor por defecto `80`.
- Diferenciar `completado` de `aprobado` en resultados de quiz; los intentos fallidos no deben marcar automáticamente la actividad como completada.
- Modelar refuerzos del Protocolo RND con fecha objetivo y estado por usuario.

## Quizzes prioritarios

1. Apertura: identificar la apertura que contiene los tres elementos.
2. Empatía: identificar validación específica frente a genérica.
3. Exploración: continuar desde el dato ya registrado.
4. Lectura del momento: clasificar una frase de escalada alta.
5. RND: ordenar alternativa real y compromiso verificable.
6. Resolución: elegir una solución específica, verificable y con plazo.
7. Anticipación y cierre: identificar cuándo usar anti-Silent Churn.

## Criterios de aceptación

- La ruta visual refleja las unidades canónicas y el eje transversal.
- Cada unidad muestra objetivo, duración y relación con la sala.
- Un quiz con menos de 80% permite reintento y no libera la actividad.
- El Protocolo RND puede generar refuerzos a 7, 15 y 30 días.
- Las actividades actuales que complementan la guía siguen accesibles.
- El seed es repetible sin crear duplicados y no se ejecuta accidentalmente contra producción.
