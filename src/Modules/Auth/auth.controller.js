import { Router } from "express";
import * as authServices from './auth.service.js'
import {validationMiddleware} from "../../Middlewares/validation.middleware.js";
import { signUpValidation } from "./auth.validation.js";

const authController = Router()


authController.post('/signup', validationMiddleware(signUpValidation), authServices.signUp)

authController.post('/login',authServices.login)

authController.post('/confirm-email' , authServices.confirmationEmail)









export default authController;