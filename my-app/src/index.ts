import { Hono } from "hono";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { todoRoute } from "./routes/todo";
import { cors } from "hono/cors";

const app = new Hono();
const port = 8080;
const hostname = "0.0.0.0";

app.use(
  "*",
  cors({
    origin: "http://localhost:3000", // hoặc '*' nếu dev
    credentials: true,
  })
);

app.get("/ping", async (c) => {
  const result = await db.execute(sql`SELECT NOW()`);
  return c.json({ time: result });
});

app.get("/", (c) => {
  return c.text("Health check");
});

app.route("/todo-item", todoRoute);

Bun.serve({
  port,
  hostname,
  fetch: app.fetch,
});

console.log(
  `Started development server: http://${
    hostname === "0.0.0.0" ? "localhost" : hostname
  }:${port}`
);
