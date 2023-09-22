import { Elysia } from "elysia";
import { user } from "./routes/UserRoute";
import { swagger } from "@elysiajs/swagger";
import { Mongo } from "./database";
import env from "./Utils/Env";

export async function setup() {
  await Mongo.connect();
  ElysiaSever();
}

export function ElysiaSever(port = 3000) {
  const app = new Elysia().use(swagger()).use(user);
  if (env.isTest) return app;
  app.listen(port);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
  return app;
}

if (!env.isTest) {
  setup();
}
