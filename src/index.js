import express from 'express'
import authController from './Modules/Auth/auth.controller.js'
import userController from './Modules/User/user.controller.js'
import messageController from './Modules/Messages/message.controller.js'
import connectDB from './DB/connection.js'
import globalErrorHandling from './Utils/errorHandling.utils.js'


const app = express()

const startApp = ()=>{
    app.use(express.json())

    connectDB()

    app.use('/api/auth',authController)
    app.use('/api/user',userController)
    app.use('/api/message',messageController)


    app.all('/*dummy' , (req,res,next)=>{
        return next(new Error('Page Not Found' ,{cause:404}))
    })


    app.use(globalErrorHandling)

}


startApp()





app.listen(process.env.PORT || 5200,()=>{
    console.log('running');
    
})