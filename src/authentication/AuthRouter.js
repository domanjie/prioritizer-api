import e from "express"
import { verify } from "./OAuth2Verifier.js"
import { addNewUser, fetchUserById } from "./AuthModel.js"
const authRouter = e.Router()

authRouter.route("/logout").get(function (req, res, next) {
  req.session.destroy((err) => {
    if (err) next(err)
    res.sendStatus(200)
  })
})
authRouter.route("/sign-in").post(async (req, res, next) => {
  try {
    const payload = await verify(req.body.idToken)
    let user = await fetchUserById(payload["email"])
    if (!user) {
      user = await addNewUser({ _id: payload["email"] })
    }
  } catch (error) {
    next(error)
  }
  req.session.regenerate(function (err) {
    if (err) next(err)
    req.session.user = user
    res.send("success")
  })
})
export { authRouter }
