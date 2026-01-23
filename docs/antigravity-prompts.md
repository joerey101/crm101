A continuación tenés el documento de Prompts estandarizados para Antigravity, alineado con:

La guía oficial de uso agent-first

Best practices (Implementation Plans, artifacts, verificación)

Tus documentos: PRD, Technical Spec, ADR y Glossary

Este archivo está pensado para reducir al mínimo la deriva del agente y maximizar reproducibilidad.

Guardalo como: docs/antigravity-prompts.md

# Antigravity Prompts — CRM B2C Retail

**Proyecto:** CRM B2C Retail  
**Versión:** 1.0  
**Fecha:** 2026-01-22  
**Estado:** Activo

Este documento define los prompts estándar que deben usarse con Google Antigravity para implementar el CRM siguiendo un enfoque agent-first, basado en Implementation Plans, artifacts y verificación.

Todos los prompts deben referenciar explícitamente:

- docs/prd.md  
- docs/technical-spec.md  
- docs/adr.md  
- docs/domain-glossary.md  

---

## Regla Global (OBLIGATORIA)

Todo prompt debe incluir:

> Follow docs/prd.md, docs/technical-spec.md, docs/adr.md, and docs/domain-glossary.md strictly. Do not invent schema, flows, or business rules. If something is unclear, stop and ask for clarification.

---

## Prompt 00 — Project Initialization

### Uso
Primera ejecución en un repo vacío.

### Prompt


Initialize a new project for the CRM B2C Retail.

Tech stack:

Next.js App Router

TypeScript

Prisma

PostgreSQL

Tailwind CSS

Follow docs/prd.md, docs/technical-spec.md, docs/adr.md, and docs/domain-glossary.md strictly.

First, generate an Implementation Plan only. Do NOT write code yet.

The plan must include:

Project structure

Dependencies

Auth strategy

Prisma setup

Initial migrations

Verification steps

Wait for approval before executing.


---

## Prompt 01 — Auth & RBAC (Sprint 1)

### Uso
Implementar autenticación y roles.

### Prompt


Create an Implementation Plan for Authentication and Role-Based Access Control.

Scope:

User model with roles: ADMIN, MANAGER, SELLER

Login flow

Session handling

Backend guards for role validation

Brand isolation (brand_id)

Follow all docs strictly.

Deliverable:

Implementation Plan artifact

File list

Prisma schema changes

Verification steps (login as each role and validate access)

Do NOT implement until I approve the plan.


---

## Prompt 02 — Core Data Models (Sprint 1)

### Uso
Implementar schema principal.

### Prompt


Create an Implementation Plan for core data models.

Entities:

Lead

Stage

Source

CloseReason

Activity

Task

AuditLog

CustomFieldDefinition

CustomFieldValue

Brand

As defined in docs/technical-spec.md.

Include:

Prisma schema

Indexes

Migrations

Seed data for default stages and sources

Do NOT implement yet. Produce Implementation Plan only.


---

## Prompt 03 — Leads Inbox (Sprint 2)

### Uso
Implementar listado principal.

### Prompt


Create an Implementation Plan for Leads Inbox.

Features:

Paginated leads table

Filters: source, province, owner, stage, lead_strength, SLA status

Saved views (basic)

Quick actions: assign, change stage, create task

Respect role permissions.

Include:

UI components

API endpoints

Service layer logic

Verification walkthrough

Implementation Plan only.


---

## Prompt 04 — Lead Profile (Sprint 2)

### Uso
Implementar ficha 360.

### Prompt


Create an Implementation Plan for Lead Profile (360 view).

Tabs:

Overview

Activities

Tasks

Notes

Custom Fields

Features:

Display lead data

Add activity

Add task

SLA indicators

Include:

Data loading strategy

Component structure

Backend validation

Verification steps

Implementation Plan only.


---

## Prompt 05 — Manual Assignment + Audit (Sprint 2)

### Uso
Implementar asignación manual.

### Prompt


Create an Implementation Plan for Manual Lead Assignment.

Rules:

Only ADMIN and MANAGER can assign

Update owner_user_id

Create AuditLog entry

Handle unassigned leads

Include:

API/Server Action

Service layer logic

UI modal/action

AuditLog creation

Verification steps

Implementation Plan only.


---

## Prompt 06 — SLA Logic (Sprint 3)

### Uso
Implementar SLA backend.

### Prompt


Create an Implementation Plan for SLA logic.

Requirements:

first_response_due_at on lead creation

first_contact_at on first CALL/WHATSAPP/EMAIL activity

SLA status calculation (OK / AT_RISK / BREACHED)

Implement in Service Layer.

Include:

Schema usage

Domain logic

UI consumption

Verification scenarios

Implementation Plan only.


---

## Prompt 07 — Pipeline Board (Sprint 3)

### Uso
Implementar kanban.

### Prompt


Create an Implementation Plan for Pipeline Board.

Features:

Kanban by Stage

Drag and drop

Update stage with validation

Closed stage handling

Respect validation rules from technical-spec.

Include:

UI board

Backend update logic

AuditLog on stage change

Verification walkthrough

Implementation Plan only.


---

## Prompt 08 — CSV Import (Sprint 4)

### Uso
Implementar importador.

### Prompt


Create an Implementation Plan for CSV Import.

Flow:

Upload CSV

Preview rows

Map columns

Validate required fields

Batch insert

Summary report

Rules:

Warn on duplicate phone/email

Do not block import

Include:

Backend parsing

UI mapping

Validation logic

Error handling

Verification steps

Implementation Plan only.


---

## Prompt 09 — Reports (Sprint 4)

### Uso
Implementar reportes básicos.

### Prompt


Create an Implementation Plan for basic reports.

Metrics:

Contact rate

Lead strength distribution

Leads by source

Leads by province/locality

SLA compliance

Include:

Aggregation queries

API endpoints

UI charts/tables

Verification with sample data

Implementation Plan only.


---

## Prompt 10 — Custom Fields (Sprint 4)

### Uso
Implementar campos configurables.

### Prompt


Create an Implementation Plan for Custom Fields.

Features:

Admin CRUD for CustomFieldDefinition

Attach values to Lead

Validation on required_on_stage_id

Include:

Schema usage

UI for admin

UI for lead profile

Service layer validation

Verification scenarios

Implementation Plan only.


---

## Prompt 11 — Security & Access Review

### Uso
Auditoría interna.

### Prompt


Create an Implementation Plan to audit and harden security.

Scope:

Role enforcement

Brand isolation

API guard coverage

Attempted unauthorized access scenarios

Include:

Checklist

Test scenarios

Verification steps

Implementation Plan only.


---

## Prompt 12 — Regression & Walkthrough

### Uso
Antes de cerrar un sprint.

### Prompt


Create a full verification walkthrough.

Scenarios:

Create lead

Assign lead

Add activity

Trigger SLA

Move pipeline stage

Close lead

Import CSV

Include:

Browser steps

Expected outcomes

Screenshots plan

Artifact must be usable as regression checklist.


---

## Regla Final

Ningún módulo se implementa sin:
1. Implementation Plan aprobado
2. Referencia explícita a los docs
3. Verification steps definidos

---

