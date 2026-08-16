// scripts/reset-users.ts
import mongoose from "mongoose";
import { User } from "../src/models/User";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const result = await User.deleteMany({});
  console.log("Удалено пользователей:", result.deletedCount);
  process.exit(0);
}

main();