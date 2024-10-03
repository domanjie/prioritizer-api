import { dbClient } from "../infra/MongoDb.js"

export const persistTask = (task) => {
  let clientId = "domanjie@gmail.com"
  dbClient
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
