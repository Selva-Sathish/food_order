import express from 'express';
import {orderController, myOrderController, addCart} from '../controller/orderController.js';

const router = express.Router();

router.post("/checkout", orderController);
router.get("/:userid", myOrderController);
router.post("/add-cart", addCart);

export default router;