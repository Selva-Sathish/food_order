import {connectDB, getPool} from '../config/db.js';

await connectDB();

async function generateSchema() {

    const conn = await getPool().getConnection();
    
    try{
        await conn.beginTransaction();
          const[row] = await conn.query(
            `CREATE TABLE IF NOT EXISTS restaurants 
            (id INT PRIMARY KEY AUTO_INCREMENT, name varchar(50) UNIQUE, address TEXT, rating DECIMAL(2,1));`
        )

        console.log("restaurant table created");

        await conn.query(
            `CREATE TABLE IF NOT EXISTS menu_items
            (
                id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) NOT NULL,
                restaurant_id int NOT NULL,
                in_stock enum('Available', 'Not Available') DEFAULT 'Not Available',
                price DECIMAL(6, 2) NOT NULL,
                order_count int DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) 
            );`
        )
        console.log(
            "menu item table was created."
        )

        await conn.query(
            `CREATE TABLE IF NOT EXISTS users
            (
                id INT PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(225) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                
                mobile VARCHAR(20),
                address TEXT
            );`
        )
        console.log(
            "user table was created."
        )

        await conn.query(
            `CREATE TABLE IF NOT EXISTS orders
            (
                id INT PRIMARY KEY AUTO_INCREMENT,
                user_id INT NOT NULL,
                order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                delivery_status ENUM('Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled') 
                    DEFAULT 'Pending',
                FOREIGN KEY (user_id) REFERENCES users(id)
            );`
        )
        console.log(
            "orders table was created."
        )

        await conn.query(
            `CREATE TABLE IF NOT EXISTS order_items (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_id INT NOT NULL,
                menu_id INT NOT NULL,
                quantity INT NOT NULL DEFAULT 1,
                FOREIGN KEY (order_id) REFERENCES orders(id),
                FOREIGN KEY (menu_id) REFERENCES menu_items(id)
            );`
        )
        console.log(
            "orders items table was created."
        )

    }   
    catch (err){
        await conn.rollback();
        console.log("Error while insert");

    }
    finally{
        await conn.commit();
    }
    
}

await generateSchema();