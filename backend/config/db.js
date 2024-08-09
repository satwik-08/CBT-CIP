//Develop the logic used to connect with the database

import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://satumandalemula:Satwik1@cluster0.gigys76.mongodb.net/Food-delivery-app').then(()=>console.log("DB Connected"));
}