import mongoose, { Schema } from "mongoose";


const blackListedTokenSchema = new Schema({
        tokenId:{
            type:String,
            unique:true,
            required:true
        },
        expirationDate:{
            type:Date,
            required:true
        },
        userId:{
            type:mongoose.Types.ObjectId,
            required:true,
            ref:'users'
        }
})

const blackListedTokensModel = mongoose.model('blakcListedTokens',blackListedTokenSchema)


export default blackListedTokensModel;