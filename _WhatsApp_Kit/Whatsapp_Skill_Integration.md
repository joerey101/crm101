---
name: WhatsApp Integration Pro
description: A comprehensive guide and toolkit for integrating Two-Way WhatsApp communication (Meta Graph API) into Next.js applications, including specific fixes for Argentina/Sandbox numbers.
---

# WhatsApp Integration Pro

This skill guides you through adding full Two-Way WhatsApp communication to a CRM or App.

## 1. Capabilities
-   **Send Messages**: Utilize the Meta Graph API to send text messages.
-   **Receive Messages**: Webhook implementation to receive real-time updates.
-   **Conversation Tracking**: Log messages in a database (Prisma).
-   **Local & Production**: Tips for handling Sandbox vs. Live environments.
-   **Argentina Logic**: Specialized normalization logic for Argentina (+54) numbers in Sandbox.

## 2. Setup Instructions

### Environment Variables
Ensure the target project has these variables in `.env`:
```env
WHATSAPP_ACCESS_TOKEN="<Meta System User Token>"
WHATSAPP_PHONE_NUMBER_ID="<Meta Phone ID>"
WEBHOOK_VERIFY_TOKEN="<Random String>"
```

### Installation Steps
1.  **Service Layer**: Copy `service.ts` to `src/services/whatsapp.ts`.
2.  **Webhook Handler**: Copy `route.ts` to `src/app/api/webhooks/whatsapp/route.ts`.
3.  **Server Action**: Copy `actions.ts` to `src/app/actions/whatsapp-actions.ts`.
    -   *Crucial*: Keep the `CleanPhone` logic in `actions.ts` to handle the `549` vs `5415` prefix issue for Argentina.

## 3. Usage

### Sending a Message
Use the Server Action in your UI components:
```typescript
import { sendMessageAction } from '@/app/actions/whatsapp-actions';

// ... inside a form action or event handler
await sendMessageAction(leadId, "Hello World");
```

### Handling Replies
Replies arrive via the Webhook (`POST /api/webhooks/whatsapp`). The provided `route.ts` logs them to the console. You **must** extend it to save to your database:
```typescript
// inside route.ts > POST
const message = value.messages[0];
await db.activity.create({
  data: { type: 'WHATSAPP', body: message.text.body, ... }
});
```

## 4. Troubleshooting API Errors
-   **Permissions Error**: Check if the System User has `whatsapp_business_messaging`.
-   **#131030 (Recipient not allowed)**:
    -   In Sandbox: The recipient must appear in the "Allowed Numbers" list in Meta Dashboard.
    -   Argentina Fix: Ensure the number is sent as `541115...` (Sanbox) or `54911...` (Prod depending on the day/luck). The provided `actions.ts` handles the `549` -> `54(+15)` logic.

## 5. Landing Page "Hybrid" Flow (Form + Click-to-Chat)
This Kit includes the strategy to Capture Leads via Web and redirect them to WhatsApp immediately.

### Files Included:
-   **`public-lead-actions.ts`**: The Server Action. Creates the lead in DB and returns the `wa.me` redirect URL.
-   **`argentina-geo.ts`**: A helper library to auto-detect the Province (e.g., Neuquén, Mendoza) based on the Area Code (DDN).

### How it works:
1.  **User fills Form**: Name + Phone (No complex fields).
2.  **Server Action**:
    -   Creates Lead (Status: NEW).
    -   Detects Province (using `argentina-geo.ts`).
    -   Generates URL: `https://wa.me/<BUSINESS_NUMBER>?text=Hola soy [Name]...`
3.  **Redirect**: The browser opens WhatsApp with the pre-filled message.
4.  **Result**: You get the Data (safe in DB) AND the Conversation (initiated by user).

