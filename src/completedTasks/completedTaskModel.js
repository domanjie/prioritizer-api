import { db } from "../infra/MongoDb.js"
export const getCompletedTasks = async () => {
  return await db.collection("completedTasks").find().toArray()
}

export const saveCompletedTask = async (task) => {
  let newCompletedTask = { ...task, completedAt: Date.now() }
  return await db.collection("completedTasks").insertOne(newCompletedTask)
}
