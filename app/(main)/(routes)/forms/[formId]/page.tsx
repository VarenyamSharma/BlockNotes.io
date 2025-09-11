"use client";

import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { useParams } from "next/navigation";
import { sanitizeId } from '@/lib/utils';

const FormIdPage = () => {
  const params = useParams();
  const safeId = sanitizeId(params.formId);
  const document = useQuery(api.forms.getById, safeId ? { documentId: safeId as Id<"forms"> } : "skip");

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="pb-40">
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default FormIdPage;
