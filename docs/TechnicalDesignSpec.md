A continuación te entrego el Technical Design Spec completo en formato Markdown (.md), listo para copiar/pegar directamente en tu repo (por ejemplo: docs/technical-spec.md) y ser consumido por Antigravity como fuente técnica.

No incluye explicaciones conversacionales: es un documento técnico aplicable.

# Technical Design Spec — CRM B2C Retail (v1.0)

**Documento técnico aplicable para implementación con Next.js + Antigravity**  
Versión: 1.0  
Estado: Base para implementación

---

## 1. Arquitectura General

### 1.1 Stack Tecnológico
- Frontend: Next.js (App Router)
- Lenguaje: TypeScript
- Backend: Next.js Route Handlers (API Routes)
- ORM: Prisma
- Base de Datos: PostgreSQL
- Auth: NextAuth (o equivalente)
- UI: Tailwind + componentes propios (o UI kit)
- File storage (v1.1): S3-compatible
- Deployment: preparado para multi-tenant

---

## 2. Arquitectura Lógica (Capas)



[ UI (App Router) ]
|
[ Server Actions / API Routes ]
|
[ Service Layer (Domain Logic) ]
|
[ Prisma ORM ]
|
[ PostgreSQL ]


Separación lógica obligatoria:
- UI no debe contener lógica de negocio
- Reglas de asignación, SLA, validaciones viven en Service Layer

---

## 3. Modelo de Datos Técnico (Schema)

### 3.1 Multi-marca (Multi-tenant)
Todas las entidades principales incluyen:

- brand_id (FK)

Esto permite aislar datos por negocio/marca.

---

### 3.2 Users & Roles



User

id (uuid)

brand_id

email

password_hash

role (ADMIN | MANAGER | SELLER)

is_active

created_at


---

### 3.3 Leads (Core)



Lead

id (uuid)

brand_id

// Identificación

full_name (string, required)

phone (string, nullable)

email (string, nullable)

// Fiscal / Dirección

cuit (string, nullable)

address (string, nullable)

locality (string, nullable)

province (string, required)

// Negocio

source_id (FK Source)

stage_id (FK Stage)

owner_user_id (FK User, nullable)

created_by_user_id (FK User)

// Clasificación

lead_strength (ENUM: BOTH | PHONE_ONLY | EMAIL_ONLY)

products_of_interest (jsonb or join table)

// SLA

first_response_due_at (timestamp)

first_contact_at (timestamp, nullable)

// Estado

closed_at (timestamp, nullable)

close_reason_id (FK CloseReason, nullable)

// Timestamps

created_at

updated_at

last_activity_at


#### Reglas técnicas
- phone OR email debe existir
- lead_strength se calcula automáticamente:
  - BOTH = phone + email
  - PHONE_ONLY = phone sin email
  - EMAIL_ONLY = email sin phone

---

### 3.4 Activities (Timeline)



Activity

id

brand_id

lead_id

type (CALL | WHATSAPP | EMAIL | MEETING | NOTE)

body (text)

outcome (string, nullable)

created_by_user_id

created_at


---

### 3.5 Tasks



Task

id

brand_id

lead_id

assigned_to_user_id

due_at

status (OPEN | DONE | CANCELED)

priority (LOW | MEDIUM | HIGH)

created_at


---

### 3.6 Pipeline Stages



Stage

id

brand_id

name

order

is_closed (boolean)

is_won (boolean)


---

### 3.7 Sources



Source

id

brand_id

name


---

### 3.8 Close Reasons



CloseReason

id

brand_id

name

category (WON | LOST)


---

### 3.9 Custom Fields (Configurable)



CustomFieldDefinition

id

brand_id

entity_type = 'LEAD'

key

label

type (TEXT | NUMBER | SELECT | MULTISELECT | DATE | BOOL)

options (jsonb)

required_on_stage_id (nullable)

CustomFieldValue

id

lead_id

field_def_id

value (jsonb)


---

### 3.10 Audit Log (Obligatorio)



AuditLog

id

brand_id

entity_type

entity_id

action

actor_user_id

old_value (jsonb)

new_value (jsonb)

created_at


Acciones auditadas mínimas:
- LEAD_CREATED
- LEAD_ASSIGNED
- STAGE_CHANGED
- OWNER_CHANGED
- LEAD_CLOSED
- TASK_CREATED
- TASK_COMPLETED

---

## 4. Reglas de Negocio Técnicas

### 4.1 SLA
- first_response_due_at = created_at + 24h
- Cuando se crea primera Activity de tipo CALL/WHATSAPP/EMAIL:
  - set first_contact_at
- SLA Status:
  - OK: first_contact_at <= due_at
  - AT_RISK: now > due_at - 4h
  - BREACHED: now > due_at AND first_contact_at IS NULL

---

### 4.2 Asignación Manual
- Solo ADMIN y MANAGER pueden cambiar owner_user_id
- Cada cambio genera AuditLog
- Si owner_user_id = NULL → responsable implícito = MANAGER

---

### 4.3 Validaciones por Etapa
- En stage = "Calificado" o superior:
  - cuit, address, locality deben existir
- Esto se implementa en Service Layer (no solo UI)

---

### 4.4 Lead Closure
- Al pasar a stage is_closed = true:
  - closed_at = now()
  - close_reason_id obligatorio si is_won = false

---

## 5. APIs / Server Actions (Contrato)

### 5.1 Leads



POST /api/leads
GET /api/leads
GET /api/leads/:id
PUT /api/leads/:id
POST /api/leads/:id/assign
POST /api/leads/:id/close


### 5.2 Activities



POST /api/leads/:id/activities
GET /api/leads/:id/activities


### 5.3 Tasks



POST /api/leads/:id/tasks
PUT /api/tasks/:id


### 5.4 CSV Import



POST /api/import/leads


Flujo:
1. Upload
2. Preview + mapping
3. Validate
4. Batch insert
5. Summary report

---

## 6. Seguridad y Permisos

### Acceso por rol (hard rule)
- SELLER:
  - Solo leads donde owner_user_id = self
- MANAGER:
  - Leads del brand
- ADMIN:
  - Full access

Esto se valida:
- En API
- En Service Layer
- No confiar solo en UI

---

## 7. Índices y Performance

Índices obligatorios:
- Lead.brand_id
- Lead.owner_user_id
- Lead.stage_id
- Lead.created_at
- Lead.phone
- Lead.email
- Activity.lead_id
- Task.assigned_to_user_id

---

## 8. Estrategia CSV Import (Técnica)

- Parse en backend
- Transacción por batch
- Validación fila por fila
- Detección de duplicado:
  - same phone OR same email
  - v1.0 = warning, no bloqueo

---

## 9. Versionado y Migraciones

- Todas las tablas vía Prisma migrations
- Nunca cambios manuales en DB
- Campos nuevos vía migración + backfill script si aplica

---

## 10. Artefactos esperados de Antigravity

Cada módulo debe generar:
- Implementation Plan
- Lista de archivos
- Cambios de schema
- Verification steps
- Browser walkthrough

---

## 11. Uso con Antigravity

Este documento debe ser referenciado en cada prompt:

> Follow docs/prd.md and docs/technical-spec.md strictly. Do not invent schema or flows.

---