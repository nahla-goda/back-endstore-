import { Application } from 'express'
import { veriftmytoken } from '../middleware/vaildtionacess'
import {
  create,
  deleteOne,
  show,
  index,
  authenticate,
  update
} from './api/users.route'

export default function usertoute(app: Application) {
  app.post('/users', create)
  app.get('/users/:id', veriftmytoken, show)
  app.get('/users/', veriftmytoken, index)
  app.patch('/users/:id', veriftmytoken, update)
  app.delete('/users/:id/', veriftmytoken, deleteOne)
  app.post('/users/auth', authenticate)
}
