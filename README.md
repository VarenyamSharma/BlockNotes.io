BlockNotes.io: The Open-Source, Notion-Style Notes App
BlockNotes.io is a lightweight, yet powerful open-source application that empowers teams and individuals to design, preview, and publish Notion-style notes with unparalleled ease. Optimized for rapid iteration and seamless deployment, it offers a robust platform for integrating with production systems.

Key Features
✍️ Notion-Style Rich Text Editor: A sophisticated, block-based editor that provides the flexibility and intuitive interface of Notion for crafting beautiful and structured notes.

🧠 AI-Powered Assistance: Enhance your productivity with intelligent features:

Content Summarization: Automatically generate concise summaries of lengthy notes.

Title Auto-generation: Let AI suggest compelling titles for your documents.

Smart Tagging: Receive intelligent tag suggestions to organize your notes effortlessly.

Machine Translation: Translate your content into multiple languages with a single click.

🕸️ Knowledge Graph View: Visualize the intricate relationships between your notes, offering a connected, Obsidian-like perspective of your knowledge base.

⚡ Real-time Database & Serverless Functions: Powered by Convex, ensuring your data is always synchronized in real-time across all clients without managing a backend.

🔐 Secure Authentication: Robust and secure user authentication handled by Clerk, providing a seamless and safe login experience.

☁️ Effortless File Uploads: Integrated with EdgeStore for smooth and reliable image and file uploads.

🎨 Customizable Themes: A sleek and modern UI with support for both light and dark modes to suit your personal preferences.

🚀 Publish & Share: Easily publish your notes to the web and share them with a unique link for collaboration or public viewing.

🗂️ Advanced Note Management: A comprehensive system for managing your notes, including archiving, restoring, and a dedicated trash system for soft deletion.

Tech Stack
Framework: Next.js (App Router)

Database: Convex (Real-time Database and Serverless Functions)

Authentication: Clerk

File Uploads: EdgeStore

Styling: Tailwind CSS + shadcn/ui

Editor: BlockNote

Getting Started (Developer)
Prerequisites
Node.js v18+

npm or yarn

Installation and Setup
Clone the repository:

Bash

git clone https://github.com/your-username/blocknotes.io.git
cd blocknotes.io
Install dependencies:

Bash

npm install
Set up environment variables:
Create a .env.local file in the repository root and provide the necessary API keys and configuration:

Code snippet

NEXT_PUBLIC_CONVEX_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_JWT_ISSUER_DOMAIN=
# Optional for AI features
LLM_API_KEY=
Run the development server:

Bash

npm run dev
Open http://localhost:3000 in your browser to see the application in action.

Core Files and Conventions
components/: UI components (editor, navigation, etc.)

app/(main)/(routes)/documents/[documentId]/page.tsx: The main document editor page.

convex/: Convex functions and database schema.

Production Notes
Secure all server routes with proper authentication and authorization before exposing any sensitive data.

Add rate limiting and queuing if you expect high write throughput to prevent abuse and ensure stability.

Contributing
Contributions, issues, and feature requests are welcome. Please open an issue to discuss the change before submitting a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for more details.