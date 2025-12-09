import { Router } from "express";
import { getRestaurantsWithDishes } from "../controller/restaurant.controller.js";

const router = Router();

router.get("/with-dishes", getRestaurantsWithDishes);

export default router;
