"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import React, { useRef, useState } from "react";

interface titleProps {
  initialData: Doc<"forms">;
}

export const Title = ({ initialData }: titleProps) => {
  const update = useMutation(api.forms.update);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(initialData.title || "Untitled");

  const enableInput =() =>{
    setTitle(initialData.title)
    setIsEditing(true)
    setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
  }, 0)
  }

  const disableInput = () => {
    setIsEditing(false)
  }

  const onChange =(event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
    update({
        id: initialData._id,
        title: event.target.value || "untitled"
    })
  }
  return (
    <div className="flex items-center gap-x-1">
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {isEditing ? (
        <Input className="h-7 px-2 focus-visible:ring-transparent" />
      ) : (
        <Button
          onClick={() => {}}
          variant="ghost"
          size="sm"
          className="font-norml h-auto p-1"
        >
          <span className="truncates">{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};
