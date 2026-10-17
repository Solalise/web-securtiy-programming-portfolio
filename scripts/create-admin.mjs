import nextEnv from "@next/env";
import { hash } from "bcryptjs";
import { createRequire } from "node:module";
import mongoose from "mongoose";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const require = createRequire(import.meta.url);
const { configureMongoDns } = require("../mongodb-dns.cjs");
configureMongoDns();

const uri = process.env.MONGODB_URI;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME?.trim() || "Portfolio Admin";

if (!uri || !email) {
  console.error("MONGODB_URI and ADMIN_EMAIL must be set in .env.local.");
  process.exit(1);
}

if (!password || password.length < 12) {
  console.error("ADMIN_PASSWORD must be set and contain at least 12 characters.");
  process.exit(1);
}

try {
  await mongoose.connect(uri);
  const admins = mongoose.connection.collection("adminusers");

  const passwordHash = await hash(password, 12);
  const now = new Date();
  await admins.updateOne(
    { email },
    { $set: { email, passwordHash, name, role: "admin", updatedAt: now }, $setOnInsert: { createdAt: now } },
    { upsert: true },
  );
  console.log("Admin account created or updated.");
} catch (error) {
  const reason = error instanceof Error ? [error.name, error.code, error.cause?.code].filter(Boolean).join("/") : "UnknownError";
  console.error(`Admin account operation failed (${reason}). Check the MongoDB connection and environment settings.`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
