import nodemailer,{createTransport, Transporter} from 'nodemailer'

import ejs from 'ejs'
import path from 'path'

interface EmailOption{
    email:string
    subject:string
    template:string
    data:{[key:string]:any}
}

const sendMail = async(options:EmailOption):Promise<void> =>{
    const transport:Transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_Service,
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD
        }
    })

    const {email,subject,template,data} = options

    const templatePath = path.join(__dirname,'../mails',template);

    const html:string = await ejs.renderFile(templatePath,data)

    const mailOption = {
        from:process.env.SMTP_MAIL,
        to:email,
        subject,
        html
    }

    await transport.sendMail(mailOption)

}


export default sendMail