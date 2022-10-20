import { NextFunction, Request, Response } from 'express'

import usersinfo from '../../models/users'

import jwt from 'jsonwebtoken'
import { createAuthToken } from '../../middleware/createtoken'

//index route
const usersroute = new usersinfo()
export const index = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersroute.index()

    res.json(user)
  } catch (err) {
    next(err)
  }
}

//show route
export const show = async (req: Request, res: Response) => {
  try {
    const user = await usersroute.show(parseInt(req.params.id))

    res.json(user)
  } catch (err) {
    console.log(err)
  }
}

//create route
export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersroute.create(req.body)

    const token = createAuthToken(req.body)
    res.json({
      data: { ...user, token }
    })

    return token
  } catch (err) {
    console.error(err)
    next(err)
  }
}

//delete route
export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await usersroute.delete(req.params.id as unknown as string)
    res.json({
      message: 'User deleted successfully'
    })
  } catch (err) {
    next(err)
  }
}
//update route
export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number
    const user_name = req.body.user_name as unknown as string
    const first_name = req.body.first_name as unknown as string
    const last_name = req.body.last_name as unknown as string
    const email = req.body.email as unknown as string
    const password = req.body.password as unknown as string
    const user = await usersroute.update(id, {
      email,
      user_name,
      first_name,
      last_name,
      password
    })

    res.json(user)
  } catch (e) {
    res.status(400)
    res.json(e)
  }
}
//authenticate route

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await usersroute.authenticate(
      req.body.email,
      req.body.password
    )
    const token = jwt.sign(
      { user },
      process.env.TOKEN_SECRET as unknown as string
    )
    if (user) {
      return res.json({
        // can get all data about user from put the token in  JWT website
        data: { ...user, token },
        message: 'user authenticated successfully'
      })
    }
    return res.status(401).json({
      message: 'the email and password do not match please try again'
    })
  } catch (err) {
    console.log(err)
    return next(err)
  }
}
