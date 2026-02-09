//DOCS: https://orm.drizzle.team/docs/relations-v2
import * as schema from "@/db/schema";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (r) => ({
  books: {
    author: r.one.authors({
      from: r.books.authorId,
      to: r.authors.id,
    }),
  },
  authors: {
    books: r.many.books(),
  },
}));
