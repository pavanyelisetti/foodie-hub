import userModel from "../models/userModel.js"


//Add to cart

const addToCart = async (req,res)=>{
    try{
    let userdata = await userModel.findById(req.body.userId);
    let cartData = await userdata.cartData;
    console.log(cartData);
    if(!cartData[req.body.itemId])
    {
        cartData[req.body.itemId]=1;
    }
    else{
        cartData[req.body.itemId]+=1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added to cart"});
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
   
}

//Remove Items
const removeFromCart= async(req,res)=>{
    try {
        let userdata= await userModel.findById(req.body.userId);
        let cartData = await userdata.cartData;
        console.log(userdata.mobile);
        
        if(cartData[req.body.itemId]>0)
        {
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
         res.json({success:true,message:"Removed from cart"});
        
    } catch (error) {
        console.log(error);
         res.json({success:false,message:"Error"})   
    }

}

//getItems

const getCart = async (req,res)=>{
    try {
        let userdata= await userModel.findById(req.body.userId);
        let cartData= await userdata.cartData;
        console.log(cartData);
        res.json({success:true,cartData});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

export{addToCart,removeFromCart,getCart};