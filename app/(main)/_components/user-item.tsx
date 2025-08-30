"use client";

import { ChevronsLeftRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export function UserItem() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className="flex items-center text-sm p-3 w-full hover:bg-primary/5"
          role="button"
        >
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <Avatar className="w-5 h-5">
              <AvatarImage src={user.imageUrl} />
              <AvatarFallback>
                {user.firstName?.[0] ?? "U"}
              </AvatarFallback>
            </Avatar>
            <span className="text-start font-medium line-clamp-1">
              {user.fullName}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground w-4 h-4" />
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80"
        align="start"
        alignOffset={11}
        forceMount
      >
        {/* Top user info */}
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <div className="flex gap-x-2 items-center">
            <div className="rounded-md bg-secondary p-1">
              <Avatar className="w-8 h-8">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>
                  {user.firstName?.[0] ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user.fullName}
              </p>
              <p className="text-xs text-muted-foreground">
                Signed in as {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Sign out option */}
        <DropdownMenuItem
          className="w-full cursor-pointer text-muted-foreground"
          asChild
        >
          <SignOutButton>Log out</SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
