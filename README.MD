# Storefront Backend Project

## indroduction
This is a REST API simulating an e-commerce backend based on three models: Products, Orders and Users.
## enviroment varibles
port= 1504
POSTGRES_HOST=localhost
POSTGRES_DB= online_store_dev
POSTGRES_TEST_DB= online_store_test
POSTGRES_USER= postgres
POSTGRES_PASSWORD=postgres
BCRYPT_PASSWORD =NAHLA-PROJECT-DDD
SALT_ROUNDS=10
TOKEN_SECRET=MY-SECTET-TOKEN
 ENV= dev



##  Technologies IN MY PROJECT
- Postgres for the database INSTALL pg lib
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
 
 "dependencies": {
   "bcrypt": "^5.0.1",
    "db-migrate": "^0.11.13",
    "db-migrate-pg": "^1.2.2",
    "dotenv": "^16.0.1",
    "express": "^4.18.1",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.7.3"
  },
  "devDependencies": {
    "@types/bcrypt": "^5.0.0",
    "@types/express": "^4.17.13",
    "@types/jasmine": "^4.0.3",
    "@types/jsonwebtoken": "^8.5.8",
    "@types/node": "^18.7.3",
    "@types/pg": "^8.6.5",
    "@types/supertest": "^2.0.12",
    "@typescript-eslint/eslint-plugin": "^5.33.0",
    "@typescript-eslint/parser": "^5.33.0",
    "eslint": "^8.22.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.2.1",
    "jasmine": "^4.3.0",
    "jasmine-spec-reporter": "^7.0.0",
    "nodemon": "^2.0.19",
    "prettier": "^2.7.1",
    "supertest": "^6.2.4",
    "ts-node": "^10.9.1",
    "tsc-watch": "^5.0.3",
    "typescript": "^4.7.4"
  }

## Steps to Completion

### 1. Plan to Meet Requirements
-install postgres
-npm i pg
# Create database in postgres 
**IMPORTANT: .env should be added to .gitignore to prevent hidden the password
**create online_store_dev  database
** create online_store_test  database fot test 

 # to connect database
** \C online_store_dev

postgres-# \c online_store_dev;


### 2. Migrations
  - npm i  db-migrate
  -create users table 
  npx db-migrate  create users-table --sql-file 
  
online=# select * from users;


online_store_dev=# select*from users;
 id |       email        | user_name | first_name | last_name |                           password                      
----+--------------------+-----------+------------+-----------+--------------------------------------------------------------
  9 | test@2020.com      | test      | test       | test      | $2b$10$xPoZtTh2CIbu1VZBuaeRm../VS2snenZZI5V/fuXFEINDLzYb9VIe
 10 | ffflllll@pppp.com  | nona      | nona       | goda      | $2b$10$pM3oySNnvi4u7t4nu1Y34ORs7wEua055k/UsLIDKHCTw44A1HNRO.
  8 | nahlagoda@2020.com | nahla     | nahla      | goda      | $2b$10$XG.zIzyo4j3han12YIKmC.ILZ0WOyBQXHmCGUl2C1la851SDBLk02
(3 rows)

  -create products table

  online_store_dev=# select* from products;
 id | product_name | product_price
----+--------------+---------------
  1 | jeans        |           100
  2 | t-shirt      |           150
  3 | iphone       |          3000
  
online_store_dev=# select* from orders;
 id | user_id | status
----+---------+--------
  3 |       1 | t
  5 |       2 | f
  6 |       2 | f
  7 |       1 | f
  -create order- products table
 id | quantity | order_id | product_id
----+----------+----------+------------
  5 |       22 |        3 |          2
  7 |       20 |        3 |          1
  8 |       20 |        3 |          2
  9 |       50 |        6 |          2

  ***create "migration": "db-migrate up " script to run migration to create our tables

### 3. Models

***#create users 
   - index
 get:  http://localhost:1504/users
   -show
 get:  http://localhost:1504/users/:id
   -create
 post:  http://localhost:1504/users
   -delete
 delete:   http://localhost:1504/users/:id
    
   -auhtication
   http://localhost:1504/users/auth
   ***create products 
   -add product
      http://localhost:1504/products
   - delete
      http://localhost:1504/products/:id
   -index
   http://localhost:1504/products
   -show
   http://localhost:1504/products/:id

   **create order 
   - index
   http://localhost:1504/orders
   - show
   http://localhost:1504/orders/:id
   -delete

### 4.handle error 
add handlefunction

### 5. install jasmine to test




