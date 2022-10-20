import supertest from 'supertest'
import client from '../../database'
import app from '../../app'
import productinfo from '../../models/products'
import { product } from '../../types&interfaces/type'
import { createAuthToken } from '../../middleware/createtoken'

const ProductStore = new productinfo()
const request = supertest(app)
const token = createAuthToken('test')

describe('product API Endpoints', () => {
  const product = {
    product_name: 'jeans',
    product_price: 100
  } as product

  beforeAll(async () => {
    const createproduct = await ProductStore.create(product)
    product.id = createproduct.id
  })

  afterAll(async () => {
    const connection = await client.connect()
    const sql = 'DELETE FROM products;'
    await connection.query(sql)
    await connection.query(`ALTER SEQUENCE products_id_seq RESTART WITH 1;`)
    connection.release()
  })

  describe('Test CRUD API methods', () => {
    it('should create new product', async () => {
      const res = await request
        .post('/products/')
        .set('Authorization', `Bearer ${token}`)
        .send({
          product_name: 'jeans',
          product_price: 100
        } as product)
      expect(res.status).toBe(200)
    })

    it('should get list of products', async () => {
      const res = await request.get('/products/')
      expect(res.status).toBe(200)
    })

    it('should get product info', async () => {
      const res = await request.get(`/products/1`)

      expect(res.status).toBe(200)
    })

    it('should delete user', async () => {
      const res = await request
        .delete(`/products/1`)
        .set('Authorization', `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
  })
})
