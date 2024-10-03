import e from "express"
import { persistTask, getClientTasks } from "./TaskModel.js"
const taskRouter = e.Router()

taskRouter
  .route("/")
  .post((req, res) => {
    const task = req.body
    persistTask(task)
    res.send("tasks successfully added")
  })
  .get(async (req, res) =>
    res.send(JSON.stringify({ tasks: await getClientTasks() }))
  )

taskRouter
  .route(":/id")
  .delete((req, res) => {})
  .put((req, res) => {})
export { taskRouter }
