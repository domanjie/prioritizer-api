import { saveCompletedTask } from "../completedTasks/completedTaskModel.js"
import { dequeueTask } from "../taskQueue/TaskQueueModel.js"
import { db } from "../infra/MongoDb.js"

export const promoteTask = async (userId, taskId) => {
  let task = await dequeueTask(userId, taskId)
  saveUsersCurrentTask(userId, task)
}
export const completeCurrentTask = async (userId) => {
  let currentTask = await getUsersCurrentTask(userId)
  if (currentTask) {
    await saveCompletedTask(currentTask)
    await db.collection("currentTask").deleteOne({ _id: currentTask._id })
  } else {
    const err = new Error()
    err.statusCode = 404
    throw err
  }
}
export const saveUsersCurrentTask = async (userId, currentTask) => {
  const filter = { userId }
  await db
    .collection("currentTask")
    .replaceOne(filter, currentTask, { upsert: true })
}
export const getUsersCurrentTask = async (userId) => {
  return await db.collection("currentTask").findOne({ userId })
}
export const updateCurrentTaskTimer = async (userId, timer) => {
  await db
    .collection("currentTask")
    .updateOne({ userId }, { $set: { timer: timer } })
}
