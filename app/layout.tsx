import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/providers/theme-providers";
import { ConvexClientProvider } from "@/components/ui/providers/convex-provider";
import { Toaster } from "sonner";
import { ModalProvider } from "@/components/ui/providers/modal-provider";
import { EdgeStoreProvider } from "@/lib/edgestore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BlockNotes.io",
  description:
    "Generate beautiful notes with a Notion-style interface using BlockNotes.io.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              storageKey="theme"
            >
              <Toaster position="bottom-center" />
              {children}
              <ModalProvider />
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
