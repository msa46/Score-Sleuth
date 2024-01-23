import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import game from "@/core/game"

export const config = {
  runtime: 'edge'
}

const app = new Hono().basePath('/api')

app.get('/hello', (c) => {
  return c.json({
    message: 'Hello from Hono!'
  })
})

// app.post('/game', async (c) => {
//   const body = await c.req.json()
//   return c.json({
//     message: body["answer"]
//   })
// })
app.route('/game', game)

export default handle(app)
