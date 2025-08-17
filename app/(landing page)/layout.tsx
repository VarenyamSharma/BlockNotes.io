import React from 'react'
import Navbar from './_components/Navbar';

type LandingLayoutProps = {
  children: React.ReactNode;
};

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <div className="h-full">
       <Navbar /> 
      <main className="h-full pt-40">
        {children}
      </main>
    </div>
  );
}
