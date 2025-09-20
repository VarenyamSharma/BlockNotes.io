
# BlockNotes.io - Modern Note-Taking Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Convex](https://img.shields.io/badge/Convex-1.27.0-purple?style=flat-square)](https://convex.dev/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth-green?style=flat-square)](https://clerk.com/)

A modern, full-stack note-taking application built with Next.js 15, featuring real-time collaboration, rich text editing, and seamless user authentication. BlockNotes.io provides a unified workspace for productivity with Notion-style editing capabilities.


## ✨ Features

### 🎨 **Rich Text Editor**
- **BlockNote Integration**: Advanced block-based editor with drag-and-drop functionality
- **Real-time Collaboration**: Live editing with instant updates across users
- **Rich Formatting**: Support for headings, lists, code blocks, and more
- **Emoji Picker**: Enhanced user experience with emoji support


### 🔐 **Authentication & Security**
- **Clerk Integration**: Secure user authentication and management
- **Role-based Access**: User-specific document access and permissions
- **Data Privacy**: Secure data handling and storage

### 🎯 **User Experience**
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Search Functionality**: Global search across all documents and notes
- **File Management**: Upload and manage cover images and attachments

### 🗂️ **Organization**
- **Hierarchical Structure**: Nested documents and notes
- **Archive System**: Soft delete with restore functionality
- **Trash Management**: Permanent deletion with confirmation
- **Smart Navigation**: Breadcrumb navigation and sidebar organization

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
- Convex account
- Clerk account

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blocknotes.git
   cd blocknotes
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
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

4. **Initialize Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


### 🔐 **Authentication & Security**
- **Clerk Integration**: Secure user authentication and management
- **Role-based Access**: User-specific form access and permissions
- **Data Privacy**: Secure data handling and storage

### 🎯 **User Experience**
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with cross-device compatibility
- **Search Functionality**: Global search across all forms and notes
- **File Management**: Upload and manage cover images and attachments

### 🗂️ **Organization**
- **Hierarchical Structure**: Nested forms and documents
- **Archive System**: Soft delete with restore functionality
- **Trash Management**: Permanent deletion with confirmation
- **Smart Navigation**: Breadcrumb navigation and sidebar organization

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
- Convex account
- Clerk account

### Setup Instructions
>>>>>>> e89cfc8f28b82c8740c93f53de7634e827b32294

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/blocknotes.git
   cd blocknotes
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Customization

### Theming
The application supports both light and dark themes. Customize the theme in `components/ui/providers/theme-providers.tsx`.

### Styling
Modify the design system by updating Tailwind configuration in `tailwind.config.js` and component styles.

### Database Schema
Extend the database schema in `convex/schema.ts` to add new fields or tables.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Convex](https://convex.dev/) - Real-time backend
- [Clerk](https://clerk.com/) - Authentication
- [BlockNote](https://www.blocknotejs.org/) - Rich text editor
- [Radix UI](https://www.radix-ui.com/) - UI components

## 📞 Support

For support, email support@blocknotes.io or join our Discord community.

---

**Built with ❤️ by the BlockNotes.io Team**
=======
2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
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

4. **Initialize Convex**
   ```bash
   npx convex dev
   ```

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint


## 🎨 Customization

### Theming
The application supports both light and dark themes. Customize the theme in `components/ui/providers/theme-providers.tsx`.

### Styling
Modify the design system by updating Tailwind configuration in `tailwind.config.js` and component styles.

### Database Schema
Extend the database schema in `convex/schema.ts` to add new fields or tables.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Convex](https://convex.dev/) - Real-time backend
- [Clerk](https://clerk.com/) - Authentication
- [BlockNote](https://www.blocknotejs.org/) - Rich text editor
- [Radix UI](https://www.radix-ui.com/) - UI components

## 📞 Support

For support, email support@blocknotes.io or join our Discord community.

---

**Built with ❤️ by the BlockNotes.io Team**

