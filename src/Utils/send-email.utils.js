import nodemailer from 'nodemailer'
import { EventEmitter } from 'node:events'


export const  sendEmail = async ({to , subject , content , attachments =[]})=>{
    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth:{
            user:process.env.SEND_EMAIL_FROM,
            pass:'lpimvavthgtoisxz'
        }
    })


    const info = await transporter.sendMail({
        from:process.env.SEND_EMAIL_FROM,
        to,
        subject,
        html:content,
        attachments
    })

    console.log(info);
    

    return info
}


export const emitter = new EventEmitter()


emitter.on('sendEmail' , (args)=>{
    sendEmail(args)
    
})