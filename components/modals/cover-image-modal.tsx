"use client";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { SingleImageDropzone } from "../single-image-dropzone";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { sanitizeId } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import { on } from "events";

export const CoverImageModal = () => {
  const coverImage = useCoverImage();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { edgestore } = useEdgeStore();
  const update = useMutation(api.forms.update);
  const params = useParams();
  const safeId = sanitizeId(params.formId);

  const onChange = async (file?: File) => {
    if (file) {
      setFile(file);
      setIsSubmitting(true);

      const res = await edgestore.publicFiles.upload({
        file,
        // you can also specify a custom path
      });

      if (!safeId) {
        // If we don't have a valid id, stop and close the modal.
        setIsSubmitting(false);
        onClose();
        return;
      }

      await update({
        id: safeId as Id<"forms">,
        coverImage: res.url,
      });

      onClose();
    }
  };

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  };

  return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Cover Image
          </DialogTitle>
        </DialogHeader>
        <SingleImageDropzone
          className="w-full outline-none"
          disabled={isSubmitting}
          onChange={onChange}
          value={file}
        />
      </DialogContent>
    </Dialog>
  );
};
