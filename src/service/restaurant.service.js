import { getPool } from "../config/db.js";

export const getAllRestaurantsWithDishes = async () => {
  const pool = getPool();

  const query = `
    SELECT 
      r.id AS restaurantId,
      r.name AS restaurantName,
      r.address AS city,
      mi.id AS dishId,
      mi.name AS dishName,
      mi.price AS dishPrice
    FROM restaurants r
    LEFT JOIN menu_items mi ON mi.restaurant_id = r.id
    ORDER BY r.id;
  `;

  const [rows] = await pool.query(query);

  const restaurants = [];

  let map = new Map();

  for (const row of rows) {
    if (!map.has(row.restaurantId)) {
      map.set(row.restaurantId, {
        id: row.restaurantId,
        name: row.restaurantName,
        city: row.city,
        dishes: []
      });
      restaurants.push(map.get(row.restaurantId));
    }

    if (row.dishId) {
      map.get(row.restaurantId).dishes.push({
        id: row.dishId,
        name: row.dishName,
        price: row.dishPrice
      });
    }
  }

  return restaurants;
};
