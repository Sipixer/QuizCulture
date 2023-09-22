import { Elysia, t } from "elysia";
import { setup } from "./setup";
import { loginGuard, registerGuard } from "../types/models/AuthModel";
import { Users } from "../schemas/UserSchema";
import { Tokens } from "../schemas/TokenSchema";

export const user = new Elysia({ prefix: "/api/users" })
  .use(setup)
  .post(
    "/login",
    async ({ body, setCookie, jwt, cookie }) => {
      return cookie.auth;
    },
    loginGuard
  )
  .post(
    "/register",
    async ({ body, setCookie, jwt, cookie }) => {
      const user = await Users.create({
        username: body.username,
        email: body.email,
        password: body.password,
      });
      const jwtData = {
        user_id: user._id.toString(),
        token: crypto.randomUUID(),
      };
      await Tokens.create(jwtData);
      setCookie("auth", await jwt.sign(jwtData));
      return cookie.auth;
    },
    registerGuard
  )
  .post("/logout", ({ user_JWT }) => {
    return "logout";
  })
  .get("/profile", ({ user }) => {
    if (!user) return new Response("user_not_found", { status: 404 });
    return user;
  })
  .get("/", () => Users.find())
  .get("/:id", ({ params }) => "Users.findById(params.id)")
  .delete("/:id", async ({ params }) => {
    return new Response("user_not_found", { status: 404 });
  });
