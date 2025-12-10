import {loginService, registerService} from '../service/authService.js';

export const login = async (req, res) => {
    const {username, password} = req.body;

    const logincheck = await loginService(username, password);
    
    if(logincheck.success){
        res.cookie("refreshToken", logincheck.data.accesstoken, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 90 * 24 * 60 * 60 * 1000
        })
        res.status(200).json({ refreshtoken: logincheck.data.refreshtoken });
    }

    return res.status(logincheck.status).json({message : logincheck.message});
}

export const register = async (req, res) => {
    const data = req.body;
    const response = await registerService(data);

    if(response.status){
        return res.status(response.status || 400).json({message: response.message})
    }
    
    return res.status(201).json({message: response.message, data: response.data});
}