import client from '../database'
import { order } from '../types&interfaces/type'

export type addpro = {
  quantity: number
  order_id: string
  product_id: string
}

class orderinfo {
  async index(): Promise<order[]> {
    try {
      //open connection
      const connection = await client.connect()
      //run query
      const sql = 'select * from orders'
      const result = await connection.query(sql)
      //close connection
      connection.release()
      //close connection
      return result.rows
    } catch (err) {
      throw new Error('cannot select orders')
    }
  }
  async show(id: number): Promise<order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1);'
      const connection = await client.connect()
      const result = await connection.query(sql, [id])

      connection.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(`Could not find order${id}. ${err}`)
    }
  }

  async delete(id: string): Promise<order> {
    try {
      const connection = await client.connect()
      const sql = `DELETE FROM orders
                  WHERE id=($1) `

      const result = await connection.query(sql, [id])

      connection.release()

      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete orders${id}, ${(error as Error).message}`
      )
    }
  }
  async create(o: order): Promise<order> {
    try {
      //open connection
      const connection = await client.connect()

      //run query
      const sql =
        'INSERT INTO orders (user_id, status) VALUES ($1, $2 ) RETURNING id, user_id,status'

      const result = await connection.query(sql, [
        o.user_id,
        o.status as unknown as string
      ])
      //close connection
      connection.release()
      //close connection
      return result.rows[0]
    } catch (err) {
      console.log(err)
      throw new Error(`Could not add new order. `)
    }
  }
  async addProduct(
    quantity: number,
    order_Id: string,
    product_id: string
  ): Promise<order> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      //@ts-ignore
      const conn = await client.connect()

      const result = await conn.query(sql, [quantity, order_Id, product_id])

      const order = result.rows[0]
      console.log(order)
      conn.release()

      return order
    } catch (err) {
      throw new Error(
        `Could not add product ${product_id} to order ${order_Id}: ${err}`
      )
    }
  }
}
export default orderinfo
