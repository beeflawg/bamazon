-- DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;
USE bamazonDB;

CREATE TABLE products(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  item_id INTEGER(11) not null,
  product_name VARCHAR(100) not null,
  department_name VARCHAR(100) not null,
  price decimal(10,4) not null,
  stock_quantity integer(11) not null,
  PRIMARY KEY (id)
);