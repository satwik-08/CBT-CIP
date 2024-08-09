import userModel from "../models/userModel.js"

//add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId); //while finding the user the userid is same as req.body.userID that we can get using middleware we will send token that token converted into id in middleware
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId])
         {
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId]+=1 //If already there we will increment
        }

        //when item added to cart we need to update users cart with new cart data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData}); //update the cart data in database
        res.json({success:true,message:"Added to Cart"});

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let userData=await userModel.findById(req.body.userId); // we will get this from middleware
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0) //If the item is there in cart or not
        {
            cartData[req.body.itemId]-=1; //If the item is there
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

//detch user cart data
const getCart = async (req, res) => {
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData; //user cart data will be stored in cartdata variable
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

export { addToCart, removeFromCart, getCart }