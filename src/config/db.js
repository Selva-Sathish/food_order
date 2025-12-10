import mysql from 'mysql2/promise';
import dotenv from '@dotenvx/dotenvx';

dotenv.config();

let pool;

export const connectDB = async () => {
    pool = mysql.createPool({
        host: process.env.DB_HOST || 'localhost',
        password: process.env.DB_PASSWORD || '',
        user: process.env.DB_USER || 'root',
        database: process.env.DB_NAME || 'food',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    console.log("MySQL Pool connected");
}

export const getPool = () => pool;