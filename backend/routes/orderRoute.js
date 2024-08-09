import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userOrders } from "../controller/orderController.js"
import { verifyOrder } from "../controller/orderController.js"

//using express we will create router
const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder);
orderRouter.post("/verify",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter;

