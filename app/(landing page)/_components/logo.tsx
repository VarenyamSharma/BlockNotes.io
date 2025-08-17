import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={200}
          height={200}
          className="dark:hidden"
        />
         <Image
          src="/logo-dark.svg"
          alt="Logo"
          width={200}
          height={200}
          className="hidden dark:block"
        />

        </div>
  );
};

export default Logo;
