//Controller acts as intermediary b/w model and view

import foodModel from "../models/foodModel.js";
import fs from 'fs'

//add food item
//controller function to add food item
//store the product data in database

const addFood=async(req,res)=>{

    let image_filename =`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try {
        await food.save(); //Using this save method food item will be saved in database
        res.json({success:true,message:"Food Added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

//whenever we hit this api  we will send the above details and we will access it in the backend using this function

//all food list
const listFood=async(req,res)=>{
    try {
        const foods=await foodModel.find({})
        res.json({success:true,data:foods})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item

const removeFood=async(req,res)=>{
    try {
        //To get the food id to be removed from database
        const food=await foodModel.findById(req.body.id);
        //To remove the food image from database
        fs.unlink(`uploads/${food.image}`,()=>{})
        //To remove product details from database
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Removed"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addFood,listFood,removeFood}