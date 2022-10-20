# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Users
- Index `/users` [GET] [token required]
- Create `/users/create` [POST] 
- Read `/users/:id` [GET] [token required]
- Update `/users/:id` [patch] [token required]
- Delete `/users/:id` [DELETE] [token required]
- Auth `/users/auth` [POST]


#### Products
- Index `/products` [GET]
- Create `/products` [POST] [token required]
- show `/products/:id` [GET]
- Update `/products/:id` [patch] [token required]
- Delete `/products/:id` [DELETE] [token required]

#### Orders
 Index `/orders` [GET] [token required]
- Create `/orders` [POST] [token required]
- show `/orders/:id` [GET] [token required]
- Delete `/orders/:id` [DELETE] [token required]
## Data Shapes

 Schema |      Name      | Type  
--------+----------------+-------+
 public | order_products | table | 
 public | orders         | table | 
 public | products       | table |
 public | users          | table | 
#### Product
-  id
- name
- price

                                       Table "public.products"
    Column     |         Type          | Collation | Nullable |               Default
---------------+-----------------------+-----------+----------+--------------------------------------
 id            | integer               |           | not null | nextval('products_id_seq'::regclass)
 product_name  | character varying(50) |           | not null |
 product_price | integer               |           | not null |
Indexes:
    "products_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "order_products" CONSTRAINT "order_products_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)


#### User
- id
-email
-user_name
- firstName
- lastName
- password
                                      Table "public.users"
   Column   |          Type          | Collation | Nullable |              Default
------------+------------------------+-----------+----------+-----------------------------------
 id         | integer                |           | not null | nextval('users_id_seq'::regclass)
 email      | character varying(50)  |           |          |
 user_name  | character varying(50)  |           | not null |
 first_name | character varying(50)  |           | not null |
 last_name  | character varying(50)  |           | not null |
 password   | character varying(255) |           | not null |

#### Orders(one to many)
- id
- user_id fk users
- status of order (active or complete)
                             Table "public.orders"
 Column  |  Type   | Collation | Nullable |              Default
---------+---------+-----------+----------+------------------------------------
 id      | integer |           | not null | nextval('orders_id_seq'::regclass)
 user_id | integer |           | not null |
 status  | boolean |           | not null |

#### order-products (many to many)
-id
-order_id fk orders
-product_id fk products
-quantity
 Table "public.order_products"
   Column   |  Type   | Collation | Nullable |                  Default
------------+---------+-----------+----------+--------------------------------------------
 id         | integer |           | not null | nextval('order_products_id_seq'::regclass)
 quantity   | integer |           |          |
 order_id   | bigint  |           |          |
 product_id | bigint  |           |          |
