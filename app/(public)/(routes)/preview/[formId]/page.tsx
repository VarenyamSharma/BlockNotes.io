"use client";

import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { sanitizeId, exportToPdf } from '@/lib/utils';
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";
import { toast } from "sonner";

const FormIdPage = () => {
  const params = useParams();
  const safeId = sanitizeId(params.formId);
  const contentRef = useRef<HTMLDivElement>(null);
  const document = useQuery(api.forms.getById, safeId ? { documentId: safeId as Id<"forms"> } : "skip");

  /**
   * Handles the PDF export process. It captures the content referenced by `contentRef`,
   * temporarily hides the action buttons, triggers the PDF generation, and restores
   * the button visibility afterward.
   */
  const handleExport = () => {
    if (contentRef.current && document) {
      const elementToExport = contentRef.current;
      const buttons = elementToExport.querySelector('#preview-action-buttons') as HTMLElement | null;

      // Temporarily hide the buttons during PDF generation
      if (buttons) {
        buttons.style.display = 'none';
      }

      const promise = exportToPdf(elementToExport, document.title).finally(() => {
        // Show the buttons again after export is complete or if it fails
        if (buttons) {
          buttons.style.display = 'flex';
        }
      });
      
      toast.promise(promise, {
        loading: "Exporting to PDF...",
        success: "Note exported successfully!",
        error: "Failed to export note.",
      });
    }
  };

  // Display a loading skeleton while the document is being fetched.
  if (document === undefined) {
    return (
      <div>
         <Cover.Skeleton  />
         <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-6 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
         </div>
      </div>
    );
  }

  // Display a "Not Found" message if the document does not exist.
  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      {/* The Cover component is outside the ref, so it won't be exported to the PDF. */}
      <Cover preview url={document.coverImage} />

      {/* The contentRef wraps only the elements that should be included in the PDF. */}
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto" ref={contentRef}>
        <Toolbar preview initialData={document} onExport={handleExport} />
        <Editor
          editable={false}
          onChange={() => {}} // No-op on change in preview mode
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default FormIdPage;

