import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from "stripe";

//placing user order   
const placeOrder = async(req,res)=>{
    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})
        res.json({success:true,message:"Order placed Successfully"});
    } catch (error) {
        res.json({success:false,message:"Order failed"});
    }

}
//user orders for frontend

const userOrders = async (req,res)=>{
    try {
        console.log(req.body.userId);
        let orders = await orderModel.find({userId:req.body.userId});
        console.log(orders);
        res.json({success:true,data:orders});
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"}) 
        
    }
}

const listOrders = async(req,res)=>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//updating order status

const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {placeOrder,userOrders,listOrders,updateStatus};