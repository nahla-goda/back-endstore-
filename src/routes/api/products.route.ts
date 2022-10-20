import { Application, NextFunction, Request, Response } from 'express'
import { veriftmytoken } from '../../middleware/vaildtionacess'

import productinfo from '../../models/products'

//index route
const productroute = new productinfo()
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await productroute.index()
    res.json(product)
  } catch (err) {
    next(err)
  }
}

//show route
export const show = async (req: Request, res: Response) => {
  try {
    const product = await productroute.show(parseInt(req.params.id))

    res.json(product)
  } catch (err) {
    console.log(err)
  }
}

//create route
const create = async (req: Request, res: Response) => {
  try {
    const products = await productroute.create(req.body)
    console.log(req.body)
    res.json({
      data: { ...products },
      message: 'success to add new product'
    })
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
    const product = await productroute.delete(parseInt(req.params.id))
    res.json({
      data: product,
      message: 'product deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}
//update route
const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const product_name = req.body.product_name as unknown as string
    const product_price = req.body.product_price as unknown as number
    const product = await productroute.update(id, product_name, product_price)
    res.json(product)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}

export default function productroutee(app: Application) {
  app.post('/products', veriftmytoken, create)
  app.get('/products/:id', show)
  app.get('/products', index)
  app.delete('/products/:id/', veriftmytoken, deleteOne)
  app.patch('/products/:id', veriftmytoken, update)
}
