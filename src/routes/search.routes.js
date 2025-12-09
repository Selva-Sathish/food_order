import express from "express";
import { getDishes } from "../controller/search.controller.js";

const router = express.Router();

router.get("/dishes", getDishes);

export default router;
