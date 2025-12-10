import { connectDB, getPool } from "../config/db.js";
import * as fs from "fs";
import food from '../data/food.js';

async function seed() {
  await connectDB();
  const hotels = JSON.parse(
    fs.readFileSync("src/data/restaurant.json", "utf8")
  );

  console.log("Starting Insert...");

  // Correct pool usage
  const conn = await getPool().getConnection();

  try {
    await conn.beginTransaction();

    // Insert hotels
    for (const h of hotels) {
      await conn.query(
        "INSERT INTO restaurants (name, address, rating) VALUES (?, ?, ?)",
        [h.name, h.location, parseFloat(h.rating)]
      );
    }

    await conn.commit();
    console.log("Data inserted successfully!");

  } catch (err) {
    await conn.rollback();
    console.error("Error inserting data:", err);
  } finally {
    conn.release(); // important
  }
}

seed();
