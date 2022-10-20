/* Replace with your SQL commands */
create table order_products(
    id serial primary key,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
);