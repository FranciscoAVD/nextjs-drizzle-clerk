import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Wraps a promise or an async function and returns a result tuple.
 *
 * @template T - The type of the value returned by the promise.
 * @param {(() => Promise<T>) | Promise<T>} fn - An async function or a promise to execute.
 * @returns {Promise<[T, null] | [null, Error]>} A promise that resolves to a tuple:
 * - On success: `[data, null]`
 * - On failure: `[null, Error]` (Non-error exceptions are caught and converted to Error objects)
 *
 * @example
 * ```ts
 * const [data, err] = await tryCatch(fetchData());
 * if (err) {
 *   console.error("Failed to fetch:", err.message);
 *   return;
 * }
 * console.log("Success:", data);
 * ```
 */
export async function tryCatch<T>(
  fn: (() => Promise<T>) | Promise<T>,
): Promise<[T, null] | [null, Error]> {
  try {
    let res: T = await (typeof fn === "function"
      ? fn()
      : fn);
    return [res, null];
  } catch (err) {
    return [
      null,
      err instanceof Error ? err : new Error(String(err)),
    ];
  }
}
