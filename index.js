import express, { json } from "express"
import { taskRouter } from "./src/tasks/TaskRoute.js"
import cors from "cors"

const app = express()

//configurations
app.use(
  cors({
    origin: " http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: true,
    optionsSuccessStatus: 204,
  })
)
app.use(json())
app.use("/api/v1/task", taskRouter)

app.listen(3000, () => {
  console.log(`server running on http://localhost:3000 `)
})
