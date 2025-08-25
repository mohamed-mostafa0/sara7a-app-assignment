
import  joi  from "joi";
import { generalFields } from "../../Middlewares/validation.middleware.js";



export const signUpValidation = {
    body: joi.object({
        firstName: generalFields.firstName.required(),
        lastName: generalFields.lastName.required(),
        email: generalFields.email.required(),
        password: generalFields.password.required(),
        phone: generalFields.phone,
        gender: generalFields.gender,
        role: generalFields.role
    })   
}