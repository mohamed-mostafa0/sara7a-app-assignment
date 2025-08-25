import mongoose, { Schema } from "mongoose";


const messageSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},
{
    timestamps:true
})


const messageModel = mongoose.model('messages' , messageSchema)


export default messageModel;