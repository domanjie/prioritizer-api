import { dbClient } from "../infra/MongoDb.js"

export const fetchUserById = async (id) => {
  return await dbClient
    .db("prioritizerdb")
    .collection("users")
    .findOne({ _id: id })
}
// export const getUserOrCreateNewUser = async (id) => {}

export const addNewUser = async (user) => {
  dbClient
    .db("prioritizerdb")
    .collection("users")
    .insertOne({ ...user, dateJoined: Date.now(), role: "USER" })
}
