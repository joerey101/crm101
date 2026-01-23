# PRD Funcional — CRM B2C Retail (v1.0)

**Producto:** CRM Custom B2C Retail  
**Versión:** 1.0  
**Estado:** Base para implementación  
**Fecha:** 2026-01-22

---

## 1. Objetivo del Producto

Desarrollar un CRM custom para negocios B2C de retail que permita:

- Capturar leads desde múltiples canales
- Centralizar información del prospecto
- Permitir asignación manual por supervisores
- Gestionar seguimiento comercial
- Medir performance de leads, canales y equipos
- Preparar el sistema para escalar a multi-marca

---

## 2. Alcance (In-Scope v1.0)

### Funcionalidades incluidas
- Alta manual de leads
- Importación de leads vía CSV
- Bandeja de leads (Inbox)
- Ficha del lead (perfil 360)
- Asignación manual de leads
- Registro de actividades (llamada, WhatsApp, email, nota, reunión)
- Gestión de tareas
- Pipeline por etapas
- Reportes básicos
- Configuración básica (usuarios, etapas, fuentes)
- Campos custom configurables
- Auditoría de cambios críticos

### Funcionalidades fuera de alcance (v1.1+)
- Integraciones automáticas (Meta, WhatsApp API, Gmail, etc.)
- Automatizaciones avanzadas
- Scoring automático avanzado
- Adjuntos
- Dedupe automático bloqueante
- Reporting avanzado

---

## 3. Usuarios y Roles

### Roles
- **Admin**
  - Configuración total del sistema
  - Gestión de usuarios y permisos
  - Acceso completo a datos

- **Manager (Supervisor)**
  - Lectura de leads entrantes
  - Asignación manual de leads
  - Seguimiento del equipo
  - Acceso a reportes

- **Seller (Vendedor)**
  - Gestión de leads asignados
  - Registro de actividades
  - Gestión de tareas

---

## 4. Flujo General del Lead

1. Lead ingresa (manual o CSV)
2. Lead queda como **Nuevo / Sin asignar**
3. Supervisor revisa y asigna
4. Vendedor contacta al lead
5. Se registran actividades
6. Lead avanza por pipeline
7. Lead se cierra (conversión o no conversión)

---

## 5. Captura de Leads

### Canales
- Redes sociales
- WhatsApp
- Instagram
- Web
- Google Ads

### Formas de ingreso
- Alta manual
- Importación CSV

### Reglas mínimas
- Debe existir teléfono o email
- Origen obligatorio
- Provincia obligatoria
- Productos de interés obligatorios

---

## 6. Clasificación de Lead (Lead Strength)

El sistema clasifica automáticamente:

- **BOTH:** teléfono + email
- **PHONE_ONLY:** solo teléfono
- **EMAIL_ONLY:** solo email

Esto se usa para:
- Segmentación
- Reporting
- Reglas futuras de automatización

---

## 7. Inbox de Leads

### Funcionalidades
- Listado con paginación
- Filtros por:
  - Origen
  - Provincia / Localidad
  - Owner
  - Etapa
  - Lead strength
  - SLA (OK / En riesgo / Vencido)
- Vistas guardadas básicas

### Acciones rápidas
- Asignar lead
- Cambiar etapa
- Crear tarea
- Registrar actividad

---

## 8. Ficha del Lead (Perfil 360)

### Secciones
- Resumen
- Actividades (timeline)
- Tareas
- Notas
- Campos custom

### Información clave visible
- Datos de contacto
- Origen
- Etapa
- Owner
- Productos de interés
- SLA status

---

## 9. Asignación de Leads

- Solo Admin y Manager pueden asignar
- Asignación manual
- Cada asignación queda auditada
- Leads sin asignar son responsabilidad del supervisor

---

## 10. Pipeline

### Etapas default
1. Nuevo
2. Asignado
3. Contactado
4. Calificado
5. Cotización / Oferta
6. Seguimiento
7. Cerrado - Conversión
8. Cerrado - No conversión

Admin puede:
- Reordenar etapas
- Crear nuevas
- Marcar etapas como cerradas

---

## 11. Actividades

Tipos:
- Llamada
- WhatsApp
- Email
- Reunión
- Nota

Reglas:
- La primera actividad de contacto marca el primer contacto
- Actualiza SLA

---

## 12. Tareas

- Crear tareas asociadas a leads
- Fecha de vencimiento
- Prioridad
- Estado (abierta, completada, cancelada)

---

## 13. SLA Primer Contacto

- SLA = 24 horas desde creación del lead
- Indicadores:
  - OK
  - En riesgo
  - Vencido
- Métrica: % de leads contactados dentro de SLA

---

## 14. Cierre de Leads

### Conversión
- Lead llega a etapa "Cerrado - Conversión"

### No Conversión
- Lead llega a etapa "Cerrado - No conversión"
- Requiere motivo obligatorio:
  - No respondió
  - Precio
  - No era lo que buscaba
  - Zona / logística
  - Stock / disponibilidad
  - Competencia
  - Duplicado / Spam
  - Otro

---

## 15. Campos Obligatorios

### Al crear lead
- Nombre
- Provincia
- Origen
- Productos de interés
- Teléfono o Email (al menos uno)

### Al calificar lead
- CUIT
- Dirección
- Localidad

---

## 16. Campos Custom

- Admin puede crear campos custom
- Tipos soportados:
  - Texto
  - Número
  - Fecha
  - Booleano
  - Select
  - Multi-select

---

## 17. Importación CSV

### Funcionalidad
- Subir archivo CSV
- Previsualizar datos
- Mapear columnas
- Validar campos obligatorios
- Importar en batch
- Mostrar resumen (creados / con error / duplicados)

---

## 18. Reportes (v1.0)

### Métricas mínimas
- Tasa de contactos
- Leads efectivos (por lead_strength)
- Origen de leads
- Ubicación de leads (provincia / localidad)
- Leads dentro vs fuera de SLA

---

## 19. Multi-marca (Futuro)

- El sistema debe estar preparado para:
  - Múltiples marcas/negocios
  - Separación lógica de datos
  - Configuración independiente por marca

---

## 20. Fuera de Alcance (Explícito)

- Automatización de asignación
- Integraciones con APIs externas
- Mensajería automática
- Dedupe bloqueante
- Reportes financieros
- Gestión de inventario

---

## 21. Uso con Antigravity

Este PRD debe ser referenciado en cada prompt:

> Follow docs/prd.md strictly. Do not invent product flows.

---

