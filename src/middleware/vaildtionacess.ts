import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

export const veriftmytoken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization as string
    // console.log(authorizationHeader)
    const token = authorizationHeader.split(' ')[1]
    // console.log(token)
    jwt.verify(token, process.env.TOKEN_SECRET as string)
    next()
  } catch (error) {
    res.status(401)
  }
}
