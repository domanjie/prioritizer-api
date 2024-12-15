import { ObjectId } from "mongodb"
import { db } from "../infra/MongoDb.js"

export const persistTask = async (userId, task) => {
  await db.collection("tasks").insertOne({ ...task, userId: userId })
}
export const getClientTasks = async (userId) => {
  let x = db.collection("tasks").find({ userId: userId }).sort({
    priority: -1,
    _id: 1,
  })
  const returnVal = await x.toArray()
  return returnVal
}
export const deleteTask = async (userId, taskId) => {
  return await db
    .collection("tasks")
    .deleteOne({ _id: new ObjectId(taskId), userId: userId })
}

export const dequeueTask = async (userId, taskId) => {
  const task = await db
    .collection("tasks")
    .findOne({ _id: new ObjectId(taskId), userId: userId })
  await deleteTask(userId, taskId)
  return task
}
