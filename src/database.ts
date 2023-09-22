import mongoose from "mongoose";
import env from "./Utils/Env";
import { Users } from "./schemas/UserSchema";

const DB_USERNAME = env.MONGO_USERNAME;
const DB_PASSWORD = env.MONGO_PASSWORD;
const DB_COLLECTION = env.isTest ? "test" : env.MONGO_COLLECTION;
const uri = `mongodb://localhost:27017/`;

export class Mongo {
  static async connect() {
    await mongoose.connect(uri, {
      auth: { username: DB_USERNAME, password: DB_PASSWORD },
      dbName: DB_COLLECTION,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any);
  }
  static async disconnect() {
    await mongoose.disconnect();
    if (!env.isTest) return console.log("MongoDB disconnected successfully !");
  }
}
