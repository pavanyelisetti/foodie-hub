import mongoose, { Mongoose } from "mongoose";

export const connectToDB= async ()=>{
    await mongoose.connect('mongodb+srv://sriramyelisetti9:R9hahhwp58ZCqCEH@cluster0.a7hsw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("Database Connected"));
}