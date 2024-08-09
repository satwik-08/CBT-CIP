import jwt from "jsonwebtoken"

//This middleware takes the token and convert userid and using tat user id we can get add or revoke the data from cart

const authMiddleware=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const token_decode=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=token_decode.id; 
        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export default authMiddleware;