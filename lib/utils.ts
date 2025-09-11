import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extracts the raw Convex id from a possibly slugged id like "<id>-title".
 * Accepts string | string[] | null | undefined (as Next params may be)
 * and returns string | undefined.
 */
export function sanitizeId(value?: string | string[] | null) {
  if (!value) return undefined
  const id = Array.isArray(value) ? value[0] : value
  if (typeof id !== 'string') return undefined
  return id.includes('-') ? id.split('-')[0] : id
}
