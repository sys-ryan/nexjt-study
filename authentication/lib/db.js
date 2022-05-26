import { MongoClient } from "mongodb";

export const connectToDatabase = async () => {
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.s6p7c.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

  const client = await MongoClient.connect(connectionString);

  return client;
};
