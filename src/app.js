import express from 'express';
import searchRoutes from "./routes/search.routes.js";
import restaurantRoutes from './routes/restaurant.routes.js';
const app = express();

app.use(express.json());

app.use("/search", searchRoutes);
app.use("/restaurants", restaurantRoutes);

export default app;