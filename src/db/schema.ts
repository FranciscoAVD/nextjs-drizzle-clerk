import { defineRelations } from "drizzle-orm";
import {
  pgTable,
  integer,
  timestamp,
  varchar,
  text,
  index,
} from "drizzle-orm/pg-core";

//-------------Reusable-------------
const id = integer("id")
  .primaryKey()
  .generatedAlwaysAsIdentity();
const createdAt = timestamp("created_at", {
  withTimezone: true,
  mode: "string",
})
  .notNull()
  .defaultNow();
const updatedAt = timestamp("updated_at", {
  withTimezone: true,
  mode: "string",
})
  .notNull()
  .defaultNow();

//-------------Tables-------------
const authors = pgTable("table", {
  id,
  name: varchar("name", { length: 100 }).notNull(),
  createdAt,
  updatedAt,
});

const books = pgTable(
  "books",
  {
    id,
    authorId: integer("author")
      .references(() => authors.id, { onDelete: "cascade" })
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    genre: varchar("genre", { length: 100 }).notNull(),
    description: text("description").notNull(),
    createdAt,
    updatedAt,
  },
  (t) => [index("books_authorId_idx").on(t.authorId)],
);

export { authors, books };

//-------------Relations-------------
export const relations = defineRelations(
  { authors, books },
  (r) => ({
    books: {
      author: r.one.authors({
        from: r.books.authorId,
        to: r.authors.id,
      }),
    },
    authors: {
      books: r.many.books(),
    },
  }),
);
