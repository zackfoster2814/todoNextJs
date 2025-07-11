import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres("postgres://postgres:root@localhost:5432/postgres");

export const db = drizzle(client);
