import mongoose, { mongo } from "mongoose";


const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,
            {serverSelectionTimeoutMS:1000}
        )
        console.log("connected to DB");

    }catch(error){
        console.log("ERROR CONNECTING TO DB:",error);
        
    }
   
    
}


export default connectDB;