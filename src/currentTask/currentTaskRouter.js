import e from "express"
import {
  completeCurrentTask,
  promoteTask,
  updateCurrentTaskTimer,
  getUsersCurrentTask,
} from "./currentTaskModel.js"
const currentTaskRouter = e.Router()

currentTaskRouter
  .route("/")
  .get(async (req, res) => {
    const currentTask = await getUsersCurrentTask(req.session.user._id)
    res.send(JSON.stringify(currentTask))
  })
  .post(async (req, res, next) => {
    const userId = req.session.user._id
    try {
      switch (req.query.action) {
        case "complete":
          await completeCurrentTask(userId)
          res.sendStatus(200)
          break
        case "promote":
          await promoteTask(userId, req.body.taskId)
          res.sendStatus(200)
          break
        default:
          res.sendStatus(400)
          break
      }
    } catch (error) {
      next(error)
    }
  })
  .patch(async (req, res, next) => {
    const timerState = req.body
    try {
      await updateCurrentTaskTimer(req.session.user._id, timerState)
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  })
export default currentTaskRouter
