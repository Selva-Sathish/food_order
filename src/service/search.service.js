import { getPool } from "../config/db.js";

export const searchDishes = async (name, minPrice, maxPrice) => {
  const pool = getPool();

  let query = `
    SELECT 
      r.id AS restaurantId,
      r.name AS restaurantName,
      r.address AS city,
      mi.id AS dishId,
      mi.name AS dishName,
      mi.price AS dishPrice,
      MAX(mi.order_count) AS orderCount
    FROM menu_items mi
    JOIN restaurants r ON mi.restaurant_id = r.id
    LEFT JOIN order_items oi ON oi.menu_id = mi.id
    WHERE 1=1
  `;

  const params = [];

  // Filter by name
  if (name) {
    query += " AND mi.name LIKE ?";
    params.push(`%${name}%`);
  }

  // Min price
  if (minPrice) {
    query += " AND mi.price >= ?";
    params.push(minPrice);
  }

  // Max price
  if (maxPrice) {
    query += " AND mi.price <= ?";
    params.push(maxPrice);
  }

  query += `
    GROUP BY 
      r.id,
      r.name,
      r.address,
      mi.id,
      mi.name,
      mi.price
    ORDER BY orderCount DESC
    LIMIT 10;
  `;

  const [rows] = await pool.query(query, params);
  return rows;
};
