-- CREATE DATABASE food;

-- USE food;

START TRANSACTION;

DROP TABLE IF EXISTS restaurants;

CREATE TABLE IF NOT EXISTS restaurants 
(id INT PRIMARY KEY AUTO_INCREMENT, name varchar(50) UNIQUE, address TEXT, rating DECIMAL(2,1));

DROP TABLE IF EXISTS menu_items;

CREATE TABLE IF NOT EXISTS menu_items
(
    id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) NOT NULL,
    restaurant_id int NOT NULL,
    in_stock enum('Available', 'Not Available') DEFAULT 'Not Available',
    price DECIMAL(6, 2) NOT NULL,
    order_count int DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) 
);

DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(225) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    
    mobile VARCHAR(20),
    address TEXT
);


DROP TABLE IF EXISTS cart;

CREATE TABLE IF NOT EXISTS cart (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL, 
    menu_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    UNIQUE (user_id, menu_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (menu_id) REFERENCES menu_items(id)
);


DROP TABLE IF EXISTS orders;

CREATE TABLE IF NOT EXISTS orders
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_status ENUM('Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled') 
        DEFAULT 'Pending',
    total_amount DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


DROP TABLE IF EXISTS order_items;

CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price DECIMAL(10, 2) NOT NULL, 
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_id) REFERENCES menu_items(id)
);

ROLLBACK;