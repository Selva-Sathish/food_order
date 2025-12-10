CREATE DATABASE food;

USE food;

START TRANSACTION;

DROP TABLE IF EXISTS restaurants;

CREATE TABLE IF NOT EXISTS restaurants 
(id INT PRIMARY KEY AUTO_INCREMENT, name varchar(50) UNIQUE, address TEXT, rating DECIMAL(2,1));

-- INSERT INTO restaurants (name, address, rating) VALUES
-- ('Spice Villa', '12 MG Road, Bangalore, Karnataka', 4.5),
-- ('Ocean Breeze', 'Beach Road, Vizag, Andhra Pradesh', 4.2),
-- ('Royal Dine', 'Anna Salai, Chennai, Tamil Nadu', 4.8),
-- ('Punjabi Tadka', 'Sector 17, Chandigarh', 4.3),
-- ('The Urban Cafe', 'Baner Road, Pune, Maharashtra', 4.6);



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

-- INSERT INTO menu_items (name, restaurant_id, in_stock, price) VALUES
-- -- Spice Villa (id = 1)
-- ('Paneer Butter Masala', 1, 'Available', 220.00),
-- ('Veg Biryani', 1, 'Available', 180.00),
-- ('Gulab Jamun', 1, 'Not Available', 90.00),

-- -- Ocean Breeze (id = 2)
-- ('Grilled Fish', 2, 'Available', 350.00),
-- ('Prawn Curry', 2, 'Available', 420.00),
-- ('Lemon Soda', 2, 'Not Available', 60.00),

-- -- Royal Dine (id = 3)
-- ('Chicken Tikka', 3, 'Available', 300.00),
-- ('Butter Naan', 3, 'Available', 40.00),
-- ('Mango Lassi', 3, 'Not Available', 120.00),

-- -- Punjabi Tadka (id = 4)
-- ('Amritsari Kulcha', 4, 'Available', 160.00),
-- ('Chole Bhature', 4, 'Available', 140.00),
-- ('Sweet Lassi', 4, 'Available', 80.00),

-- -- The Urban Cafe (id = 5)
-- ('Cold Coffee', 5, 'Available', 150.00),
-- ('Cheese Sandwich', 5, 'Available', 180.00),
-- ('French Fries', 5, 'Not Available', 110.00);


DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(225) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    
    mobile VARCHAR(20),
    address TEXT
);

-- INSERT INTO users(username, password, mobile, address) VALUE
-- ('admin', '$2b$10$iu6sSFnjaYJvk5qVvaib2u0Qo93cO6lNIa0sPKpnefjxpB4mSvDKO', '12234567890', 'ABC City');

DROP TABLE IF EXISTS orders;

CREATE TABLE IF NOT EXISTS orders
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_status ENUM('Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled') 
        DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES users(id)
);


DROP TABLE IF EXISTS order_items;

CREATE TABLE IF NOT EXISTS order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (menu_id) REFERENCES menu_items(id)
);

ROLLBACK;