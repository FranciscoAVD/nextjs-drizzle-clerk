import { db } from "@/db/db";
import { authors } from "@/db/schema";
import type { Library } from "@/db/types";
import { tryCatch } from "@/lib/utils";
import { eq } from "drizzle-orm";

export async function updateAuthor(
  id: Library.Author.Select["id"],
  update: Library.Author.Update,
): Promise<Library.Author.Select | null> {
  const [data, error] = await tryCatch(
    db
      .update(authors)
      .set(update)
      .where(eq(authors.id, id))
      .returning(),
  );
  if (error) {
    console.error(`[DB] Updating author id:${id}. ${error}`);
    return null;
  }

  return data[0];
}
