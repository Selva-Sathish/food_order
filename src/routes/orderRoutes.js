import express from 'express';
import {order} from '../controller/orderController.js';

const router = express.Router();

router.post("/checkout", order);

export default router;