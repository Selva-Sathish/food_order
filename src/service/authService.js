import {checkUsernamePassword, getUserByUsername, createUser} from '../service/user.js';
import {ServiceResponse} from './serviceResponse.js';
import {createToken} from '../jwt/jwtUtils.js';

export const loginService = async (username, password) => {
    const isValidCredentials = await checkUsernamePassword(username, password);

    if(!isValidCredentials){
        return ServiceResponse.fail("credentials Invalid", 401);
    }
    const accessToken = await createToken(username, "access");
    const refreshToken = await createToken(username, "refresh");
    
    return ServiceResponse.success({accesstoken: accessToken, refreshtoken: refreshToken}, "login successful");
}

export const registerService = async (payload) => {
    const {username, password, address, mobile} = payload;
    const create = await createUser(username, password, mobile, address);
    return create;
}

