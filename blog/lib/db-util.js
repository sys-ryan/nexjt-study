import { MongoClient } from "mongodb";

const username = process.env.mongodb_username;
const password = process.env.mongodb_password;
const clusterName = process.env.mongodb_clustername;
const dbname = process.env.mongodb_database;

export const connectDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb+srv://${username}:${password}@${clusterName}.s6p7c.mongodb.net/${dbname}?retryWrites=true&w=majority`
  );
  return client;
};
