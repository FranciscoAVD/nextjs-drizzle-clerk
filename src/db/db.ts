import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "@/db/schema";
import { env } from "@/env";

const db = drizzle(env.DATABASE_URL, {
  relations,
});

db.query.books.findMany({
  with: {
    author: true,
  },
});
