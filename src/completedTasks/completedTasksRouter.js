import e from "express"
import { getCompletedTasks } from "./completedTaskModel"
const router = e.Router()

router.route("/").get(async () => {
  return await getCompletedTasks()
})
