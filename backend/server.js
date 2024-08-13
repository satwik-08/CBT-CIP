import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"

//appconfig

const app=express()
const port=process.env.PORT||4000;

//middleware
app.use(express.json()) //whenever we get the request from the backend , that will be parsed (resolved into components) using json

app.use(cors()) //we can access backend from any frontend

//db connection
connectDB();

//api endpoints
app.use("/api/food",foodRouter) // If we want to access this endpoint ("api/food/add(in foodroute.js)") for uploading the image logic
app.use("/images",express.static('uploads')) //if we want to access this image in the frontend we will use this endpoint ("/images/") and the image name
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)


app.get("/",(req,res)=>{ //get is http method by using this we can request data from the server
    res.send("API Working")  //whenever we open "/" endpoint we will get msg API Working
}) 



//Run the express server
app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)  //whenver server is running successfuly we will get this msg in console
})

//Notes
//...................................................................................................
//We will check the api working or not in thunderclient by entering the port number (http://locahost:4000/)
//for database we will use mongodb atlas database
//Mongoose - It acts as a frontend for mongodb , a NOSQL database