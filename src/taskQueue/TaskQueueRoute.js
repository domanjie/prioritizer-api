import e from "express"
import { persistTask, getClientTasks, deleteTask } from "./TaskQueueModel.js"
const taskRouter = e.Router()

taskRouter
  .route("/")
  .post(async (req, res, next) => {
    const task = req.body
    await persistTask(req.session.user._id, task)
    res.send("tasks successfully added")
  })
  .get(async (req, res, next) => {
    try {
      res.send(JSON.stringify(await getClientTasks(req.session.user._id)))
    } catch (error) {
      next(error)
    }
  })
taskRouter.route("/:id").delete(async (req, res, next) => {
  try {
    await deleteTask(req.session.user._id, req.params.id)
    res.send("tasks successfully deleted")
  } catch (error) {
    next(error)
  }
})
export { taskRouter }
