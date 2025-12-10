import bcrypt from 'bcrypt';
import { hashPassword } from '../utils/password.js';
import { getPool } from '../config/db.js';
import { ServiceResponse } from './serviceResponse.js';
import { getUserHashedPassword } from '../utils/password.js';
export async function createUser(username, password, mobile = null, address = null){
    try{
        const hashedPassword = await hashPassword(password);
        const [ result ] = await getPool().query(
            `INSERT INTO users (username, password, mobile, address) VALUE (?, ?, ?, ?)`,
            [username, hashedPassword, mobile, address]
        );
        
        if(result.affectedRows == 1)
            return ServiceResponse.success({},"user account create successfully");
        
        return ServiceResponse.fail("Insert failed");
    }
    
    catch (err){
        return ServiceResponse.fail("Insertion Failed", 400, err);
    }
}


export async function getUserByUsername(username) {
    const [ row ] = await getPool().query(
        `SELECT username, address, mobile from users where username = ? LIMIT 1`,
        [username]
    )

    if(!row){
        return null;
    }

    return row[0];
}

export const checkUsernamePassword = async (username, plainPassword) => {
    const user = await getUserByUsername(username);
    
    if(!user) return false;

    const hashedPassword = await getUserHashedPassword(username);

    if(!hashedPassword){
        return false;
    }
    
    return await bcrypt.compare(plainPassword, hashedPassword);
}

export async function getUserByID(userId) {
    const [ row ] = await getPool().query(
        `SELECT username, address, mobile from users where id = ? LIMIT 1`,
        [userId]
    )
    return row[0];
}
