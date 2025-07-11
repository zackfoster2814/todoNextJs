import { Hono } from "hono";
import { db } from "../db";
import { todos } from "../schema/todo";
import { eq, sql } from "drizzle-orm";

export const todoRoute = new Hono();

todoRoute.get("/", async (c) => {
  const result = await db.execute(sql`SELECT * FROM todo ORDER BY id ASC`);
  return c.json(result);
});

todoRoute.post("/", async (c) => {
  const body = await c.req.json();
  const { content } = body;
  if (!content) return c.text("Missing content", 400);

  const inserted = await db.insert(todos).values({ content }).returning();
  return c.json(inserted[0]);
});

todoRoute.put("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { content, done } = await c.req.json();

  const updated = await db
    .update(todos)
    .set({ content, done })
    .where(eq(todos.id, id))
    .returning();

  return c.json(updated[0]);
});

todoRoute.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  await db.delete(todos).where(eq(todos.id, id));
  return c.text("Deleted");
});

todoRoute.get("/deleteAll", async (c) => {
  await db.execute(sql`TRUNCATE todo`);
  return c.text("All todos deleted");
});

todoRoute.patch("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { done } = await c.req.json();

  await db.update(todos).set({ done }).where(eq(todos.id, id));
  return c.text("Updated");
});
