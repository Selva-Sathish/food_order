# 🍽️ Foodie API – Node.js + Express + MySQL

A clean and well-structured backend API for managing restaurants, menu items, and simple orders (one item per order).  
Includes database seeding, environment variables, and search functionality.

---

## 🚀 Features

- Restaurant management  
- Menu item (dishes) management  
- Search dishes by name & price range  
- Simple order system  
- Database seeders  
- MySQL connection pool  
- Clean layered architecture (controllers, services, routes)

---

## 📁 Project Structure

foodie/
│
├── src/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ ├── services/
│ ├── routes/
│ ├── seeder/
│ │ ├── seed.js
│ │ ├── restaurants.json
│ │ ├── menu_items.json
│ │ └── orders.json
│ └── app.js
│
├── package.json
├── README.md
└── .env

 
---

## 🛠️ Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/foodie.git
cd foodie

2️⃣ Install dependencies

npm install

3️⃣ Add environment variables

Create a .env file:

DB_HOST=localhost
DB_USER=sathish
DB_PASSWORD=sathish@123
DB_NAME=food
DB_PORT=3306
PORT=3000

4️⃣ Create the database

CREATE DATABASE foodie;
USE foodie;

5️⃣ Seed the database

npm run seed

6️⃣ Start the server

npm start

Now the API runs at:
http://localhost:3000

🍽️ Restaurants
Get all restaurants with dishes

GET /restaurants/with-dishes

🍛 Menu Items (Dishes)
Search dishes

GET /search/dishes?name=biryani&minPrice=150&maxPrice=300


🧱 Tech Stack
Node.js

Express.js

MySQL

mysql2 (Promise API)

dotenv / dotenvx

JSON-based seeders

✨ Future Enhancements

JWT authentication

Pagination

Multi-item orders

Restaurant/dish images

Swagger documentation

Docker support

support

👨‍💻 Author

Selva Sathish
Full Stack Developer – India 🇮🇳

