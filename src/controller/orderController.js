import {createOrderService, myOrdersService} from '../service/orderService.js';

export const orderController = async (req, res) => {    
    const {user_id, orders} = req.body;
    const response = await createOrderService(user_id, orders);
    console.log(response);
    if(!response.success){
        return res.status(res.status).json({"message": response.message});
    }

    return res.status(201).json({message: response.message, data : response.data});
}

export const myOrderController = async (req, res) => {
    const userId = req.params.userid;
    const response = await myOrdersService(userId);
    if(!response.success){
        return res.status(response.status).json({message: response.error});
    }

    res.status(200).json({success: response.success, message: response.message, data: response.data}); 
}