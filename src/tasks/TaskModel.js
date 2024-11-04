import { ObjectId } from "mongodb"
import { dbClient } from "../infra/MongoDb.js"

export const persistTask = async (task) => {
  let clientId = "domanjie@gmail.com"
  await dbClient
    .db("prioritizerdb")
    .collection("tasks")
    .insertOne({ ...task, userId: clientId })
}
export const getClientTasks = async () => {
  let clientId = "domanjie@gmail.com"
  let x = dbClient
    .db("prioritizerdb")
    .collection("tasks")
    .find({ userId: clientId })
    .sort({
      priority: -1,
      _id: 1,
    })
  const returnVal = await x.toArray()
  return returnVal
}
export const deleteTask = async (_id) => {
  let clientId = "domanjie@gmail.com"
  await dbClient
    .db("prioritizerdb")
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(_id), userId: clientId })
}
