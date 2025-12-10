import bcrypt from 'bcrypt';
import { getPool } from '../config/db.js';
import {getUserByUsername} from '../service/user.js';

export const hashPassword = async (password) => {
    let saltrounds = 10;
    return await bcrypt.hash(password, saltrounds);
}


export async function getUserHashedPassword(username){
    if (!username){
        return null;
    }

    const [ row ] = await getPool().query(
        `SELECT password from users where username = ?`, [username]
    )

    return row?.[0]?.password ?? null; 
}
