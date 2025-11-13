import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";
import { error } from "console";

export const archive = mutation({
  args: {
    documentId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingForm = await ctx.db.get(args.documentId);
    if (!existingForm) throw new Error("Form not found");
    if (existingForm.userId !== userId) throw new Error("Not authorized");

    await ctx.db.patch(args.documentId, { isArchived: true });

    const updatedForm = await ctx.db.get(args.documentId);
    return updatedForm;
  },
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("forms")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const form = await ctx.db
      .query("forms")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return form;
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("forms")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const form = await ctx.db.insert("forms", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return form;
  },
});

export const getTrash = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const TrashDocument = await ctx.db
      .query("forms")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return TrashDocument;
  },
});

export const restore = mutation({
  args: {
    documentId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;
    const existingForm = await ctx.db.get(args.documentId);
    if (!existingForm) throw new Error("Form not found");
    if (existingForm.userId !== userId) throw new Error("Not authorized");

    const options: Partial<Doc<"forms">> = { isArchived: false };

    if (existingForm.parentDocument) {
      const parentForm = await ctx.db.get(existingForm.parentDocument);
      if (parentForm?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    await ctx.db.patch(args.documentId, options);

    return existingForm;
  },
});

export const remove = mutation({
  args: {
    documentId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const userId = identity.subject;

    const existingForm = await ctx.db.get(args.documentId);
    if (!existingForm) throw new Error("Form not found");
    if (existingForm.userId !== userId) throw new Error("Not authorized");

    const document = await ctx.db.delete(args.documentId);
    return document;
  },
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const documents = await ctx.db
      .query("forms")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const getById = query({
  args: { documentId: v.id("forms") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    const document = await ctx.db.get(args.documentId);

    // If the document doesn't exist, return null so callers can handle
    // the not-found case without the function throwing an uncaught error.
    if (!document) {
      return null;
    }

    if (document.isPublished && !document.isArchived) {
      return document;
    }

    if (!identity) {
      throw new Error("not authenticated");
    }

    const userId = identity.subject;

    if (document.userId !== userId) {
      throw new Error("unauthorized");
    }

    return document;
  },
});

export const update = mutation({
  args: {
    id: v.id("forms"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthenticated");
    }

    const userid = identity.subject;

    const { id, ...rest } = args;

    const existingForm = await ctx.db.get(args.id);

    if (!existingForm) {
      throw new Error("not found");
    }

    if (existingForm.userId !== userid) {
      throw new Error("not authorized");
    }

    const document = await ctx.db.patch(args.id, {
      ...rest,
    });

    return document;
  },
});


export const removeIcon = mutation({
  args: {
    id: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingForm = await ctx.db.get(args.id);
    if (!existingForm) throw new Error("Form not found");
    if (existingForm.userId !== userId) throw new Error("Not authorized");

    await ctx.db.patch(args.id, { icon: undefined });

    return existingForm;
  },
});

export const removeImage = mutation({
  args: {
    id: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;

    const existingForm = await ctx.db.get(args.id);
    if (!existingForm) throw new Error("Form not found");
    if (existingForm.userId !== userId) throw new Error("Not authorized");
    await ctx.db.patch(args.id, { coverImage: undefined });
    return existingForm;
  },
});

export const saveQuizResponse = mutation({
  args: {
    formId: v.id("forms"),
    name: v.string(),
    email: v.string(),
    score: v.number(),
    total: v.number(),
  },
  handler: async (ctx, args) => {
    // Verify the form exists and is published
    const form = await ctx.db.get(args.formId);
    if (!form) {
      throw new Error("Form not found");
    }
    if (!form.isPublished) {
      throw new Error("Form is not published");
    }

    // Save the quiz response
    const response = await ctx.db.insert("quizResponses", {
      formId: args.formId,
      name: args.name,
      email: args.email,
      score: args.score,
      total: args.total,
    });

    return response;
  },
});

export const getQuizResponses = query({
  args: {
    formId: v.id("forms"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    // Verify the form exists and user owns it
    const form = await ctx.db.get(args.formId);
    if (!form) {
      throw new Error("Form not found");
    }
    if (form.userId !== userId) {
      throw new Error("Not authorized");
    }

    // Get all responses for this form
    const responses = await ctx.db
      .query("quizResponses")
      .withIndex("by_form", (q) => q.eq("formId", args.formId))
      .order("desc")
      .collect();

    return responses;
  },
});