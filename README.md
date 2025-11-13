# BlockNotes.io - Modern Note-Taking Platform

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Convex](https://img.shields.io/badge/Convex-1.27-FF4D00?style=for-the-badge)
![Clerk](https://img.shields.io/badge/Clerk-Auth-6C47FF?style=for-the-badge)

A modern, full-stack note-taking application built with Next.js 15, featuring rich text editing, AI-powered quiz generation, and seamless user authentication. BlockNotes.io provides a unified workspace for productivity with Notion-style editing capabilities and interactive learning features.

## ✨ Features

### 🎨 **Rich Text Editor**

  - **BlockNote Integration**: Advanced block-based editor with drag-and-drop functionality.
  - **Rich Formatting**: Support for headings, lists, code blocks, and more.
  - **Emoji Picker**: Enhanced user experience with emoji support.
  - **Icon Customization**: Custom icons for documents and notes.
  - **Cover Images**: Upload and manage cover images for visual appeal.

### 🔐 **Authentication & Security**

  - **Clerk Integration**: Secure user authentication and management.
  - **Role-based Access**: User-specific document access and permissions.
  - **Data Privacy**: Secure data handling and storage.

### 🎯 **User Experience**

  - **Dark/Light Mode**: Seamless theme switching with system preference detection.
  - **Responsive Design**: Mobile-first approach with cross-device compatibility.
  - **Search Functionality**: Global search across all documents and notes.
  - **File Management**: Upload and manage cover images and attachments.

### 🗂️ **Organization**

  - **Hierarchical Structure**: Nested documents and notes.
  - **Archive System**: Soft delete with restore functionality.
  - **Trash Management**: Permanent deletion with confirmation.
  - **Smart Navigation**: Breadcrumb navigation and sidebar organization.

### 🤖 **AI-Powered Features**

  - **Quiz Generation**: Automatically generate interactive quizzes from note content using AI.
  - **Quiz Response Tracking**: Collect and track quiz responses with scores.
  - **Public Quiz Access**: Share quizzes with others via public links.

### 📤 **Publishing & Sharing**

  - **Public Publishing**: Publish notes to the web with shareable links.
  - **Preview Mode**: Preview published notes before sharing.
  - **Quiz Integration**: Convert notes into interactive quizzes for learning.

## 🚀 Tech Stack

### **Frontend**

  - **Next.js 15** - React framework with App Router
  - **React 19** - Latest React with concurrent features
  - **TypeScript** - Type-safe development
  - **Tailwind CSS** - Utility-first CSS framework
  - **Radix UI** - Accessible component primitives
  - **Lucide React** - Beautiful icon library

### **Backend & Database**

  - **Convex** - Real-time backend with automatic reactivity
  - **EdgeStore** - File storage and management
  - **Zod** - Runtime type validation

### **Authentication & Storage**

  - **Clerk** - User authentication and management
  - **Convex Auth** - Secure backend authentication

### **Editor & UI**

  - **BlockNote** - Rich text editor with block-based editing
  - **React Dropzone** - File upload handling
  - **Sonner** - Toast notifications
  - **Zustand** - State management

### **AI & Learning**

  - **Convex Actions** - Server-side AI processing for quiz generation
  - **Quiz System** - Interactive quiz creation and response tracking

## 📦 Installation

### Prerequisites

  - Node.js 18+
  - npm or yarn
  - A Convex account
  - A Clerk account

### Setup Instructions

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/blocknotes.git
    cd blocknotes
    ```

2.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Configuration**
    Create a `.env.local` file in the root directory and add the following variables:

    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # Convex Backend
    CONVEX_DEPLOYMENT=your_convex_deployment_url
    NEXT_PUBLIC_CONVEX_URL=your_convex_url

    # EdgeStore (Optional - for file uploads)
    EDGE_STORE_ACCESS_KEY=your_edgestore_access_key
    EDGE_STORE_SECRET_KEY=your_edgestore_secret_key

    # AI/OpenAI (Optional - for quiz generation)
    OPENAI_API_KEY=your_openai_api_key
    ```

4.  **Initialize Convex**
    Run the Convex development server and follow the CLI instructions to link your project.

    ```bash
    npx convex dev
    ```

5.  **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

6.  **Open your browser**
    Navigate to [http://localhost:3000](http://localhost:3000).

## 🏗️ Project Structure

```
BlockNotes.io/
├── app/                          # Next.js App Router
│   ├── (landing page)/          # Public landing page
│   │   └── _components/         # Landing page components
│   ├── (main)/                  # Main application routes
│   │   ├── (routes)/
│   │   │   └── forms/           # Forms/Notes management
│   │   └── _components/         # Main app components
│   ├── (public)/                # Public routes
│   │   └── (routes)/
│   │       ├── preview/         # Public note preview
│   │       └── quiz/            # Public quiz interface
│   └── api/                     # API routes
│       └── edgestore/           # File upload handling
├── components/                   # Reusable UI components
│   ├── ui/                      # shadcn/ui components
│   │   └── providers/           # Context providers
│   ├── modals/                  # Modal components
│   └── upload/                  # Upload components
├── convex/                      # Convex backend
│   ├── schema.ts               # Database schema
│   ├── forms.ts                # Forms/Notes mutations & queries
│   ├── ai.ts                   # AI quiz generation
│   └── auth.convex.ts          # Authentication
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
└── public/                      # Static assets
```

### Key Directories

- **`convex/`**: Contains all backend logic including database schema, mutations, queries, and AI actions
- **`app/(main)/`**: Main application interface with navigation, document list, and editing
- **`app/(public)/`**: Public-facing routes for previewing and taking quizzes
- **`components/`**: Reusable UI components built with Radix UI and Tailwind CSS

## 🔧 Available Scripts

  - `npm run dev` - Start the development server with Turbopack.
  - `npm run build` - Build the application for production.
  - `npm run start` - Start the production server.
  - `npm run lint` - Run ESLint to check for code quality issues.

## 🎨 Customization

### Theming

The application supports both light and dark themes. You can customize the theme settings in `components/ui/providers/theme-providers.tsx`.

### Styling

Modify the application's design system by updating the Tailwind configuration in `tailwind.config.ts` and component-specific styles.

### Database Schema

Extend the database schema by modifying the files in the `convex/` directory. Define new tables and relationships in `convex/schema.ts`.

## 🚀 Deployment

### Vercel (Recommended)

1.  Push your code to a GitHub repository.
2.  Connect your repository to your Vercel account.
3.  Add the required environment variables from your `.env.local` file to the Vercel project settings.
4.  Deploy. Vercel will automatically build and deploy your application.

### Other Platforms

The application can be deployed to any platform that supports Next.js, such as:

  - Netlify
  - Railway
  - DigitalOcean App Platform

## 🤝 Contributing

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

  - [Next.js](https://nextjs.org/) - The React framework
  - [Convex](https://convex.dev/) - Real-time backend
  - [Clerk](https://clerk.com/) - Authentication
  - [BlockNote](https://www.blocknotejs.org/) - Rich text editor
  - [Radix UI](https://www.radix-ui.com/) - UI components

## 📞 Support

For support, please email support@blocknotes.io or open an issue on GitHub.

## 🎯 Key Features in Detail

### Document Management
- Create, edit, and organize notes in a hierarchical structure
- Support for nested documents (parent-child relationships)
- Archive and restore functionality
- Permanent deletion with trash management

### Rich Text Editing
- BlockNote editor with full formatting support
- Drag-and-drop block reordering
- Code blocks, lists, headings, and more
- Real-time auto-save functionality

### Quiz System
- AI-powered quiz generation from note content
- Multiple-choice questions automatically generated
- Score tracking and response collection
- Public quiz links for sharing

### Publishing
- Publish notes to the web with unique URLs
- Preview mode before publishing
- Copy shareable links
- Unpublish functionality

-----

**Built with ❤️ by the BlockNotes.io Team**
