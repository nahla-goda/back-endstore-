import orderinfo from '../../models/orders'

import { Application, NextFunction, Request, Response } from 'express'
import { veriftmytoken } from '../../middleware/vaildtionacess'

//index route
const orderroute = new orderinfo()
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderroute.index()

    res.json(order)
  } catch (err) {
    next(err)
  }
}

//show route
export const show = async (req: Request, res: Response) => {
  try {
    const order = await orderroute.show(parseInt(req.params.id))

    res.json(order)
  } catch (err) {
    console.log(err)
  }
}

//delete route
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const order = await orderroute.delete(req.params.id as unknown as string)
    res.json({
      data: order,
      message: 'User deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}
//create route
const create = async (req: Request, res: Response) => {
  try {
    const order = await orderroute.create(req.body)
    console.log(order)
    res.json(order)
  } catch (err) {
    console.log(err)
  }
}
const addProduct = async (_req: Request, res: Response) => {
  const order_id: string = _req.params.id
  const product_id: string = _req.body.product_id
  const quantity: number = parseInt(_req.body.quantity)

  try {
    const addedProduct = await orderroute.addProduct(
      quantity,
      order_id,
      product_id
    )
    res.json(addedProduct)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}
export default function orderroutee(app: Application) {
  app.get('/orders/:id', veriftmytoken, show)
  app.get('/orders', veriftmytoken, index)
  app.delete('/orders/:id/', veriftmytoken, deleteOne)
  app.post('/orders', veriftmytoken, create)
  app.post('/orders/:id/products', addProduct)
}
