import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"


const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

// Placing user order for frontend
const placeOrder=async(req,res)=>{

    const frontend_url="https://quickeats-food-delivery-app.onrender.com";

    //logic that we can place the order
    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,

        })
        await newOrder.save(); // save the order in the database
        //when user placed the order we need to clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        //we can create payment link using stripe -- before that we need to get the price and quantity and all details required fro payment of the product
        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name

                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session=await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,//if payment is success than we redirect
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}
const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})  
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})  
    }
}

//user order for frontend
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId}) //We will get all the orders from that particular user and store in userOrders
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})  
    }
}

//Listing orders for admin panel
const listOrders= async(req,res)=>{
    try {
        const orders=await orderModel.find({}); //using this we can get all the order data in this variable
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//api for updating order status
const updateStatus=async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status}); //our status will be updated in database
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}
