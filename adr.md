# Architecture Decision Records (ADR) — CRM B2C Retail

**Proyecto:** CRM B2C Retail  
**Versión:** 1.0  
**Fecha:** 2026-01-22  
**Estado:** Activo

Este documento registra las decisiones arquitectónicas y de producto que deben ser respetadas durante la implementación y evolución del sistema.

---

## ADR-001 — Uso de Next.js App Router

**Estado:** Aceptado

### Decisión
El sistema se implementará utilizando Next.js con App Router.

### Contexto
Se requiere:
- SSR y Server Components
- Integración nativa con API Routes / Server Actions
- Escalabilidad
- Buen soporte con herramientas agent-first

### Consecuencias
- Todas las rutas se estructuran bajo `/app`
- Separación clara entre UI y lógica de dominio
- Mejor performance inicial

---

## ADR-002 — Prisma + PostgreSQL como capa de datos

**Estado:** Aceptado

### Decisión
Se utilizará Prisma como ORM y PostgreSQL como base de datos principal.

### Contexto
Se requiere:
- Migraciones controladas
- Tipado fuerte
- Escalabilidad
- Soporte para JSONB y queries complejas

### Consecuencias
- Todo cambio estructural debe pasar por migraciones Prisma
- No se permiten cambios manuales en DB

---

## ADR-003 — Multi-marca (Multi-tenant) desde v1.0

**Estado:** Aceptado

### Decisión
El sistema será diseñado como multi-marca desde el inicio.

### Contexto
El negocio prevé:
- Uso para múltiples marcas/negocios
- Escalamiento futuro sin refactor masivo

### Implementación
- Todas las entidades principales incluyen `brand_id`
- Aislamiento lógico por marca

### Consecuencias
- Mayor complejidad inicial
- Menor costo de escalado futuro

---

## ADR-004 — Separación PRD vs Technical Spec

**Estado:** Aceptado

### Decisión
Se mantienen dos documentos separados:
- PRD Funcional (`docs/prd.md`)
- Technical Design Spec (`docs/technical-spec.md`)

### Contexto
Uso con herramientas agent-first requiere:
- Qué (producto) separado de Cómo (técnico)

### Consecuencias
- Antigravity debe referenciar ambos
- Cambios deben reflejarse en ambos documentos si aplica

---

## ADR-005 — SLA como lógica de dominio (Service Layer)

**Estado:** Aceptado

### Decisión
La lógica de SLA se implementa en Service Layer, no solo en UI.

### Contexto
SLA es crítico para operación y reporting.

### Implementación
- first_response_due_at calculado al crear lead
- first_contact_at al crear primera actividad de contacto
- Flags derivados en backend

### Consecuencias
- UI solo consume estado
- Consistencia en todos los canales

---

## ADR-006 — Lead Strength como clasificación automática

**Estado:** Aceptado

### Decisión
Lead strength se calcula automáticamente.

Valores:
- BOTH
- PHONE_ONLY
- EMAIL_ONLY

### Contexto
Negocio define distintos valores para retargeting y calidad.

### Implementación
- Calculado en backend al crear/actualizar lead

### Consecuencias
- No editable manualmente
- Usado para reporting y segmentación

---

## ADR-007 — Asignación manual como única regla v1.0

**Estado:** Aceptado

### Decisión
No se implementan reglas automáticas de asignación en v1.0.

### Contexto
El proceso requiere lectura humana para priorización.

### Implementación
- Solo Admin/Manager asignan
- AuditLog obligatorio

### Consecuencias
- Mayor carga operativa
- Mayor control de calidad

---

## ADR-008 — Auditoría obligatoria en acciones críticas

**Estado:** Aceptado

### Decisión
Se implementa AuditLog obligatorio.

Acciones auditadas mínimas:
- Creación de lead
- Asignación
- Cambio de etapa
- Cierre de lead
- Cambios de owner

### Contexto
Necesidad de trazabilidad y control interno.

### Consecuencias
- Overhead de escritura en DB
- Alta trazabilidad

---

## ADR-009 — Validaciones por etapa (Stage-based validation)

**Estado:** Aceptado

### Decisión
Los campos obligatorios dependen de la etapa.

### Contexto
Reducir fricción inicial sin perder calidad de datos.

### Implementación
- Validaciones en Service Layer
- No solo en frontend

### Consecuencias
- UI debe manejar errores de validación
- Backend es la fuente de verdad

---

## ADR-010 — CSV Import como canal oficial v1.0

**Estado:** Aceptado

### Decisión
CSV Import es parte del MVP.

### Contexto
Volumen alto de leads y múltiples fuentes.

### Implementación
- Preview
- Mapping
- Validación
- Batch insert
- Warnings por duplicado

### Consecuencias
- Lógica adicional en backend
- Mayor complejidad inicial

---

## ADR-011 — No automatizaciones en v1.0

**Estado:** Aceptado

### Decisión
No se implementan automatizaciones (asignación, emails, etc.) en v1.0.

### Contexto
Reducir riesgo y complejidad inicial.

### Consecuencias
- Operación manual
- Arquitectura preparada para v1.1+

---

## ADR-012 — Reporting básico en v1.0

**Estado:** Aceptado

### Decisión
Se implementan solo métricas operativas básicas.

Incluye:
- Tasa de contacto
- Leads por origen
- Leads por ubicación
- SLA compliance

### Consecuencias
- No BI avanzado
- Posibilidad de integrar BI futuro

---

## ADR-013 — Seguridad por rol en backend

**Estado:** Aceptado

### Decisión
Las reglas de acceso se validan en backend.

### Contexto
No confiar en UI para seguridad.

### Implementación
- Guards en API/Service Layer
- Verificación por role + owner_user_id + brand_id

### Consecuencias
- Más lógica de backend
- Mayor seguridad

---

## ADR-014 — Campos Custom desde v1.0

**Estado:** Aceptado

### Decisión
Se soportan campos custom configurables por admin.

### Contexto
Necesidad de flexibilidad sin deploys.

### Consecuencias
- Modelo EAV
- Complejidad en queries
- Alta flexibilidad

---

## ADR-015 — Sin bloqueo por duplicados en v1.0

**Estado:** Aceptado

### Decisión
Los duplicados generan warnings pero no bloquean importación.

### Contexto
Prioridad en volumen vs limpieza perfecta.

### Consecuencias
- Posibles duplicados
- Dedupe automático en v1.1+

---

## ADR-016 — Domain Logic centralizado (Service Layer)

**Estado:** Aceptado

### Decisión
Toda regla de negocio vive en Service Layer.

### Contexto
Evitar lógica duplicada en UI y API.

### Consecuencias
- Mayor estructura de proyecto
- Mayor mantenibilidad

---

## ADR-017 — Antigravity como herramienta de implementación

**Estado:** Aceptado

### Decisión
Antigravity se utiliza para:
- Generar Implementation Plans
- Ejecutar tareas
- Verificar en browser
- Generar artifacts

### Contexto
Estrategia agent-first.

### Consecuencias
- Prompts deben referenciar docs
- Revisión humana obligatoria de planes

---

## ADR-018 — Versionado por sprints y artefactos

**Estado:** Aceptado

### Decisión
Cada sprint debe generar:
- Implementation Plan
- Verification steps
- Walkthrough

### Contexto
Trazabilidad de cambios.

### Consecuencias
- Mayor disciplina
- Mejor auditabilidad

---

## Regla Global

Todo desarrollo debe cumplir:

- `docs/prd.md`
- `docs/technical-spec.md`
- `docs/adr.md`

Si existe conflicto:
1. ADR
2. Technical Spec
3. PRD

---

