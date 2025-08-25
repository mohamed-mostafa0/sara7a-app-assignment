import { Router } from "express";
import * as userServices from './user.service.js'
import { authentictionMiddleware } from "../../Middlewares/authentication.middleware.js";
import athorizationMiddleware from "../../Middlewares/authorization.middleware.js";
import { roles } from "../../Models/user.model.js";
import { validationMiddleware } from "../../Middlewares/validation.middleware.js";
import { updatePasswordValidation } from "./user.validation.js";

const userController = Router()

userController.get('/getProfile' , authentictionMiddleware ,athorizationMiddleware({accessRoles:[roles.user , roles.admin]}),userServices.getUser)

userController.post('/logout', authentictionMiddleware,athorizationMiddleware({accessRoles:[roles.user , roles.admin]}),userServices.logout)

userController.patch('/updateUser', authentictionMiddleware ,athorizationMiddleware({accessRoles:[roles.user , roles.admin]}),userServices.updateUser )

userController.post('/refresh-token' ,athorizationMiddleware({accessRoles:[roles.user , roles.admin]}), userServices.refreshToken)

userController.delete('/delete-user' , authentictionMiddleware , athorizationMiddleware({accessRoles:[roles.user , roles.admin]}), userServices.deleteUser)

userController.patch('/update-password', authentictionMiddleware ,athorizationMiddleware({accessRoles:[roles.user , roles.admin]}) ,validationMiddleware(updatePasswordValidation), userServices.updatePassword)


export default userController;