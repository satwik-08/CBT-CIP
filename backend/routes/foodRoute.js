import express from "express";
import { addFood , listFood , removeFood} from "../controller/foodController.js";

import multer from "multer"; //Used for image storing system

//Route method

const foodRouter=express.Router();

//Image storage engine

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()} ${file.originalname}`)

    }
})

const upload=multer({storage:storage}) //upload middleware has been created using this we can upload image


//post method --  to send the data on the server 

foodRouter.post("/add",upload.single("image"),addFood) // execute addFood file
foodRouter.get("/list",listFood) // the /list endpoint execute the listFood file
foodRouter.post("/remove",removeFood); 
 


export default foodRouter;