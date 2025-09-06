"use client";

import { Spinner } from "@/components/spinner";
import { useConvexAuth } from "convex/react";
import Navigation from "./_components/navigation";
import { redirect } from "next/navigation";
import { SearchCommand } from "@/components/search-command";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) {
    redirect("/");
    return null;
  }

  return (
    <div className="h-screen w-screen flex overflow-hidden">
      <Navigation />
      <main className="flex-1 h-full overflow-y-auto bg-background">
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};
export default MainLayout;
