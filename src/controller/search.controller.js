import { searchDishes as searchService } from "../service/search.service.js";

export const getDishes = async (req, res) => {
    // const { name, minPrice, maxPrice } = req.query;
    // const dishes = await searchService(name, minPrice, maxPrice);
    // res.json(dishes);
    return res.send("dishes");
};
