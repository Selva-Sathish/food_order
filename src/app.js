import express from 'express';
import cookieParser from 'cookie-parser';

import searchRoutes from "./routes/search.routes.js";
import restaurantRoutes from './routes/restaurant.routes.js';
import userRoute from './routes/user.routes.js';
import authRoute from './routes/authRoutes.js';
import orderRoute from './routes/orderRoutes.js';

const app = express();

app.use(cookieParser())
app.use(express.json());

app.use("/auth", authRoute);
app.use("/search", searchRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/user", userRoute);
app.use("/order", orderRoute);

// demo app
app.get("/", async (req, res) => {
    return res.send("Hello World");
})
export default app;