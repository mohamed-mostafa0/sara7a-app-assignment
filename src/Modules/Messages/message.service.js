import { create, findOne } from "../../DB/dbService.js"
import messageModel from "../../Models/message.model.js"
import userModel from "../../Models/user.model.js"
import successRes from "../../Utils/successResponse.js"




export const sendMessage = async(req , res , next)=>{
    const {content} = req.body
    console.log(content);
    
    const {receiverId} = req.params

    if(! await findOne({model:userModel , filter:{_id:receiverId}})) return next(new Error('User Not Found' ,{cause:404}))
    
        const message = await create({model:messageModel , data:[{content , receiverId}]})

        successRes({res , statusCode:200 , data:message , message:'Message Sent Successfully'})
}



export const getMessages = async ( req ,res ,next)=>{

    const messages = await messageModel.find().populate([
        {
            path:'receiverId',
            select:'firstName lastName'
        }
    ])

    successRes({res , statusCode:200 , data:messages , message:"found"})
}