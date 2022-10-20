import express, { Request, Response } from 'express'
import handlefunction from './handleerror/handle'
import orderroutee from './routes/api/orders'
import productroutee from './routes/api/products.route'
import usertoute from './routes/route'

const app = express()
const port = 1504
app.use(express.json())

// set end point
app.get('/', (req: Request, res: Response) => {
  res.send('hello to my second project ')
})

//models routes
usertoute(app)
productroutee(app)
orderroutee(app)
//handle error
app.use(handlefunction)
//coonect to 1504 port
app.listen(port, () => {
  console.log('server running on http://localhost:1504')
})

export default app
