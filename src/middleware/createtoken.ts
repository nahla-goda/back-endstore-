import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'

dotenv.config()
const { TOKEN_SECRET } = process.env

export const createAuthToken = (user: string): string => {
  return jwt.sign({ user }, TOKEN_SECRET as unknown as string)
}
