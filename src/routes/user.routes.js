import express from 'express';
import { register } from '../controller/user.controller.js';

const routs = express.Router()

routs.get("/register", register);

export default routs;