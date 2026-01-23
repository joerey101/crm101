# Domain Glossary — CRM B2C Retail

**Proyecto:** CRM B2C Retail  
**Versión:** 1.0  
**Fecha:** 2026-01-22  
**Estado:** Activo

Este documento define el significado preciso de los términos de negocio y técnicos usados en el sistema.  
Debe ser considerado fuente de verdad semántica para implementación, reporting y comunicación interna.

---

## Lead
Registro que representa a una persona o empresa que mostró interés en los productos del negocio.

Incluye:
- Datos de contacto
- Origen
- Estado en el pipeline
- Historial de interacciones

---

## Prospecto
Sinónimo funcional de Lead en este sistema.  
En v1.0 no se diferencia entidad Prospecto separada.

---

## Lead Strength
Clasificación automática de la calidad del lead según datos de contacto disponibles.

Valores:
- **BOTH:** Tiene teléfono y email
- **PHONE_ONLY:** Solo teléfono
- **EMAIL_ONLY:** Solo email

Uso:
- Segmentación
- Reporting
- Reglas futuras de automatización

---

## Origen (Source)
Canal por el cual ingresó el lead.

Ejemplos:
- WhatsApp
- Instagram
- Web
- Google Ads
- Redes Sociales
- Referido

---

## Inbox de Leads
Pantalla principal donde se listan y priorizan los leads entrantes.

Funciones:
- Filtros
- Asignación
- Acciones rápidas
- Priorización por SLA

---

## Owner
Usuario responsable del seguimiento del lead.

Reglas:
- Puede ser NULL (sin asignar)
- Solo Admin y Manager pueden modificarlo

---

## Supervisor / Manager
Rol responsable de:
- Revisar leads entrantes
- Asignar leads a vendedores
- Supervisar performance del equipo

---

## Seller / Vendedor
Rol responsable de:
- Contactar leads asignados
- Registrar actividades
- Gestionar tareas asociadas a sus leads

---

## Pipeline
Representación visual y lógica de las etapas del proceso comercial.

Define:
- Progreso del lead
- Estado comercial

---

## Stage (Etapa)
Una fase específica dentro del pipeline.

Ejemplos:
- Nuevo
- Asignado
- Contactado
- Calificado
- Cotización
- Seguimiento
- Cerrado - Conversión
- Cerrado - No conversión

---

## SLA (Service Level Agreement)
Tiempo máximo permitido para realizar el primer contacto con un lead.

En este sistema:
- SLA = 24 horas desde creación del lead

Estados:
- OK
- En riesgo
- Vencido

---

## Primer Contacto
Primera actividad registrada de tipo:
- Llamada
- WhatsApp
- Email

Marca:
- first_contact_at
- Cumplimiento de SLA

---

## Actividad (Activity)
Registro de una interacción con el lead.

Tipos:
- Llamada
- WhatsApp
- Email
- Reunión
- Nota

---

## Tarea (Task)
Acción pendiente asociada a un lead.

Ejemplos:
- Volver a llamar
- Enviar cotización
- Seguimiento

---

## Cierre de Lead
Momento en que el lead pasa a una etapa cerrada.

Tipos:
- Conversión
- No conversión

---

## Motivo de Cierre (Close Reason)
Razón por la cual un lead fue cerrado como no conversión.

Ejemplos:
- No respondió
- Precio
- No era lo que buscaba
- Zona / logística
- Stock / disponibilidad
- Competencia
- Duplicado / Spam
- Otro

---

## Lead Efectivo
Lead que posee datos suficientes para ser trabajado comercialmente o para retargeting.

Clasificación interna:
- BOTH = Lead más sólido
- PHONE_ONLY = Útil para retargeting y contacto
- EMAIL_ONLY = Útil para email marketing / nurturing

---

## Retargeting
Uso de datos de contacto (principalmente teléfono/email) para campañas futuras.

No implica conversión comercial.

---

## Asignación
Proceso mediante el cual un Supervisor o Admin asigna un lead a un Seller o a sí mismo.

---

## Audit Log
Registro inmutable de acciones críticas realizadas en el sistema.

Incluye:
- Quién hizo el cambio
- Qué cambió
- Cuándo cambió

---

## Multi-marca (Multi-tenant)
Capacidad del sistema para soportar múltiples negocios o marcas en una misma plataforma, con separación lógica de datos.

---

## Brand
Entidad que representa un negocio/marca dentro del sistema.

Todos los datos operan bajo un `brand_id`.

---

## Campos Custom (Custom Fields)
Campos definidos por Admin sin necesidad de cambios de código.

Usados para:
- Adaptar el CRM a distintos negocios
- Capturar información específica

---

## CSV Import
Proceso de carga masiva de leads desde archivo CSV.

Incluye:
- Mapeo de columnas
- Validación
- Previsualización
- Inserción en batch

---

## Dedupe
Proceso de detección de registros duplicados.

En v1.0:
- Solo warning
- No bloquea importación

---

## Service Layer
Capa lógica donde viven todas las reglas de negocio.

Ejemplos:
- SLA
- Validaciones por etapa
- Asignación
- Lead strength

---

## Implementation Plan
Artefacto generado por Antigravity que detalla:
- Archivos a modificar
- Cambios de schema
- Pasos de implementación
- Verificación

---

## Artifact
Resultado verificable generado por Antigravity.

Ejemplos:
- Implementation Plan
- Screenshots
- Walkthroughs
- Logs de ejecución

---

## SLA Compliance
Métrica que indica el porcentaje de leads contactados dentro del SLA.

---

## Unassigned Lead
Lead que aún no tiene owner asignado.

Responsabilidad inicial:
- Supervisor / Manager

---

## Calificado
Estado del lead donde ya se obtuvo información suficiente para avanzar comercialmente (incluye datos fiscales y dirección).

---

