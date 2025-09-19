"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Spinner } from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent, useState } from "react";
import { toast } from "sonner";

export const Trashbox = () => {
  const router = useRouter();
  const params = useParams();
  const documents = useQuery(api.forms.getTrash);
  const restore = useMutation(api.forms.restore);
  const remove = useMutation(api.forms.remove);

  const [search, setSearch] = useState("");

  const filterDocuments = documents?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const onClick = (documentId: string) => {
    router.push(`/forms/${documentId}`);
  };

  const onRestore = (
    event: MouseEvent<HTMLDivElement>,
    documentId: Id<"forms">
  ) => {
    event.stopPropagation();
    const promise = restore({ documentId });

    toast.promise(promise, {
      loading: "Restoring form...",
      success: "Form restored",
      error: "Error restoring form",
    });
  };

  const onRemove = (documentId: Id<"forms">) => {
    const promise = remove({ documentId });

    toast.promise(promise, {
      loading: "Deleting form...",
      success: "Form deleted",
      error: "Error deleting form",
    });

    if (params.formId === documentId) {
      router.push(`/forms`);
    }
  };

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-1 px-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Search"
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground">
          No forms in trashbox
        </p>

        {filterDocuments?.map((document) => (
          <div
            key={document._id}
            onClick={() => onClick(document._id)}
            role="button"
            className="text-sm rounded-sm w-full hover:bg-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{document.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, document._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-primary/20"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onRemove(document._id)}>
                <div
                  role="button"
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-sm p-2 hover:bg-primary/20"
                >
                  <Trash className="h-4 w-4 text-red-500" />
                </div>
              </ConfirmModal>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};