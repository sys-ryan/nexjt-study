import { MongoClient } from "mongodb";

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://root:root@cluster0.s6p7c.mongodb.net/events?retryWrites=true&w=majority"
  );

  return client;
};

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  return await db.collection(collection).insertOne(document);
};

export const getAllDocuments = async (client, collection, filter, sort) => {
  const db = client.db();

  return await db.collection(collection).find(filter).sort(sort).toArray();
};
