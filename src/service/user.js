import { hashPassword } from '../utils/password.js';
import { getPool } from '../config/db.js';

async function createUser(username, password, mobile = null, address = null){
    const hashedPassword = await hashPassword(password);
    const [ rows ] = await getPool().query(
        `INSERT INTO users (username, password, mobile, address) VALUE (?, ?, ?, ?)`,
        [username, hashedPassword, mobile, address]
    );
    return rows?.insertId;
}


async function getUserByUsername(username) {
    const [ row ] = await getPool().query(
        `SELECT username, address, mobile from users where username = ? LIMIT 1`,
        [username]
    )

    return row[0];
}


async function getUserByID(userId) {
    const [ row ] = await getPool().query(
        `SELECT username, address, mobile from users where id = ? LIMIT 1`,
        [userId]
    )
    return row[0];
}

export {createUser, getUserByID, getUserByUsername};