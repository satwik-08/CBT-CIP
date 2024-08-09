import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModel=mongoose.model.user||mongoose.model("user",userSchema); //If the model is already there it will use that model otherwise it will create new model

export default userModel;