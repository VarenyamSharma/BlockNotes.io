"use client";

import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/use-search";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { File } from "lucide-react";

export const SearchCommand = () => {
  const { user } = useUser();
  const router = useRouter();
  const documents = useQuery(api.forms.getSearch);
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const down = (e:KeyboardEvent) => {
        if(e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            toggle();
        }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);

  }, [toggle]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const onSelect = (id: string) => {
    router.push(`/forms/${id}`);
    onClose();
  };

  return (
  <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search forms..." />
      <CommandList>
        <CommandEmpty>No result Found</CommandEmpty>
        <CommandGroup heading="Forms">
          {documents?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={onSelect}
            >
              {doc.icon ? (
                <p className=" mr-2 text-[18]px">{doc.icon}</p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}

              <span>
                {doc.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
