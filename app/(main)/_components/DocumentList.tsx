"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";

interface DocumentListProps {
  parentDocumentId?: Id<"forms"> | null;
  level?: number;
  data?: Doc<"forms">[];
}

const DocumentList = ({
  parentDocumentId = null,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [documentId]: !prevExpanded[documentId],
    }));
  };

  const documents = useQuery(api.forms.getSidebar, {
    parentDocument: parentDocumentId ?? undefined,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/forms/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      {documents.map((doc) => (
        <div key={doc._id}>
          <Item
            id={doc._id}
            level={level}
            onClick={() => onRedirect(doc._id)}
            label={doc.title}
            icon={FileIcon}
            formIcon={doc.icon}
            active={params.formId === doc._id}
            onExpand={() => onExpand(doc._id)}
            expanded={expanded[doc._id]}
          />

          {expanded[doc._id] && (
            <DocumentList
              parentDocumentId={doc._id}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
