import { t } from "elysia";

export type LoginInput = typeof loginBodyType.static;
export const loginBodyType = t.Object({
  email: t.String({ format: "email" }),
  password: t.String(),
});
export const loginGuard = {
  body: loginBodyType,
};

export type RegisterInput = typeof registerBodyType.static;
export const registerBodyType = t.Object({
  username: t.String({ minLength: 3, maxLength: 20 }),
  email: t.String({ format: "email", default: "user@mail.com" }),
  password: t.String({ minLength: 6, maxLength: 20 }),
});
export const registerGuard = {
  body: registerBodyType,
};
