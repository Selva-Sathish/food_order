import { getPool } from "../config/db.js";
import { ServiceResponse } from "./serviceResponse.js";
import { getUserByID } from "./user.js";

export async function createOrderService(user_id, orders) {
    const user = await getUserByID(user_id);

    if (!user){
        return ServiceResponse.fail("user is not found", 404, null);
    }

    let cnx;
    try{
        cnx = await getPool().getConnection();
        
        cnx.beginTransaction();

        const [order] = await cnx.query(
            `INSERT INTO orders (user_id) VALUE (?)`, [user_id]
        );

        const orderID = order.insertId;
        for(let ords of orders){
            const [orderItems] = await cnx.query(
                `INSERT INTO order_items (order_id, menu_id, quantity) VALUE (?, ?, ?)`,
                [orderID, ords.menu_id, ords.quantity]             
            )
        }
        cnx.commit();
        return ServiceResponse.success({data: orderID}, "Order Created successfully");
    }
    catch (err){
        cnx.rollback();
        return ServiceResponse.fail(err.sqlMessage || err.message || "Order failed", 404, err);
    }
    finally{
        cnx.release();
    }
}

export async function myOrdersService(userId) {
    try {
        const [ orders ] = await getPool().query(
            `SELECT 
                m.name AS dishName,
                o.delivery_status AS status,
                oi.quantity,
                (m.price * oi.quantity) AS price
                FROM orders o
                LEFT JOIN order_items oi
                ON o.id = oi.order_id
                LEFT JOIN menu_items m
                ON m.id = oi.menu_id
                WHERE o.user_id = ? 
            `, [userId]
        );
    
        return ServiceResponse.success(orders, "Successfully retrieved");        
    } catch (error) {
        console.log(error);
        return ServiceResponse.fail(error.message || "Error Occurred", 404, error);
    }
}