import { getAllRestaurantsWithDishes } from "../service/restaurant.service.js";

export const getRestaurantsWithDishes = async (req, res) => {
  try {
    const data = await getAllRestaurantsWithDishes();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
