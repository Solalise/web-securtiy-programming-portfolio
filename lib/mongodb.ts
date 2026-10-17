import mongoose, { type Mongoose } from "mongoose";

import { configureMongoDns } from "@/mongodb-dns.cjs";

type MongooseCache = {
  connection: Mongoose | null;
  promise: Promise<Mongoose> | null;
};

const globalForMongoose = globalThis as typeof globalThis & {
  mongooseCache?: MongooseCache;
};

const cache = globalForMongoose.mongooseCache ?? {
  connection: null,
  promise: null,
};

globalForMongoose.mongooseCache = cache;

export async function connectDB(): Promise<Mongoose> {
  if (cache.connection) {
    return cache.connection;
  }

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }

  if (!cache.promise) {
    configureMongoDns();
    cache.promise = mongoose.connect(uri);
  }

  try {
    cache.connection = await cache.promise;
  } catch (error: unknown) {
    cache.promise = null;
    throw error;
  }

  return cache.connection;
}
