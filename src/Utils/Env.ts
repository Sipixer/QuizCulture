import { cleanEnv, port, str } from "envalid";
import { env as envi } from "bun";

const env = cleanEnv(envi, {
  PORT: port({ default: 3000 }),
  MONGO_USERNAME: str({ default: "" }),
  MONGO_PASSWORD: str({ default: "" }),
  MONGO_COLLECTION: str({ default: "undefined" }),
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
});

export default env;
