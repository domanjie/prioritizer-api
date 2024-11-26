import { OAuth2Client } from "google-auth-library"

const CLIENT_ID =
  "755812056141-66dqj7e093pnjlulticeqt6u9k5o1n8h.apps.googleusercontent.com"

const client = new OAuth2Client()
export async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  })
  return ticket.getPayload()
}
