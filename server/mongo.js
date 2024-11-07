import { MongoClient } from "mongodb";
import MongoStore from "connect-mongo";

async function start(client) {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

let client = null;
//database
if (process.argv[2] == "Docker") {
  client = new MongoClient("mongodb://mongodb:27017");
} else {
  client = new MongoClient("mongodb://127.0.0.1:27017");
}

if (process.env.AI === "true") {
  start(client);
}

const db = client.db(process.env.DATABASE_NAME);
export const account = db.collection("account");
export const mongoStore = MongoStore.create({
  client: client,
  dbName: process.env.DATABASE_NAME,
  collectionName: "sessions",
});
