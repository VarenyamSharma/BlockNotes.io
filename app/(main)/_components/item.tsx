"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery } from "convex/react";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  MoreHorizontal,
  MoreVertical,
  Plus,
  Trash,
  ClipboardList,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import { QuizResults } from "@/app/(main)/_components/QuizResults";

interface ItemProps {
  id?: Id<"forms">;
  formIcon?: string;
  active?: boolean;
  expanded?: boolean;
  isSearch?: boolean;
  level?: number;
  onExpand?: () => void;
  label: string;
  onClick?: () => void;
  icon: LucideIcon;
}

export const Item = ({
  label,
  onClick,
  icon: Icon,
  id,
  active,
  formIcon,
  isSearch,
  level = 0,
  onExpand,
  expanded,
}: ItemProps) => {

  const handleExpand = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    onExpand?.();
  };

  const Chevronicon = expanded ? ChevronDown : ChevronRight;
  const archive = useMutation(api.forms.archive);
  const router = useRouter();
  const [isResponsesDialogOpen, setIsResponsesDialogOpen] = useState(false);
  
  // Get document data to check if it's published
  const document = useQuery(
    api.forms.getById,
    id ? { documentId: id } : "skip"
  );

  const onArchive = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
    if (!id) return;
    const promise = archive({ documentId: id });
    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Note moved to trash",
      error: "Error archiving note ",
    });

    router.push("/forms");
  };

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className={cn(
        "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium",
        active && "bg-primary/5 text-primary "
      )}
    >
      {!!id && (
        <div
          role="button"
          className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 flex  mr-1"
          onClick={handleExpand}
        >
          <Chevronicon className="h-4 w-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {formIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">{formIcon}</div>
      ) : (
        <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
      )}

      <span className="truncate">{label}</span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">CTRL</span>K
        </kbd>
      )}

      {!!id && (
        <div className="ml-auto flex items-center gap-x-2">
          {document?.isPublished && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div
                  role="button"
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48" onClick={(e) => e.stopPropagation()}>
                <DropdownMenuItem onClick={() => setIsResponsesDialogOpen(true)}>
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Responses
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <div 
            role="button"
            onClick={onArchive}
            className="opacity-0 group-hover:opacity-100 h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 p-1"
          >
            <Trash className="h-4 w-4 text-red-500" />
          </div> 
        </div>
      )}

      {/* Quiz Responses Dialog */}
      {document?.isPublished && id && (
        <Dialog open={isResponsesDialogOpen} onOpenChange={setIsResponsesDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Quiz Responses</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <QuizResults formId={id} hideTitle={true} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div
      style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      className="flex gap-x-2 py-[3px]"
    >
      <Skeleton className="h-4 w-4 " />
      <Skeleton className="h-4 w-[30%] " />
    </div>
  );
};
