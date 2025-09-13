"use client";

import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React from "react";
import { useParams } from "next/navigation";
import { sanitizeId } from '@/lib/utils';
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import Editor from "@/components/editor";
import { update } from "@/convex/forms";

const FormIdPage = () => {
  const params = useParams();
  const safeId = sanitizeId(params.formId);
  const document = useQuery(api.forms.getById, safeId ? { documentId: safeId as Id<"forms"> } : "skip");
  const update = useMutation(api.forms.update);
  const onChange = (content: string) => {
    update({
      id: safeId as Id<"forms">,
      content,
    });
  };

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
    )
    
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <Cover preview url={document.coverImage} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar preview initialData={document} />
        <Editor
          editable={false}
          onChange={onChange}
          initialContent={document.content}
        />
      </div>
    </div>
  );
};

export default FormIdPage;
