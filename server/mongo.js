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
let account;
let mongoStore;
//database
if (process.env.AI === "true") {
  if (process.argv[2] == "Docker") {
    client = new MongoClient("mongodb://mongodb:27017");
  } else {
    client = new MongoClient("mongodb://127.0.0.1:27017");
  }

  start(client);

  const db = client.db(process.env.DATABASE_NAME);
  account = db.collection("account");
  mongoStore = MongoStore.create({
    client: client,
    dbName: process.env.DATABASE_NAME,
    collectionName: "sessions",
  });
}
export { account, mongoStore };
