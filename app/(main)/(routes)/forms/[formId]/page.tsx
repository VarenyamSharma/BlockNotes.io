"use client";

import { Toolbar } from "@/components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
interface DocumentIdPageProps {
  params: {
    documentId: Id<"forms">;
  };
}

const formIdPage = ({ params }: DocumentIdPageProps) => {
  const document = useQuery(api.forms.getById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
  <div className="pb-40">
    <div className="md:max-w-3xl">
      <Toolbar initialData={document} />
    </div>
  </div>);
};

export default formIdPage;
