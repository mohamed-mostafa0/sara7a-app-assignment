import mongoose from "mongoose";
import { create,  findOne, findOneAndDelete, findOneAndUpdate } from "../../DB/dbService.js"
import messageModel from "../../Models/message.model.js";
import userModel from "../../Models/user.model.js"
import { decrypt } from "../../Utils/encryption.utils.js"
import successRes from "../../Utils/successResponse.js"
import { signToken, verifyToken } from "../../Utils/token.utils.js";
import blackListedTokensModel from "./../../Models/black-listed-tokens.model.js";
import { v4 as uuidv4 } from 'uuid';
import { compare } from "../../Utils/hash.utils.js";
import { hash } from "./../../Utils/hash.utils.js";








export const getUser = async(req,res,next)=>{   
    
    // console.log(user);
    
    
    req.loggedInUser.user.phone = decrypt( req.loggedInUser.user.phone)

    return successRes({res, message:'user found' , data:{user:req.loggedInUser} , statusCode:200})
}


export const logout = async(req ,res ,next)=>{
    

    
    const expirationDate = new Date(req.loggedInUser.token.expirationDate * 1000)

    const blacklistedTokens = await create({model:blackListedTokensModel , data:[{
        tokenId:req.loggedInUser.token.tokenId,
        expirationDate,
        userId:req.loggedInUser.user._id
    }]})

    successRes({res , statusCode:200 , message:"logged out successfully" , data:blacklistedTokens})
}


export const  updateUser = async (req ,res ,next)=>{
  
    const {_id} = req.loggedInUser

    if(req.body.email){
        if(await findOne({model:userModel , filter:{email:req.body.email}})) return next(new Error('Email Already Exist' , {cause:409}))
    }

    const updated = await findOneAndUpdate({model:userModel , filter:{_id} , dataToUpdate:{...req.body}})

    successRes({res , statusCode:200 , message:'user updated successfully' , data:updated})
}


export const refreshToken = async( req , res, next)=>{
    const {authorization} = req.headers
    const decodedToken = verifyToken(authorization)

    const accessToken = signToken({payload:{_id:decodedToken._id} , options:{issuer:"sara7a App" ,expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRES_IN , jwtid:uuidv4()}})

    successRes({res, statusCode:200 , data:accessToken , message:'Token is refreshed successfully'})
}

export const deleteUser = async(req , res , next)=>{

    const session = await mongoose.startSession()
    req.session = session
  
    const {_id} = req.loggedInUser.user

    session.startTransaction()
    
    const deleted = await userModel.findOneAndDelete({_id} ).session(session)

    const messages = await messageModel.deleteMany({receiverId:_id} ).session(session)
    console.log(messages);
    

    await session.commitTransaction()
    session.endSession()

    if(!deleted) return next(new Error('User Not Found' , {cause:404}))

    successRes({res , statusCode:200 , message:'user deleted successfully' , data:deleted})

   

}

export const updatePassword = async(req ,res ,next)=>{

    const {_id , password } = req.loggedInUser.user
    const {newPassword , oldPassword} = req.body

    if(!(await compare({plainText:oldPassword , hashedValue:password }))) return next(new Error('Invalid old password'))

    
    const user = await findOneAndUpdate({model:userModel , filter:{_id} , dataToUpdate:{password:await hash({plainText:newPassword})}})

    
    return successRes({res , statusCode:200 , message:'password updated successfully' , data:user})

}