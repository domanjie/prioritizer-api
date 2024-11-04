import e from "express"
import { persistTask, getClientTasks, deleteTask } from "./TaskModel.js"
const taskRouter = e.Router()

taskRouter
  .route("/")
  .post(async (req, res) => {
    const task = req.body
    await persistTask(task)
    res.send("tasks successfully added")
  })
  .get(async (req, res) => res.send(JSON.stringify(await getClientTasks())))
taskRouter.route("/:id").delete(async (req, res) => {
  await deleteTask(req.params.id)
  res.send("tasks successfully deleted")
})
export { taskRouter }
