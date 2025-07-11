import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";

export const todos = pgTable("todo", {
  id: serial("id").primaryKey(),
  content: text("content"),
  done: boolean("done").default(false),
});
