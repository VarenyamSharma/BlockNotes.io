"use client";

import React, { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X, FileText, Download } from "lucide-react";
import { useMutation, useAction } from "convex/react";
import TextAreaAutoSize from "react-textarea-autosize";
import { toast } from "sonner";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { IconPicker } from "./icon-picker";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Spinner } from "./spinner";

interface ToolbarProps {
  initialData: Doc<"forms">;
  preview?: boolean;
  onExport?: () => void;
}

export function Toolbar({ initialData, preview, onExport }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const coverImage = useCoverImage();
  const update = useMutation(api.forms.update);
  const removeIcon = useMutation(api.forms.removeIcon);
  const summarize = useAction(api.ai.summarize);

  const [summary, setSummary] = useState("");
  const [isSummarizing, setIsSummarizing] = useState(false);

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => setIsEditing(false);

  const onInput = (value: string) => {
    setValue(value);
    update({
      id: initialData._id,
      title: value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      disableInput();
    }
  };

  const onIconSelect = (icon: string) => {
    update({
      id: initialData._id,
      icon,
    });
  };

  const onRemoveIcon = () => {
    removeIcon({
      id: initialData._id,
    });
  };

  const onSummarize = () => {
    if (!initialData.content || initialData.content.trim() === "") {
      toast.error("There is no content to summarize.");
      return;
    }
    setIsSummarizing(true);
    const promise = summarize({ content: initialData.content });

    toast.promise(promise, {
      loading: "Generating summary with AI...",
      success: (summary) => {
        setSummary(summary);
        setIsSummarizing(false);
        return "Summary generated!";
      },
      error: (err) => {
        setIsSummarizing(false);
        return `Error: ${err.message || "Failed to summarize."}`;
      },
    });
  };

  return (
    <div className="pl-[54px] group relative">
      {!!initialData.icon && !preview && (
        <div className="flex gap-x-2 items-center group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs"
            variant="outline"
            size="icon"
            onClick={onRemoveIcon}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
      {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">{initialData.icon}</p>
      )}

      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-2 py-4">
        {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button
              className="text-muted-foreground text-xs"
              variant="outline"
              size="sm"
            >
              <Smile className="w-4 h-4 mr-2" />
              Add icon
            </Button>
          </IconPicker>
        )}
        {!initialData.coverImage && !preview && (
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={coverImage.onOpen}
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Add cover
          </Button>
        )}
      </div>

      {preview && (
        <div id="preview-action-buttons" className="flex items-center gap-x-2 py-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="text-muted-foreground text-xs"
                variant="outline"
                size="sm"
                onClick={onSummarize}
                disabled={isSummarizing}
              >
                <FileText className="w-4 h-4 mr-2" />
                {isSummarizing ? "Generating..." : "Summarize with AI"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>AI Generated Summary</DialogTitle>
              </DialogHeader>
              {isSummarizing ? (
                <div className="flex items-center justify-center p-6">
                  <Spinner size="lg" />
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{summary || "No summary generated yet."}</p>
              )}
            </DialogContent>
          </Dialog>
          <Button
            onClick={onExport}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Export to PDF
          </Button>
        </div>
      )}

      {isEditing && !preview ? (
        <TextAreaAutoSize
          className="text-5xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
          ref={inputRef}
          onBlur={disableInput}
          onKeyDown={onKeyDown}
          value={value}
          onChange={(e) => onInput(e.target.value)}
        />
      ) : (
        <div
          className="pb-[11.5px] text-5xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]"
          onClick={enableInput}
        >
          {initialData.title}
        </div>
      )}
    </div>
  );
}

