import {faker} from '@faker-js/faker';
import fs from 'fs';
import path from 'path';
import {southIndianDishes} from './dishes.js';

const RESTAURANT_COUNT = 100;
const ITEM_PER_RESTAURANT = 5;

async function generateRestaurants(){
    const restaurants = [];
    const usedName = new Set();
    
    while(restaurants.length < RESTAURANT_COUNT){
        let companyName = faker.company.name().slice(0, 50);
        if(usedName.has(companyName)) continue;
        
        usedName.add(companyName);

        restaurants.push({
            companyName,
            address: faker.location.streetAddress(true),
            rating: faker.number.float({min: 3, max: 5, fractionDigits: 1})
        })

    }
    return restaurants;
}

async function generateMenuItems(restaurantsCount) {
    const menuItems = [];

    for (let i = 1; i <= restaurantsCount; i++) {
        // add all dishes for each restaurant
        for (const dish of southIndianDishes) {
            menuItems.push({
                name: dish,
                restaurant_id: i,
                in_stock: faker.helpers.arrayElement(["Available", "Not Available"]),
                price: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
                order_count: faker.number.int({ min: 0, max: 500 })
            });
        }
    }

    return menuItems;
}

function saveJSON(data, fileName) {
    const filePath = path.join(process.cwd(), fileName);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Generated:", fileName);
}

async function generate() {
    console.log("Generating large dataset...");

    const restaurants = await generateRestaurants();
    const menuItems = await generateMenuItems(restaurants.length);

    saveJSON(restaurants, "restaurants.json");
    saveJSON(menuItems, "menu_items.json");

    console.log("Data generation completed!");
}

generate();
