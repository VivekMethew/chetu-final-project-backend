const nodemailer = require("nodemailer");

// Step 1

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USERMAIL,
        pass: process.env.PASSMAIL
    }
})


module.exports = {
    sendMail: async({ toMails, subject, text }) => {
        return await new Promise((resolve, reject) => {
            // step 2
            let mailOptions = {
                from: 'vivek kumar <testdem58@gmail.com>',
                to: toMails,
                subject: subject,
                text: text
            }

            // step 3
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}