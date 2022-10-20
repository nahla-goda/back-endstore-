import client from '../../database'
import usersinfo from '../../models/users'

import { user } from '../../types&interfaces/type'

const userstore = new usersinfo()

describe('users Model', () => {
  it('should have an index method', () => {
    expect(userstore.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(userstore.show).toBeDefined()
  })
  it('should have a create method', () => {
    expect(userstore.create).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(userstore.delete).toBeDefined()
  })
  it('should have a authicate method', () => {
    expect(userstore.authenticate).toBeDefined()
  })
})

describe('Test User Model ', () => {
  const user = {
    email: 'nahlaa@gamila.com',
    user_name: 'nahla',
    first_name: 'nahla',
    last_name: 'goda',
    password: '123q'
  } as user

  beforeAll(async () => {
    const createdUser = await userstore.create(user)
    user.id = createdUser.id
  })

  it('Authenticate method should return the authenticated user', async () => {
    const authenticatedUser = await userstore.authenticate(
      user.email,
      user.password as string
    )
    expect(authenticatedUser?.email).toBe(user.email)
    expect(authenticatedUser?.user_name).toBe(user.user_name)
  })

  it('INDEX method should return a list of users', async () => {
    const userList = await userstore.index()

    expect(userList[0].user_name).toEqual('nahla')
  })

  it('show method should return user when called with ID', async () => {
    const returnedUser = await userstore.show(user.id as number)
    expect(returnedUser.id).toBe(user.id)
    expect(returnedUser.email).toBe(user.email)
    expect(returnedUser.user_name).toBe(user.user_name)
    expect(returnedUser.first_name).toBe(user.first_name)
    expect(returnedUser.last_name).toBe(user.last_name)
  })
  it('Delete One method should delete user from DB', async () => {
    const deletedUser = await userstore.delete(user.id as unknown as string)
    expect(deletedUser.id).toBe(user.id)
  })
  it('create method should add a user', async () => {
    const result = await userstore.create({
      email: 'nona@test.com',
      user_name: 'nona',
      first_name: 'nona',
      last_name: 'goda',
      password: 'qqqq'
    })
    expect(result.user_name).toEqual('nona')
  })
  afterAll(async () => {
    const connection = await client.connect()
    const sql = 'DELETE FROM users;'
    await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1;')
    await connection.query(sql)
    connection.release()
  })
})
