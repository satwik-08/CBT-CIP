import mongoose from "mongoose";

//create a schema where we describe the food model properties

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String,required:true}
})

//using this schema we create model

const foodModel = mongoose.models.food || mongoose.model("food",foodSchema) //It can create model only once. But if we run this file again it will create the model again
//So we keep mongoose.models.food || -- if this model is already there it is already used if it is not there it will create a new model

export default foodModel;