import { connectDB, getPool } from "../config/db.js";
import * as fs from "fs";
import path from "path";

console.log("current dir", process.cwd());
async function chunkArray(arr, size){
  const result = [];

  for(let i = 0; i < arr.length; i+= size){
    result.push(arr.slice(i, i+size));
  }
  return result;
}
async function seed() {
  await connectDB();
  const hotels = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src","seeder", "restaurants.json"), "utf8")
  );

  const menuItems = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), "src","seeder", "menu_items.json"), "utf8")
  );

  console.log("Starting Insert...");

  const hotelsData = hotels.map(h => {
    return [h.companyName, h.address, h.rating]
  });
  // Correct pool usage
  const conn = await getPool().getConnection();
  const hotelChunks = await chunkArray(hotelsData, 500);
  
  try {
    await conn.beginTransaction();

    
    for (const chunk of hotelChunks) {
      await conn.query(
        "INSERT INTO restaurants (name, address, rating) VALUES ?",
        [chunk]
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
 
  const menuItemsData = menuItems.map(ele => {
    return [ele.name, ele.restaurant_id, ele.in_stock, ele.price, ele.order_count]
  }); 

  const menuItemChunk = await chunkArray(menuItemsData, 500);
  try {
    await conn.beginTransaction();

    // Insert hotels
    for (const chunk of menuItemChunk) {
      await conn.query(
        "INSERT INTO menu_items (name, restaurant_id, in_stock, price, order_count) VALUES ?",
        [chunk]
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
  