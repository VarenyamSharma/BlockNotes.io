"use client";

import { PartialBlock } from "@blocknote/core";
import { BlockNoteViewRaw, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import { useTheme } from "next-themes";
import { useEdgeStore } from "@/lib/edgestore";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({ onChange, initialContent, editable }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ file });
    return response.url;
  };

  let parsedContent: PartialBlock[] | undefined;
  try {
    parsedContent = initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined;
  } catch (e) {
    console.error("Invalid initial content JSON:", e);
  }

  // ❌ don't put `editable` here
  const editor = useBlockNote({
    initialContent: parsedContent,
    uploadFile: handleUpload,
  });

  return (
    <div className="border rounded-lg p-2">
      <BlockNoteViewRaw
        editor={editor}
        editable={editable}  // ✅ put it here
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => {
          onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        }}
      />
    </div>
  );
}

export default Editor;
