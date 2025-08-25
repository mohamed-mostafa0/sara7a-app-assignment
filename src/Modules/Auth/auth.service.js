import { create, findOne } from "../../DB/dbService.js";
import userModel from "../../Models/user.model.js";
import successRes from "../../Utils/successResponse.js";
import { compare , hash} from "../../Utils/hash.utils.js";
import { encrypt } from "../../Utils/encryption.utils.js"
import { signToken } from "../../Utils/token.utils.js";
import { v4 as uuidv4 } from 'uuid';
import { emitter, sendEmail } from "../../Utils/send-email.utils.js";
import { customAlphabet } from "nanoid";




export const signUp = 
    async(req,res,next)=>{
        const  uniqueString = customAlphabet('fzkpio290nqwe53' , 5)
    
        const {firstName , lastName , email , password , phone , gender ,role} = req.body

        if(await findOne({model:userModel , filter:{email} })) return next(new Error('Email Already Exist',{cause:409}) )
            
        const encryptedPhone = encrypt(phone)
        const hashedPassword = await hash({plainText:password })


        const otp = uniqueString()

       const user = await create({model:userModel , data:[{
            firstName,lastName,email,password:hashedPassword,phone:encryptedPhone,gender , role , otps:{confirmation: await hash({plainText:otp})}
        }]})


        //  sendEmail({
        //     to:email,
        //     subject:'confirmation Email',
        //     content:
        //     `<h1>Your  confirmation otp is: ${otp}</h1>`
        // })
        emitter.emit('sendEmail',{
            to:email,
            subject:'confirmation Email',
            content:
            `<h1>Your  confirmation otp is: ${otp}</h1>`
        })

        return successRes({res , statusCode:201 , message:'User Created Successfully' , data:user})

    
}



export const confirmationEmail = async(req, res , next)=>{
    const {email , otp} = req.body

    const user = await findOne({model:userModel , filter:{email , isConfirmed :false}})
    if(!user) return next(new Error('User not found or already confirmed' , {cause:400}))

    const otpIsMatched = await compare({plainText:otp , hashedValue:user.otps?.confirmation})
    if(!otpIsMatched) return next(new Error('Invalid otp' , {cause:400})) 

    user.isConfirmed = true
    user.otps.confirmation = undefined

    await  user.save()
    return successRes({res , statusCode:200 , message:'Email Confirmed Successfully'})
}




export const login = 
    async (req,res,next)=>{
   
        const {email,password} = req.body
        const user = await findOne({model:userModel , filter:{email }})
        if(!user) return next(new Error('Invalid email or password',{cause:404}))

        
        if(!(await compare({plainText:password , hashedValue: user.password}))) return next(new Error('Invalid credentials',{cause:401}))

            
            const accessToken = signToken({payload:{_id:user._id} , options:{issuer:"sara7a App" ,expiresIn:process.env.JWT_ACCESS_TOKEN_EXPIRES_IN , jwtid:uuidv4()}})
            const refreshToken = signToken({payload:{_id:user._id} , options:{issuer:"sara7a app" , expiresIn:process.env.JWT_REFRESH_TOKEN_EXPIRES_IN }})

            return successRes({res , statusCode:200 , message:'User Logged In Successfully',data:{accessToken , refreshToken}})


            

    
}

