import supertest from 'supertest'
import client from '../../database'
import { user } from '../../types&interfaces/type'
import usersinfo from '../../models/users'
import app from '../../app'

const userModel = new usersinfo()
const request = supertest(app)
let token = ''

describe('User API Endpoints', () => {
  const user = {
    email: 'nahla@gamila.com',
    user_name: 'nahla',
    first_name: 'nahla',
    last_name: 'goda',
    password: '123q'
  } as user

  beforeAll(async () => {
    const createdUser = await userModel.create(user)
    user.id = createdUser.id
  })

  describe('Test Authenticate methods', () => {
    it('should be able to authenticate to get token', async () => {
      const res = await request.post('/users/auth').send({
        email: 'nahla@gamila.com',
        password: '123q'
      })
      expect(res.status).toBe(200)
      const { id, email, token: userToken } = res.body.data
      expect(id).toBe(user.id)
      expect(email).toBe('nahla@gamila.com')
      token = userToken
    })

    it('should be failed to authenticate with wrong email', async () => {
      const res = await request.post('/users/auth').send({
        email: 'nahssla@gamila.com',
        password: '123q'
      })
      expect(res.status).toBe(401)
    })
  })

  describe('Test CRUD API methods', () => {
    it('should create new user', async () => {
      const res = await request
        .post('/users/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          email: 'mmmm@mmmm.com',
          user_name: 'mmmm',
          first_name: 'mmmm',
          last_name: 'mmmm',
          password: 'mmmm'
        } as user)
      expect(res.status).toBe(200)
    })

    it('should get list of users', async () => {
      const res = await request
        .get('/users/')
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })

    it('should get user info', async () => {
      const res = await request
        .get(`/users/1`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })

    it('should delete user', async () => {
      const res = await request
        .delete(`/users/1`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
  })
  afterAll(async () => {
    const connection = await client.connect()
    const sql = 'DELETE FROM users;'
    await connection.query(sql)
    connection.release()
  })
})
