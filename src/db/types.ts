import { authors, books } from "@/db/schema";

type Author = typeof authors.$inferSelect;
type Book = typeof books.$inferSelect;

type NewAuthor = typeof authors.$inferInsert;
type NewBook = typeof books.$inferInsert;

export type { Author, NewAuthor, Book, NewBook };
