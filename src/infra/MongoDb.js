import { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017"

export const db = new MongoClient(process.env.MONGO_DB_URI, {
  // serverApi: {
  //   ver sion: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true,
  // },
}).db("prioritizerdb")
