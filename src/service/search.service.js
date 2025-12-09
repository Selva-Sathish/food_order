import { getPool } from "../config/db.js";

export const searchDishes = async (name, minPrice, maxPrice) => {
  const pool = getPool();

  let query = `
    SELECT 
      r.id AS restaurantId,
      r.name AS restaurantName,
      r.address AS city,
      mi.name AS dishName,
      mi.price AS dishPrice,
      COUNT(oi.id) AS orderCount
    FROM menu_items mi
    JOIN restaurants r ON mi.restaurant_id = r.id
    LEFT JOIN order_items oi ON oi.menu_item_id = mi.id
    WHERE 1=1
  `;

  const params = [];

  // Search by dish name
  if (name) {
    query += " AND mi.name LIKE ?";
    params.push(`%${name}%`);
  }

  // Minimum price
  if (minPrice) {
    query += " AND mi.price >= ?";
    params.push(minPrice);
  }

  // Maximum price
  if (maxPrice) {
    query += " AND mi.price <= ?";
    params.push(maxPrice);
  }

  query += `
    GROUP BY r.id, r.name, r.address, mi.name, mi.price
    ORDER BY orderCount DESC
    LIMIT 10;
  `;

  const [rows] = await pool.query(query, params);
  return rows;
};
