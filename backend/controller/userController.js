import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken" //jwt for authentication
import bcrypt from "bcrypt"
import validator from "validator"

//login user
const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    try {
        //whether one user is avaliable with that emailid
        const user =await userModel.findOne({email});  //If any account is available with this emailid it will store in the user variable

        if(!user){ //If we dont have any user with the above emailid
            return res.json({success:false,message:"User doesn't exist"})
        }

        //If we are getting the user check the password

        const isMatch=await bcrypt.compare(password,user.password); //It will compare user entering the current password and the password that was stored int the datbase

        if(!isMatch){
            return res.json({success:false,message:"Invalid credentials"})
        }

        //If the password is matching we will generate the tokem
        const token=createToken(user._id);
        res.json({success:true,token})
    

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//create a token send that token using response to the user
const  createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET) //TAKEN THE USER ID AND GENERATES THE TOKEN USEING THIS FUNCTION
}

//register user
const registerUSer=async(req,res)=>{
    const {name,password,email}=req.body;
    try {
        //Checking is user already exists by using findOne of email from userModel.js
        const exists=await userModel.findOne({email});
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }

        //validating email format & strong password
        if(!validator.isEmail(email)){ //Checks the user email is valid or not
            return res.json({success:false,message:"Please enter a valid email"}) //If the email is not valid
        }

        //checks password length > 10
        if(password.length<8){
            return res.json({success:false,message:"Please enter a strong password"})
        }

        //If all the above if statements doesn't execute that is all the details are correct

        //before creating account we need to encrypt the password
        //hashing user passowrd by using bcrypt
        const salt=await bcrypt.genSalt(10) 
        const hashedPassword= await bcrypt.hash(password,salt) //The password has been hashed -- It has been encrypted with a sort of string and letters

        //create new user
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //save the user in the database
        const user=await newUser.save() //saved in the user varaible

        //Take the user id and generate token
        const token=createToken(user._id) //Token will be generated
        res.json({success:true,token}); //we will set the above token as a response
  

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export {loginUser,registerUSer}