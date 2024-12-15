import express, { json } from "express"
import { taskRouter } from "./src/taskQueue/TaskQueueRoute.js"
import cors from "cors"
import session from "express-session"
import { fetchUserById } from "./src/authentication/AuthModel.js"
import { authRouter } from "./src/authentication/AuthRouter.js"
import currentTaskRouter from "./src/currentTask/currentTaskRouter.js"
import ConnectMongoDBSession from "connect-mongodb-session"
const app = express()

const MongoDBSession = ConnectMongoDBSession(session)
const store = new MongoDBSession({
  uri: process.env.MONGO_DB_URI,
  collection: "user-session",
  databaseName: "prioritizerdb",
})
//configurations

// Catch errors
store.on("error", function (error) {
  console.log(error)
})

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
    store: store,
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
