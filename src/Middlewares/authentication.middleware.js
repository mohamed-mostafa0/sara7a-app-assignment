import { findOne } from "../DB/dbService.js"
import blackListedTokensModel from "../Models/black-listed-tokens.model.js"
import userModel from "../Models/user.model.js"
import { verifyToken } from "../Utils/token.utils.js"





export const authentictionMiddleware = async (req,res , next)=>{
    const {authorization} = req.headers
    if(!authorization) return next(new Error('Please Provide an access token' , {cause:400}))

    const decodedToken = verifyToken(authorization)
    if(!decodedToken.jti ) return next(new Error('there is no jwtId' , {cause:401}))
        
    if(await findOne({model:blackListedTokensModel , filter:{tokenId:decodedToken.jti}})) return next(new Error('Token is blacklisted' , {cause:401}))

    const user = await findOne({model:userModel , filter:{_id:decodedToken._id} })
    if(!user) return next(new Error('User Not Found' , {cause:404}))

        req.loggedInUser = {user , token:{tokenId:decodedToken.jti , expirationDate:decodedToken.exp}}

       return next()

}