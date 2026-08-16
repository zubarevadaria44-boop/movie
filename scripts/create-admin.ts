// scripts/create-admin.ts
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../src/models/User";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const username = "admin";
  const email = "admin@movies.local";
  const password = "1234";

const existing = await User.findOne({ username } as any);
  if (existing) {
    console.log("Админ уже существует:", username);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(password, 10);
  await User.create({ name: "Admin", username, email, password: hashed, role: "admin" });

  console.log("Создан админ:", username, "/ пароль:", password);
  process.exit(0);
}

main();