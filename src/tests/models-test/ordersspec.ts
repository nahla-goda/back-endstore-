import orderinfo from '../../models/orders'
import userinfo from '../../models/users'

import Client from '../../database'
import { user } from '../../types&interfaces/type'

const orderStore = new orderinfo()
const userStore = new userinfo()

describe('Order model', () => {
  it('has a create method', () => {
    expect(orderStore.create).toBeDefined()
  })

  it('index method to show list of orders', () => {
    expect(orderStore.index).toBeDefined()
  })

  it('show order by id ', () => {
    expect(orderStore.show).toBeDefined()
  })

  it('deletefrom order', () => {
    expect(orderStore.delete).toBeDefined()
  })
})

describe('Order model method', () => {
  const user = {
    email: 'nahlare@gamila.com',
    user_name: 'nahla',
    first_name: 'nahla',
    last_name: 'goda',
    password: '123q'
  } as user

  beforeAll(async () => {
    const createdUser = await userStore.create(user)
    user.id = createdUser.id
  })

  it('add method should add a order', async () => {
    const order = {
      id: 1,
      user_id: 3,
      status: 'true' as string
    }
    const result = await orderStore.create(order)

    expect(result.user_id).toEqual(order.user_id)
  })
  it('index method should return a list of orders', async () => {
    const order = {
      id: 1,
      user_id: 3,
      status: 'true' as string
    }
    const orderList = await orderStore.index()

    expect(orderList[0].user_id).toEqual(order.user_id)
  })

  it('show method should return the  order bu id ', async () => {
    const order = {
      id: 1,
      user_id: 3,
      status: 'true' as string
    }
    const result = await orderStore.show(order.id)

    expect(result.user_id).toEqual(order.user_id)
  })

  it('delete order method ', async () => {
    const order = {
      id: 1,
      user_id: 3,
      status: 'true' as string
    }
    await orderStore.delete(order.id as unknown as string)
    const orderlist = await orderStore.index()
    expect(orderlist).toEqual([])
  })
  afterAll(async () => {
    const connection = await Client.connect()

    await connection.query('DELETE FROM orders;')
    await connection.query('ALTER SEQUENCE orders_id_seq RESTART WITH 1;')
    await connection.query('DELETE FROM users;')
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')

    connection.release()
  })
})
