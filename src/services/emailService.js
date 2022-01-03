require('dotenv').config()
import nodemailer from "nodemailer";

let getBodyHTMLEmail = (dataSend) => {
    let result = "";
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Duck2Nguyen</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
        </p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
        <div>Xin chân thành cảm ơn</div>
        `
    } else if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Duck2Nguyen</p>
        <p>Information to schedule an appointment:</p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is true, please click on the link below
        to confirm and complete the procedure to book a medical appointment.
        </p>
        <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>
        <div>Sincerely!</div>
        `
    }
    return result
}

let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Duck2Nguyen" <taikhoanemail109@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend) // html body
    });
}

let getBodyHTMLEmailRemedy = (dataSend) => {
    let result = "";
    if (dataSend.language === 'vi') {
        result = `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Duck2Nguyen thành công</p>
        <p>Thông tin đơn thuốc được gửi trong file đính kèm:</p>
        <div>Xin chân thành cảm ơn</div>
        `
    } else if (dataSend.language === 'en') {
        result = `
        <h3>Dear ${dataSend.patientName}!</h3>
        <p>You received this email because you booked an online medical appointment on Duck2Nguyen successfully</p>
        <div>Sincerely!</div>
        `
    }
    return result
}

let sendAttachEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Duck2Nguyen" <taikhoanemail109@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Phản hồi đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: [{
            filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split('base64,')[1],
            encoding: 'base64'
        }]
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttachEmail: sendAttachEmail
}