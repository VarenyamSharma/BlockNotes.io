# BlockNotes.io - Modern Note-Taking Platform

[](https://nextjs.org/)
[](https://reactjs.org/)
[](https://www.typescriptlang.org/)
[](https://convex.dev/)
[](https://clerk.com/)

A modern, full-stack note-taking application built with Next.js 15, featuring rich text editing and seamless user authentication. BlockNotes.io provides a unified workspace for productivity with Notion-style editing capabilities.

## ✨ Features

### 🎨 **Rich Text Editor**

  - **BlockNote Integration**: Advanced block-based editor with drag-and-drop functionality.
  - **Rich Formatting**: Support for headings, lists, code blocks, and more.
  - **Emoji Picker**: Enhanced user experience with emoji support.

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

    # EdgeStore (Optional)
    EDGE_STORE_ACCESS_KEY=your_edgestore_access_key
    EDGE_STORE_SECRET_KEY=your_edgestore_secret_key
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
    Navigate to [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000).

## 🏗️ Project Structure

The project follows a standard Next.js App Router structure. Core logic for the backend is located in the `convex/` directory, while frontend components are organized within `components/`.

## 🔧 Available Scripts

  - `npm run dev` - Start the development server with Turbopack.
  - `npm run build` - Build the application for production.
  - `npm run start` - Start the production server.
  - `npm run lint` - Run ESLint to check for code quality issues.

## 🎨 Customization

### Theming

The application supports both light and dark themes. You can customize the theme settings in `components/providers/theme-provider.tsx`.

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

This project is licensed under the MIT License - see the [LICENSE](https://www.google.com/search?q=LICENSE) file for details.

## 🙏 Acknowledgments

  - [Next.js](https://nextjs.org/) - The React framework
  - [Convex](https://convex.dev/) - Real-time backend
  - [Clerk](https://clerk.com/) - Authentication
  - [BlockNote](https://www.blocknotejs.org/) - Rich text editor
  - [Radix UI](https://www.radix-ui.com/) - UI components

## 📞 Support

For support, please email support@blocknotes.io or join our Discord community.

-----

**Built with ❤️ by the BlockNotes.io Team**
