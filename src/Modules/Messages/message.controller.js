import { Router } from "express";
import * as messageServices from './message.service.js'

const messageController = Router()

messageController.post('/send-message/:receiverId',messageServices.sendMessage)

messageController.get('/', messageServices.getMessages)



export default messageController;