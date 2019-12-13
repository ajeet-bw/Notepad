const sgMail = require('@sendgrid/mail')
const apiKey = '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'
sgMail.setApiKey(apiKey)
const Mail = (name, to, password, subject) => {
    sgMail.send({
        to: to,
        from: 'ajeetkumar99190@gmail.com',
        subject: subject,
        text: `Dear ${name},
        
        Welcome to Notepad App
        Please insure your login credentials below
        Email : ${to}
        Password : ${password}
        
        Thanks and Regard
        
        Team Notepad.`
    })
}

const loginMail = (to, subject) => {
    sgMail.send({
        to: to,
        from: 'ajeetkumar99190@gmail.com',
        subject: subject,
        text: `You are loggedin to Notepad App
        
        Time : ${new Date()}
        
        Thanks and Regards
        
        Team Notepad.`
    })
}

module.exports = { Mail, loginMail }