import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import { Mongo } from "../src/database";
import mongoose from "mongoose";
import { Users } from "../src/schemas/UserSchema";
import { Tokens } from "../src/schemas/TokenSchema";

beforeAll(async () => {
  await Mongo.connect();
  await Users.deleteMany({});
  await Tokens.deleteMany({});
});

afterAll(async () => {
  await Mongo.disconnect();
});
