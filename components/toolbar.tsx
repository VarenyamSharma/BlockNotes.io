"use client";

import React, { ElementRef, useRef, useState } from "react";
import { ImageIcon, Smile, X, Network, FileText, ClipboardList } from "lucide-react";
import { useMutation, useAction } from "convex/react";
import TextAreaAutoSize from "react-textarea-autosize";
import { toast } from "sonner";
import Link from "next/link";

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
} from "./ui/dialog";
import { Spinner } from "./spinner";
import { extractTextFromBlockNote } from "@/lib/blocknote-utils";

interface ToolbarProps {
  initialData: Doc<"forms">;
  preview?: boolean;
}

export function Toolbar({ initialData, preview }: ToolbarProps) {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.title);

  const coverImage = useCoverImage();
  const update = useMutation(api.forms.update);
  const removeIcon = useMutation(api.forms.removeIcon);
  const generateMindMap = useAction(api.ai.generateMindMap);
  const summarize = useAction(api.ai.summarize);

  const [mindMap, setMindMap] = useState<{
    centralTopic: string;
    branches: Array<{ topic: string; subtopics: string[] }>;
  } | null>(null);
  const [isGeneratingMindMap, setIsGeneratingMindMap] = useState(false);
  const [isMindMapDialogOpen, setIsMindMapDialogOpen] = useState(false);

  const [summary, setSummary] = useState<string>("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);

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

  const onGenerateMindMap = async () => {
    if (!initialData.content || initialData.content.trim() === "") {
      toast.error("There is no content to generate a mind map from.");
      return;
    }

    setIsGeneratingMindMap(true);
    setIsMindMapDialogOpen(true);

    try {
      // Extract plain text from BlockNote content
      const textContent = extractTextFromBlockNote(initialData.content);

      if (!textContent || textContent.trim() === "") {
        toast.error("Could not extract text from the note content.");
        setIsGeneratingMindMap(false);
        return;
      }

      // Generate mind map using AI
      const mindMapData = await generateMindMap({ content: textContent });
      setMindMap(mindMapData);
      setIsGeneratingMindMap(false);
    } catch (error) {
      console.error("Error generating mind map:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate mind map. Please try again."
      );
      setIsGeneratingMindMap(false);
    }
  };

  const onGenerateSummary = async () => {
    if (!initialData.content || initialData.content.trim() === "") {
      toast.error("There is no content to summarize.");
      return;
    }

    setIsGeneratingSummary(true);
    setIsSummaryDialogOpen(true);

    try {
      // Extract plain text from BlockNote content
      const textContent = extractTextFromBlockNote(initialData.content);

      if (!textContent || textContent.trim() === "") {
        toast.error("Could not extract text from the note content.");
        setIsGeneratingSummary(false);
        return;
      }

      // Generate summary using AI
      const summaryText = await summarize({ content: textContent });
      setSummary(summaryText);
      setIsGeneratingSummary(false);
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate summary. Please try again."
      );
      setIsGeneratingSummary(false);
    }
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
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={onGenerateSummary}
            disabled={isGeneratingSummary}
          >
            <FileText className="w-4 h-4 mr-2" />
            {isGeneratingSummary ? "Generating..." : "Generate Summary"}
          </Button>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            onClick={onGenerateMindMap}
            disabled={isGeneratingMindMap}
          >
            <Network className="w-4 h-4 mr-2" />
            {isGeneratingMindMap ? "Generating..." : "Generate Mind Map"}
          </Button>
          <Button
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
            asChild
          >
            <Link href={`/quiz/${initialData._id}`}>
              <ClipboardList className="w-4 h-4 mr-2" />
              Give Quiz
            </Link>
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

      {/* Summary Dialog */}
      <Dialog open={isSummaryDialogOpen} onOpenChange={setIsSummaryDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Generated Summary</DialogTitle>
          </DialogHeader>
          {isGeneratingSummary ? (
            <div className="flex items-center justify-center p-12">
              <Spinner size="lg" />
            </div>
          ) : summary ? (
            <div className="p-4">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{summary}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center p-6">
              No summary generated yet.
            </p>
          )}
        </DialogContent>
      </Dialog>

      {/* Mind Map Dialog */}
      <Dialog open={isMindMapDialogOpen} onOpenChange={setIsMindMapDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Mind Map</DialogTitle>
          </DialogHeader>
          {isGeneratingMindMap ? (
            <div className="flex items-center justify-center p-12">
              <Spinner size="lg" />
            </div>
          ) : mindMap ? (
            <div className="space-y-4">
              <div className="text-center p-4 bg-primary/10 rounded-lg">
                <h3 className="text-lg font-semibold">{mindMap.centralTopic}</h3>
              </div>
              <div className="space-y-3">
                {mindMap.branches.map((branch, branchIndex) => (
                  <div
                    key={branchIndex}
                    className="p-4 border rounded-lg bg-muted/50"
                  >
                    <h4 className="text-sm font-semibold mb-2">{branch.topic}</h4>
                    <ul className="space-y-1 ml-4">
                      {branch.subtopics.map((subtopic, subIndex) => (
                        <li key={subIndex} className="text-sm text-muted-foreground">
                          • {subtopic}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center p-6">
              No mind map generated yet.
            </p>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
}