import jwt from 'jsonwebtoken';

export async function refreshTokenHandler(req, res){
    const token = req.cookie?.refreshToken;

    if(!token){
        return res.status(401).json({message: "Refresh Token Missing."})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err){
            return res.status(401).json({ message: 'Invalid or expired refresh token' })
        }

        const newAccessToken = jwt.sign(
            {
                sub: decode.sub,
                role: decode.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '15m'
            }
        );

        return res.send({accessToken: newAccessToken});
    })
}

async function getExpiry(type) {
    return (type === "access") ? "15m" : "90 days";
}

export const createToken = async (username, type="access") => {
    if(type !== "access" && type !== "refresh"){
        throw new TypeError("type must be access or refresh");
    }
    
    if(!username){
        throw new Error("user should be valid");
    }

    const payload = {
        sub: username,
        role: "consumer"
    }
    
    const expiry = await getExpiry(type);

    const secret = process.env.JWT_SECRET;

    return jwt.sign(payload, secret, {
        expiresIn: expiry
    });
}