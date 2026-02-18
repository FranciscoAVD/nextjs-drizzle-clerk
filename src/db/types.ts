import { authors, books } from "@/db/schema";
import { validators } from "./validators";

export namespace Library {
  export namespace Author {
    export type Select = typeof authors.$inferSelect;
    export type Insert = typeof authors.$inferInsert;
    export type Update = Partial<Insert>;
  }
  export namespace Book {
    export type Select = typeof books.$inferSelect;
    export type Insert = typeof books.$inferInsert;
    export type Update = Partial<Insert>;
  }
}
