import nextEnv from "@next/env";
import { createRequire } from "node:module";
import mongoose from "mongoose";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const require = createRequire(import.meta.url);
const { configureMongoDns } = require("../mongodb-dns.cjs");
configureMongoDns();

const uri = process.env.MONGODB_URI;
const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();

if (!uri || !email) {
  console.error("MONGODB_URI and ADMIN_EMAIL must be set in .env.local.");
  process.exit(1);
}

try {
  await mongoose.connect(uri);
  const exists = Boolean(await mongoose.connection.collection("adminusers").findOne({ email }, { projection: { _id: 1 } }));
  console.log(exists ? "Configured admin account exists." : "Configured admin account does not exist.");
  if (!exists) process.exitCode = 2;
} catch (error) {
  const reason = error instanceof Error ? [error.name, error.code, error.cause?.code].filter(Boolean).join("/") : "UnknownError";
  console.error(`Admin account check failed (${reason}). Check the MongoDB connection and environment settings.`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
