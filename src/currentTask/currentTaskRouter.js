import e, { json } from "express"
import { dbClient } from "../infra/MongoDb.js"
const currentTaskRouter = e.Router()

currentTaskRouter
  .route("/")
  .get(async (req, res) => {
    const currentTask = await dbClient
      .db("prioritizerdb")
      .collection("currentTask")
      .findOne({ _id: req.session.user._id })
    res.send(JSON.stringify(currentTask))
  })
  .put(async (req, res) => {
    const filter = { _id: req.session.user._id }
    console.log(filter)
    const { taskName, time, priority, createdAt, timer } = req.body
    const currentTask = { taskName, time, priority, createdAt, timer }
    console.log(currentTask)
    await dbClient
      .db("prioritizerdb")
      .collection("currentTask")
      .replaceOne(filter, currentTask, { upsert: true })
    res.sendStatus(200)
  })
export default currentTaskRouter
