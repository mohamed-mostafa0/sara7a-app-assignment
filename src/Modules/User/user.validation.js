
import  joi  from "joi";
import { generalFields } from "../../Middlewares/validation.middleware.js";

export const updatePasswordValidation = {
    body:joi.object({
        oldPassword:generalFields.password.required(),
        newPassword:generalFields.password.not(joi.ref('oldPassword')).required().messages({
            'any.invalid': 'New password must be different from old password'}), 
        confirmPassword:joi.string().required().valid(joi.ref('newPassword')).messages({
            'any.only': 'Confirm password must match new password'
        })
    })
}