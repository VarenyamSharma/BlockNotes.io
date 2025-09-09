"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface BannerProps {
  documentId: Id<"forms">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();
  const remove = useMutation(api.forms.remove);
  const restore = useMutation(api.forms.restore);

  const onRemove = () => {
    const promise = remove({ documentId }).then(() => {
      router.push("/forms");
    });

    toast.promise(promise, {
      loading: "Deleting form...",
      success: "Form Deleted",
      error: "Failed to delete form",
    });
  };

  const onRestore = () => {
    const promise = restore({ documentId });
    toast.promise(promise, {
      loading: "Restoring form...",
      success: "Form Restored",
      error: "Failed to restore form",
    });
  };

  const buttonClasses =
    "border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal";

  return (
    <section
      role="alert"
      className="w-full bg-rose-500 text-center text-sm p-2 text-white flex gap-x-2 justify-center"
    >
      <p>This form is in the Trash.</p>

      {/* Restore Button */}
      <Button
        size="sm"
        onClick={onRestore}
        variant="outline"
        className={buttonClasses}
      >
        Restore Form
      </Button>

      {/* Delete Button */}
      <ConfirmModal onConfirm={onRemove}>
        <Button
          size="sm"
          variant="outline"
          className={`${buttonClasses} hover:bg-red-600`}
        >
          Delete Form
        </Button>
      </ConfirmModal>
    </section>
  );
};
