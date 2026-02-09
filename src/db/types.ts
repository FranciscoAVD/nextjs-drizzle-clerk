import { authors, books } from "@/db/schema";

export namespace Library {
  export namespace Author {
    type Select = typeof authors.$inferSelect;
    type Insert = typeof authors.$inferInsert;
  }
  export namespace Book {
    type Select = typeof books.$inferSelect;
    type Insert = typeof books.$inferInsert;
  }
}
