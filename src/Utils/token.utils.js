
import  jwt  from "jsonwebtoken";



export const signToken = ({payload = {} , signature = process.env.SIGNATURE, options = {}})=>{
    return jwt.sign(payload , signature , options)
}


export const verifyToken = (token = '' , signature = process.env.SIGNATURE) =>{
    return jwt.verify(token , signature)
}