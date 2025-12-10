import bcrypt from 'bcrypt';
import { getPool } from '../config/db.js';

export const hashPassword = async (password) => {
    let saltrounds = 10;
    return await bcrypt.hash(password, saltrounds);
}


async function getUserHashedPassword(username){
    if (!username){
        return null;
    }

    const [ row ] = await getPool().query(
        `SELECT password from users where username = ?`, [username]
    )

    return row?.[0]?.password ?? null; 
}

export const checkPassword = async (username, plainPassword) => {
    const hashedPassword = await getUserHashedPassword(username);
    if(!hashedPassword){
        console.log("user not found");
        return false;
    }

    return await bcrypt.compare(plainPassword, hashPassword);
}