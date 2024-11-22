import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'f11nanceapp@gmail.com',
        pass: 'uvlm etnw covb yala'
    }
})


export const mailSender = async (email, code) => {
    const mailOptions = {
        from: 'f11nanceapp@gmail.com',
        to: email,
        subject: 'Your code to financary',
        text: code
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error
        } else {
            return 'Email sent: ' + info.response
        }
    });
}

export const sendContactMail = async (email, message) => {
    const mailOptions = {
        from: 'f11nanceapp@gmail.com',
        to: 'vasapanov721@gmail.com',
        subject: 'Your question from financary',
        text: `From: ${email}. Message: ${message}`
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            return error
        } else {
            return 'Email sent: ' + info.response
        }
    });
}