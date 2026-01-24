# CRM v1.3 & 1.4: Dashboard, Geo-Intelligence & Auto-Assignment 🌍📊

**Status:** Completed
**Date:** Jan 24, 2026

## 🎯 Objective
Transform the CRM from a "List" to a "Visual Command Center" and automate the distribution of leads based on geography.

## 🚀 Features Implemented

### 1. Visual Pipeline (Kanban)
*   **Drag & Drop:** Using `@dnd-kit` to move leads between stages.
*   **Optimistic UI:** Instant visual feedback.
*   **Persistence:** Auto-save to Database on drop.

### 2. Dashboard KPIs
*   **Stats Grid:** Real-time counters for Active Leads, Conversion Rate, and Won Deals.
*   **Funnel Chart:** Visual bar chart showing lead distribution.
*   **Lead Map:** Interactive Map showing leads in Neuquén, BsAs, etc.

### 3. Geo-Intelligence 🇦🇷
*   `argentina-geo.ts`: Library to deduce Province from Area Code (e.g., 299 -> Neuquén).
*   Corrects "Buenos Aires" default to specific provinces.

### 4. Auto-Assignment (Routing) 👮‍♂️
*   **Logic:** `lead-routing.ts`.
*   **Rules:**
    *   Patagonia (Neuquén, Rio Negro) -> **Vendedor Patagonia**.
    *   North (Salta, Jujuy) -> **Vendedor NOA**.
    *   AMBA (BsAs, Capital) -> **Round Robin** (Admin, Amba1, Amba2).
*   **Integration:** Woven into Web Forms and WhatsApp Webhooks.

## 📂 Key Files
*   `src/components/pipeline/PipelineBoard.tsx` (Kanban)
*   `src/components/dashboard/StatsGrid.tsx` (KPIs)
*   `src/components/dashboard/LeadMap.tsx` (Map)
*   `src/lib/lead-routing.ts` (the Brain of assignment)
