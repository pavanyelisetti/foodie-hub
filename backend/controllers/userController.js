import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login user
const loginUser = async (req, res) => {
    const email= req.body.email;
    const password=req.body.password;
    try{
    const response= await userModel.findOne({email});
    console.log(response);
    if(!response)
    {
        return res.json({success:false,message:"User not found"});
    }
    const isMatch= await bcrypt.compare(password,response.password);
    if(!isMatch)
    {
        return res.json({success:false,message:"Invalid Credentials"});
    }
    const token= createToken(response._id);
    res.json({success:true,token,message:"Login Successful"});
}
catch(error)
{
    console.log("Error");
    res.json({success:false,message:"Error"})
}
   

}

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

//Signup user
const signUpUser = async (req, res) => {
    const { name, email, mobile, password, confirm_password } = req.body;
    console.log(req.body);
    try {
        const response = await userModel.findOne({ email });
        const nresponse = await userModel.findOne({ mobile });
        if (response) {
            return res.json({ success: false, message: "User Already exists" });
        }
        if(nresponse)
        {
            return res.json({ success: false, message: "Mobile Number Already exists" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }
        if (password !== confirm_password) {
            return res.json({ success: false, message: "password and confirm_password are different" });
        }
        if (String(mobile).length > 10) {
            return res.json({ success: false, message: "Please enter a Valid mobile" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            mobile: mobile,
            password: hashedPassword,
        })
        const user = await newUser.save();
        console.log(user._id);
        const token = createToken(user._id);
        res.json({ success: true, token,message:"Account Created Succesfully" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { loginUser, signUpUser }
