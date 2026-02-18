import { db } from "@/db/db";
import { authors } from "@/db/schema";
import type { Library } from "@/db/types";
import { tryCatch } from "@/lib/utils";

export async function addAuthor(
  author: Library.Author.Insert,
): Promise<Library.Author.Select["id"] | null> {
  const [data, error] = await tryCatch(
    db.insert(authors).values(author).returning({ id: authors.id }),
  );

  if (error) {
    console.error(`[DB] Inserting into authors. ${error}`);
    return null;
  }

  return data[0].id;
}
