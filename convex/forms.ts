import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

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

    if(existingForm.parentDocument) {
      const parentForm = await ctx.db.get(existingForm.parentDocument);
      if(parentForm?.isArchived) {
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
  }
});

export const getSearch = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const documents = await ctx.db
      .query("forms")
      .withIndex("by_user", (q)=> q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), false),
    )
    .order("desc")
    .collect()

    return documents;
  }

});