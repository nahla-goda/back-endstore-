import client from '../database'
import bycrypt from 'bcrypt'
import { user } from '../types&interfaces/type'
import { uuser } from '../types&interfaces/interfaces'

const { pepper: BCRYPT_PASSWORD, salt: SALT_ROUNDS } = process.env

class usersinfo {
  //async index to show all user in database
  async index(): Promise<user[]> {
    try {
      //open connection
      const connection = await client.connect()
      //run query
      const sql =
        'select  id ,email,user_name,first_name,last_name, password from users'
      const result = await connection.query(sql)
      //close connection
      connection.release()
      return result.rows
    } catch (err) {
      throw new Error('cannot select users')
    }
  }
  // show users by id
  async show(id: number): Promise<user> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1);'
      const connection = await client.connect()
      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (err) {
      throw new Error('Could not find user')
    }
  }
  // create new user in database
  //open connection
  //run query
  //hash password
  //get result
  //close connection
  async create(u: user): Promise<user> {
    try {
      const connection = await client.connect()
      const sql =
        'INSERT INTO users (email, user_name ,first_name ,last_name ,password) VALUES($1, $2, $3, $4,$5) RETURNING *'
      const hash = bycrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string, 10)
      )
      const result = await connection.query(sql, [
        u.email,
        u.user_name,
        u.first_name,
        u.last_name,
        hash
      ])
      connection.release()
      return result.rows[0]
    } catch (err) {
      console.log(err)
      throw new Error(`Could not add new user. `)
    }
  }
  //update user
  async update(id: number, userr: uuser): Promise<user> {
    const { email, user_name, first_name, last_name, password } = userr

    try {
      const sql = `UPDATE users 
      SET email=$1, user_name=$2, first_name=$3, last_name=$4, password=$5 
      WHERE id=$6 
      RETURNING id, email, user_name, first_name, last_name`

      const connection = await client.connect()
      const result = await connection.query(sql, [
        email,
        user_name,
        first_name,
        last_name,
        password,
        id
      ])

      connection.release()

      return result.rows[0]
    } catch (err) {
      throw new Error(
        `Could not update user ${first_name} ${last_name}. ${err}`
      )
    }
  }

  //authticate with email and password for user

  async authenticate(email: string, password: string): Promise<user | null> {
    try {
      const connection = await client.connect()
      const sql = 'SELECT password FROM users WHERE email=$1'
      const result = await connection.query(sql, [email])

      if (result.rows.length > 0) {
        const { password: hashPassword } = result.rows[0]

        if (
          bycrypt.compareSync(`${password}${BCRYPT_PASSWORD}`, hashPassword)
        ) {
          const userInfo = await connection.query(
            'SELECT id, email, user_name, first_name, last_name FROM users WHERE email=($1)',
            [email]
          )
          return userInfo.rows[0]
        }
      }
      connection.release()
      return null
    } catch (error) {
      console.log(error)
      throw new Error(`Unable to login: ${(error as Error).message}`)
    }
  }
  //delete user from database
  async delete(id: string): Promise<user> {
    try {
      const connection = await client.connect()
      const sql = `DELETE FROM users 
                WHERE id=($1) 
                RETURNING id, email, user_name, first_name, last_name`

      const result = await connection.query(sql, [id])
      connection.release()
      return result.rows[0]
    } catch (error) {
      throw new Error(
        `Could not delete user ${id}, ${(error as Error).message}`
      )
    }
  }
}
export default usersinfo
