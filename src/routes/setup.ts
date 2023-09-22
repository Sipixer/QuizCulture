import Elysia, { t } from "elysia";
import { cookie } from "@elysiajs/cookie";
import { jwt } from "@elysiajs/jwt";
import { Value } from "@sinclair/typebox/value";
import { Tokens } from "../schemas/TokenSchema";
import { Users } from "../schemas/UserSchema";

// Définit la structure attendue pour un JWT valide
const validJwt = t.Object({
  user_id: t.String(),
  token: t.String(),
});

// Crée une nouvelle instance d'Elysia
export const setup = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: "secret",
    })
  )
  .use(
    cookie({
      maxAge: 31536000,
      path: "/",
    })
  )
  .derive(async ({ cookie, jwt }) => {
    // Récupère la valeur du cookie nommé "auth"
    const auth = cookie.auth;

    // Vérifie le JWT (Json Web Token) en utilisant la bibliothèque jwt
    const verify = await jwt.verify(auth);
    if (!verify) {
      return {
        user: null,
        user_JWT: null,
      };
    }
    Value.Cast(validJwt, verify);
    const token = await Tokens.findOne({
      user_id: verify.user_id,
      token: verify.token,
    });
    if (!token) {
      return {
        user: null,
        user_JWT: null,
      };
    }

    return {
      user: await Users.findById(verify.user_id),
      user_JWT: verify,
    };
  });
