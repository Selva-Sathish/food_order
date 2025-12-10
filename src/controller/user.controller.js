import { getUserByID, getUserByUsername, createUser } from '../service/user.js';


export const register = async (req, res) => {
    const { username, password} = req.body;
    const create = await createUser(username, password);
    res.send(await getUserByID(create));
}