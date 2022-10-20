import client from '../database'
import { product } from '../types&interfaces/type'

class productinfo {
  async index(): Promise<product[]> {
    try {
      //open connection
      const connection = await client.connect()
      //run query
      const sql = 'select * from products'
      const result = await connection.query(sql)
      //close connection
      connection.release()
      //close connection
      return result.rows
    } catch (err) {
      throw new Error('cannot select products')
    }
  }
  async show(id: number): Promise<product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1);'
      const connection = await client.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find product ${id}. ${err}`)
    }
  }
  async create(p: product): Promise<product> {
    try {
      //open connection
      const connection = await client.connect()

      //run query
      const sql =
        'INSERT INTO products (product_name, product_price) VALUES ($1, $2 )  RETURNING id,product_name, product_price'

      const result = await connection.query(sql, [
        p.product_name,
        p.product_price
      ])
      //close connection
      connection.release()
      //close connection
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not add new product. `)
    }
  }
  async update(
    id: number,
    product_name: string,
    product_price: number
  ): Promise<product> {
    try {
      const sql =
        'UPDATE products SET product_name= $1, product_price= $2 WHERE id = $3 RETURNING *'
      const connection = await client.connect()
      const result = await connection.query(sql, [
        product_name,
        product_price,
        id
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not update product ${product_name}. ${err}`)
    }
  }

  async delete(id: number): Promise<product> {
    try {
      const connection = await client.connect()
      const sql = `DELETE FROM products WHERE id=($1) `
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete products ${id}, ${(error as Error).message}`
      )
    }
  }
}

export default productinfo
