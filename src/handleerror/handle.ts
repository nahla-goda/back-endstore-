import { Request, Response } from 'express'

const handlefunction = (req: Request, res: Response) => {
  res.status(404).json({
    message: ' you are lost '
  })
}
export default handlefunction
