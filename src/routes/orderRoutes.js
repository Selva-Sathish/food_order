import express from 'express';
import {orderController, myOrderController} from '../controller/orderController.js';

const router = express.Router();

router.post("/checkout", orderController);
router.get("/:userid", myOrderController)

export default router;