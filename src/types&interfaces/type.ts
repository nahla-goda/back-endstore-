export type user = {
  id?: number
  email: string
  user_name: string
  first_name: string
  last_name: string
  password: string
}

export type product = {
  id?: number
  product_name: string
  product_price: number
}
export type order = {
  id?: number
  user_id: number
  status: string
}
