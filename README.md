BlockNotes.io: A Real-time, Notion-Style Notes Application
<div align="center">

A modern, open-source, and collaborative note-taking application built with Next.js, Convex, and Clerk.

Live Demo · Report Bug · Request Feature

</div>

📖 Overview
BlockNotes.io is a feature-rich, Notion-inspired notes application designed for real-time collaboration and seamless document management. It provides a beautiful and intuitive block-based editor, allowing users to create, publish, and share their notes with ease.

With built-in AI capabilities, secure authentication, and a robust backend, BlockNotes.io is the perfect platform for individuals and teams looking to streamline their workflow.

✨ Key Features
✍️ Notion-Style Rich Text Editor: A sophisticated, block-based editor powered by BlockNote for an intuitive and flexible writing experience.

⚡ Real-time Collaboration: Powered by Convex, all changes sync instantly across clients.

🚀 Publish to the Web: Share notes via unique URLs with one click.

🧠 AI-Powered Summarization: Generate concise summaries using the Google Gemini API.

🔐 Secure Authentication: Simple and safe login/signup with Clerk.

🖼️ Image & Cover Uploads: Easily upload images and covers with EdgeStore.

🗂️ Nested Document Management: Organize notes hierarchically for better structure.

🗑️ Soft Deletion & Recovery: A trash bin with options to restore or permanently delete notes.

🎨 Light & Dark Mode: A modern UI with customizable themes.

📄 PDF Export: Export notes into clean PDFs directly from the preview mode.

📱 Fully Responsive: Works seamlessly on desktop, tablet, and mobile devices.


## 🛠️ Tech Stack

| Category           | Technology         |
|--------------------|--------------------|
| Framework          | Next.js (App Router) |
| Database & Backend | Convex             |
| Authentication     | Clerk              |
| File Storage       | EdgeStore          |
| UI Components      | shadcn/ui          |
| Styling            | Tailwind CSS       |
| Editor             | BlockNote          |
| Deployment         | Vercel             |


🚀 Getting Started
Prerequisites
Node.js v18+

npm, yarn, or pnpm

Installation
Clone the repository:

git clone [https://github.com/your-username/blocknotes.io.git](https://github.com/your-username/blocknotes.io.git)
cd blocknotes.io

Install dependencies:

npm install

Set up environment variables:
Create a .env.local file in the root of the project and add the following variables. You can obtain these keys from their respective service dashboards.

# Convex
NEXT_PUBLIC_CONVEX_URL=

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Google Gemini API for AI features
GEMINI_API_KEY=

Run the development server:

npm run dev

The application will be running at http://localhost:3000.

📂 Project Structure
/
├── app/                  # Main application routes and layouts
│   ├── (main)/           # Authenticated routes
│   ├── (landing page)/   # Public landing page
│   └── (public)/         # Publicly accessible routes (e.g., previews)
├── components/           # Reusable UI components
├── convex/               # Convex database schema and server functions
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and library initializations
└── public/               # Static assets

🤝 Contributing
Contributions are welcome!

Fork the repository.

Create a new branch:

git checkout -b feature/your-feature-name

Make your changes and commit them:

git commit -m "Add some feature"

Push to your branch:

git push origin feature/your-feature-name

Open a Pull Request.

👉 Please open an issue to discuss any significant changes before starting work.

📄 License
This project is licensed under the MIT License. See the LICENSE file for more details.