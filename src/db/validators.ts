import { Table } from "drizzle-orm";
import {
  createInsertSchema,
  createUpdateSchema,
} from "drizzle-zod";
import * as schema from "@/db/schema";

type Validators = {
  [K in keyof typeof schema as (typeof schema)[K] extends Table
    ? K
    : never]: {
    insert: ReturnType<
      typeof createInsertSchema<(typeof schema)[K]>
    >;
    update: ReturnType<
      typeof createInsertSchema<(typeof schema)[K]>
    >;
  };
};

const tempValidators: Record<string, any> = {};

for (const [key, table] of Object.entries(schema)) {
  if (table instanceof Table) {
    tempValidators[key] = {
      insert: createInsertSchema(table),
      update: createUpdateSchema(table),
    };
  }
}

const validators = tempValidators as Validators;

export { validators };
