import client from '../../database'
import productinfo from '../../models/products'
import { product } from '../../types&interfaces/type'

const ProductStore = new productinfo()

describe('products Model', () => {
  it('should have an index method to show all products in store', () => {
    expect(ProductStore.index).toBeDefined()
  })

  it('should have a show method ', () => {
    expect(ProductStore.show).toBeDefined()
  })
  it('should have a create method', () => {
    expect(ProductStore.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(ProductStore.delete).toBeDefined()
  })
})
describe('Test product Model ', () => {
  const product = {
    product_name: 'jeans',
    product_price: 100
  } as product

  beforeAll(async () => {
    const createproduct = await ProductStore.create(product)
    product.id = createproduct.id
  })

  it('INDEX method should return a list of products', async () => {
    const productlist = await ProductStore.index()
    expect(productlist[0].product_name).toEqual('jeans')
  })

  it('show method should return product when called with ID', async () => {
    const returnedUser = await ProductStore.show(product.id as number)
    expect(returnedUser.id).toBe(product.id)
    expect(returnedUser.product_name).toBe(product.product_name)
    expect(returnedUser.product_price).toBe(product.product_price)
  })
  it('Delete One method should delete product from DB', async () => {
    await ProductStore.delete(product.id as number)
    const productlist = await ProductStore.index()
    expect(productlist).toEqual([])
  })
  it('create method should add a product', async () => {
    const result = await ProductStore.create({
      product_name: 'phones',
      product_price: 1002
    })
    expect(result.product_name).toEqual('phones')
  })
  afterAll(async () => {
    const connection = await client.connect()
    const sql = 'DELETE  FROM products;'
    await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;')
    await connection.query(sql)
    connection.release()
  })
})
