import { db } from "@/db/db";
import type { Library } from "@/db/types";
import { tryCatch } from "@/lib/utils";

export async function getAuthors(): Promise<
  Library.Author.Select[] | null
> {
  const [data, error] = await tryCatch(db.query.authors.findMany());

  if (error) {
    console.error(`[DB] Querying authors. ${error}`);
    return null;
  }

  return data;
}
