import {
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { books, authors } from "@/db/schema";

const insertAuthorSchema = createInsertSchema(authors);
const insertBookSchema = createInsertSchema(books);

const updateAuthorSchema = createUpdateSchema(authors);
const updateBookSchema = createUpdateSchema(books);

export {
  insertAuthorSchema,
  insertBookSchema,
  updateAuthorSchema,
  updateBookSchema,
};
