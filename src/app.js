import express from 'express';
import searchRoutes from "./routes/search.routes.js";
import restaurantRoutes from './routes/restaurant.routes.js';
import userRoute from './routes/user.routes.js';

const app = express();

app.use(express.json());

app.use("/search", searchRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/user", userRoute)

app.get("/", (req, res) => {
    res.send("Hello world");
})

export default app;