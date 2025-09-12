"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useOrigin } from "@/hooks/use-origin";
import { useMutation } from "convex/react";
import { Check, Copy, Globe } from "lucide-react";
import { use, useState } from "react";
import { toast } from "sonner";

interface PublishProps {
  initialData: Doc<"forms">;
}

export const Publish = ({ initialData }: PublishProps) => {
  const origin = useOrigin();
  const update = useMutation(api.forms.update);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onPublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: true,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "Publishing...",
      success: "Form published!",
      error: "Error publishing the form",
    });
  };

  const onUnpublish = () => {
    setIsSubmitting(true);

    const promise = update({
      id: initialData._id,
      isPublished: false,
    }).finally(() => setIsSubmitting(false));

    toast.promise(promise, {
      loading: "UnPublishing...",
      success: "Form unpublished!",
      error: "Error unpublishing the form",
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const url = `${origin}/preview/${initialData._id}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Publish
          {initialData.isPublished && (
            <Globe className="text-sky-500 w-4 h-4 ml-2" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        {initialData.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
                <Globe className="w-4 h-4 text-sky-500 animate-pulse" />
                <p className="text-xs fornt-medium text-sky-500">
                    This Form is live on web
                </p>
            </div>
            <div className="flex items-center">
                <Input 
                className="flex-1 px-2 text-xs border rounded-l-md h-8 bg-muted truncate"
                value={url}
                disabled
                />
                <Button
                onClick={onCopy}
                disabled={copied}>
                    {copied ? (
                        <Check  className="h-4 w-4"/>
                    ) : (
                        <Copy className="h-4 w-4"/>
                    )}
                </Button>
            </div>
            <Button
            size="sm"
            className="w-full text-sm"
            disabled={isSubmitting}
            onClick={onUnpublish}
            >
                UnPublish
            </Button>
        </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-center mb-2">Publish this Form</p>
            <span className="text-xs text-muted-foreground mb-4">
              Share your Form with others
            </span>
            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-sm"
              size={"sm"}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
