"use client";

import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React, { useRef } from "react";
import { useParams } from "next/navigation";
import { sanitizeId } from '@/lib/utils';
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";

const FormIdPage = () => {
  const params = useParams();
  const safeId = sanitizeId(params.formId);
  const contentRef = useRef<HTMLDivElement>(null);
  const document = useQuery(api.forms.getById, safeId ? { documentId: safeId as Id<"forms"> } : "skip");

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
        <Toolbar preview initialData={document} />
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