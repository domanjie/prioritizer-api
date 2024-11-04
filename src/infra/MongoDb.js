import { MongoClient } from "mongodb"

const uri = "mongodb://localhost:27017"

export const dbClient = new MongoClient(uri, {
  // serverApi: {
  //   ver sion: ServerApiVersion.v1,
  //   strict: true,
  //   deprecationErrors: true,
  // },
})
