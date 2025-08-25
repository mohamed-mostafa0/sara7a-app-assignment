import  joi  from "joi";
import { genderObj, roles } from "../Models/user.model.js";




export const generalFields = {
    firstName:joi.string().min(3).max(20).messages({
        'string.min': 'First name must be at least 3 characters',
        'string.max': 'First name must be at most 20 characters',
        'any.required': 'First name field is required'}),
    lastName:joi.string().min(3).max(20).messages({
        'string.min': 'Last name must be at least 3 characters',
        'string.max': 'Last name must be at most 20 characters',
        'any.required': 'Last name field is required'}),
    email: joi.string().email({tlds:{allow:['com', 'net', 'org' , 'edu']} , minDomainSegments:2}).messages({
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email field is required'
    }),
    password:joi.string(),
    phone:joi.string().pattern(/^(\+2)?01[0125][0-9]{8}$/).messages({
        'string.pattern.base': 'Phone number must be a valid international format'}), 
    gender:joi.string().valid(genderObj.male , genderObj.female).messages({
        'object.unknown':'Gender must be either male or female'
    }),
    role:joi.string().valid(roles.user , roles.admin).default('USER').messages({
        'any.only':'Role must be either USER or ADMIN'})
}




export const validationMiddleware = (schema)=>{
        return (req , res , next)=>{
            const validationErrors = []

            // console.log(schema);
            for (const key of Object.keys(schema)) {
                
                const validationResult = schema[key].validate(req[key], { abortEarly: false }); 
                if (validationResult.error) {
                    // return res.status(400).json({msg: "Validation error", errors: validationResult.error});
                    validationErrors.push({key , errors:validationResult.error.details})
                }

            }
            if(validationErrors.length){
                return res.status(400).json({validationError:validationErrors})
                
            }
              
           
            return next()
        }
}






