import express, { json } from "express"
import { taskRouter } from "./src/tasks/TaskRoute.js"
import cors from "cors"
import session from "express-session"
import { fetchUserById } from "./src/authentication/AuthModel.js"
import { authRouter } from "./src/authentication/AuthRouter.js"
import currentTaskRouter from "./src/currentTask/currentTaskRouter.js"
const app = express()

//configurations

app.use(
  cors({
    origin: " http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200,
  })
)
app.use(json())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    unset: "destroy",
  })
)

app.use("/api/v1/task", authenticate, taskRouter)
app.use("/api/v1/current", authenticate, currentTaskRouter)
app.use("/api/v1/auth", authRouter)
app.listen(3000, () => {
  console.log("server running on http://localhost:3000 ")
})

function authenticate(req, res, next) {
  if (req.session.user) {
    next()
  } else res.sendStatus(401)
}
