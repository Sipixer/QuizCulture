import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { Mongo } from "../src/database";
import { ElysiaSever } from "../src";
await Mongo.connect();
const app = ElysiaSever();

describe("Auth", () => {
  it("register", async () => {
    const response = await app
      .handle(
        new Request("http://localhost/api/users/register", {
          method: "POST",
          body: new URLSearchParams({
            username: "Sylvain",
            email: "sipixer@gmail.com",
            password: "123456",
          }),
        })
      )
      .then((res) => res.text());

    expect(response).toBeString();
  });
});
