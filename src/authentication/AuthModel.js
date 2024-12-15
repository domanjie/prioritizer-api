import { db } from "../infra/MongoDb.js"

export const fetchUserById = async (id) => {
  return await db.collection("users").findOne({ _id: id })
}

export const addNewUser = async (user) => {
  db.collection("users").insertOne({
    ...user,
    dateJoined: Date.now(),
    role: "USER",
  })
}
