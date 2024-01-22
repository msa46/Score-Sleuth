import { Hono } from 'hono'
import { solver } from "./utils";

const app = new Hono()

app.post('/', async (c) => {
    const body = await c.req.json()
    const answer = body["answer"]
    const solution = "sight"
    const comparison = solver(answer, solution)
    if (comparison === false){
        return c.json({
            message: "Wrong length",
        }, 400 
        )
    }
    return c.json({
        message: comparison
    })
})

export default app
