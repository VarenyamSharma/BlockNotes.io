BlockForms.io
Generate beautiful, Notion-style forms with ease. BlockForms.io provides a powerful and intuitive interface to create, manage, and share forms, streamlining your data collection and workflow.

Key Features
Notion-Style Editor: A rich text editor that allows you to build forms with the same flexibility and ease as Notion.

Real-time Database: Powered by Convex, ensuring your data is always up-to-date.

Authentication: Secure user authentication handled by Clerk.

File Uploads: Seamlessly upload images and other files with EdgeStore.

Customization: Light and dark mode support to match your preferences.

Publish and Share: Easily publish your forms and share them via a unique link.

Form Management: Archive, restore, and permanently delete forms with a dedicated trash system.

Tech Stack
Framework: Next.js

Database: Convex
# BlockForms (Notion-style form builder)

BlockForms is a lightweight Next.js application that lets teams design, preview, and publish Notion-style forms. It's optimized for fast iteration and simple deployments while providing hooks to integrate with production systems (Convex, Google Sheets, etc.).

Key capabilities

- Notion-style rich editor for building forms
- Interactive Preview mode with a working form (test submissions)
- Persist and export responses (CSV / XLSX)
- File uploads via EdgeStore
- Authentication integration via Clerk (optional)
- Optional integrations: Google Sheets export and AI summarizer

Tech stack

- Next.js (app router)
- Convex (real-time DB and serverless functions)
- Clerk (authentication)
- EdgeStore (file uploads)
- Tailwind CSS + shadcn/ui (styling)
- BlockNote (rich editor)

Getting started (developer)

Prerequisites

- Node.js v18+
- npm or yarn

Install and run

```powershell
npm install
npm run dev

# open http://localhost:3000
```

Environment variables

Create a `.env.local` file in the repository root and provide the values used by your environment. Example variables used in this project:

- NEXT_PUBLIC_CONVEX_URL=
- NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
- CLERK_SECRET_KEY=
- CLERK_JWT_ISSUER_DOMAIN=
- (Optional) GCP_SERVICE_ACCOUNT_KEY, GSPREAD_SHEET_ID — for Google Sheets integration
- (Optional) LLM_API_KEY — for the summarizer

Core files and conventions

- `components/` — UI components (form builder, preview, editor)
- `app/(main)/(routes)/forms/[formId]/page.tsx` — form editor page
- `app/api/responses/route.ts` — server route (demo store + export)
- `convex/` — Convex functions and schema (if used)
- `data/responses.json` — simple local response store used in demos

Production notes

- The demo includes a file-backed store (for simplicity). Replace the route implementation with your production DB client (Convex, Postgres, etc.) and keep the same request contract (POST `{ formId, data }`).
- Secure server routes (authentication + authorization) before exposing data.
- Use a Google service account with limited permissions for Sheets integration.
- Add rate limiting and queuing if you expect high write throughput.

Optional integrations

1) Google Sheets (opt-in)

- Use a Google service account and the Sheets API to append rows for each response.
- Recommended env vars: `GCP_SERVICE_ACCOUNT_KEY` (JSON), `GSPREAD_SHEET_ID`, `GSPREAD_RANGE`.

2) Form Summarizer (opt-in)

- Implement a server route that reads recent responses and returns a summary object.
- Two options: a lightweight aggregator (counts/top answers) or an LLM-based summarizer (requires API key and prompt design).

Contributing

Contributions, issues and feature requests are welcome. Please open an issue describing the change before sending large pull requests.

License

This project is released under the MIT License. See `LICENSE` for details.

Contact

If you want assistance implementing the optional integrations (Google Sheets or summarizer), tell me which one to implement first and I will add the concrete server routes, wiring and example tests.
