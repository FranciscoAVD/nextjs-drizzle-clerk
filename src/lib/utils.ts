import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function tryCatch<T>(
  fn: (() => Promise<T>) | Promise<T>,
): Promise<
  { data: T; error: null } | { data: null; error: Error }
> {
  try {
    let res: T;
    if (typeof fn === "function") {
      res = await fn();
    } else {
      res = await fn;
    }
    return { data: res, error: null };
  } catch (err) {
    return {
      data: null,
      error:
        err instanceof Error ? err : Error(String(err)),
    };
  }
}
