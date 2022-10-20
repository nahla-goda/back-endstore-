import supertest from 'supertest'
import client from '../../database'
import { createAuthToken } from '../../middleware/createtoken'
import orderinfo from '../../models/orders'
import app from '../../app'
import { order, user } from '../../types&interfaces/type'
import usersinfo from '../../models/users'

const userStore = new usersinfo()
const orderstore = new orderinfo()
const request = supertest(app)
const token = createAuthToken('test')

describe('Order model ENDpoint', () => {
  const user = {
    email: 'nahlarkkke@gamila.com',
    user_name: 'nahla',
    first_name: 'nahla',
    last_name: 'goda',
    password: '123q'
  } as user

  const order = {
    id: 2,
    user_id: 1,
    status: 'true' as string
  } as order

  beforeAll(async () => {
    await userStore.create(user)

    await orderstore.create(order)
  })
  afterAll(async () => {
    const connection = await client.connect()
    await connection.query('DELETE FROM orders;')
    await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;')
    await connection.query('DELETE FROM users;')
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')

    connection.release()
  })

  describe('Test CRUD API methods for order', () => {
    it('should create new order', async () => {
      const res = await request
        .post('/orders/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: 2,
          user_id: 1,
          status: 'true' as string
        } as order)
      expect(res.status).toBe(200)
    })

    it('should return  list of order', async () => {
      const res = await request
        .get('/orders/')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
    it('should return  order by id ', async () => {
      const res = await request
        .get('/orders/1')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
    it('should delete order by ', async () => {
      const res = await request
        .delete('/orders/1')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
  })
})
