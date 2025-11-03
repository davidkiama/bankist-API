import mongoose from "mongoose";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.CONNECTION_URL;
    if (!uri) throw new Error("CONNECTION_URL not defined");
    cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
