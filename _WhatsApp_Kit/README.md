# WhatsApp Integration Kit (Next.js + Meta Graph API)

This folder contains a verified, reusable implementation of Two-Way WhatsApp communication for Next.js applications.

## Prerequisites
1.  **Meta Business Account** with a WhatsApp App created.
2.  **System User Token** (Permanent) or Temporary Token (for dev).
3.  **Permissions:** `whatsapp_business_messaging`, `whatsapp_business_management`.

## Environment Variables
Add these to your `.env` file:
```env
WHATSAPP_ACCESS_TOKEN="your_token_here"
WHATSAPP_PHONE_NUMBER_ID="your_phone_id_here"
WEBHOOK_VERIFY_TOKEN="your_custom_verify_token"
```

## Critical Files
1.  **`service.ts`**: The core API client. Handles sending messages.
2.  **`route.ts`**: The Webhook handler. Verifies the token and processes incoming messages.
3.  **`actions.ts`**: Server Actions for frontend usage. **Includes the critical Argentina Sandbox Fix.**

## The "Argentina Fix"
For the Meta Sandbox (and some production routes), Argentina numbers must be formatted specifically:
-   **Standard:** `+54 9 11 3359 0001`
-   **Sandbox Requirement:** `54111533590001` (No `9`, Insert `15` after area code).

The `actions.ts` file includes logic to automatically handle this normalization.
