const sgMail = require('@sendgrid/mail');

export default async function sendVerificationEmail(to, token) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const hostUrl = process.env.hostURL;
    const msg = {
        to: to,
        from: 'support@gmail.com',			//sender's email
        subject: 'Verification code to signUp',//Subject
        text: "Your verify registration url: ",
        html: `Click on this link to verify your email ${hostUrl}/users/verifyRegistration?token=${token}&email=${to}`
    };

    sgMail.send(msg);
}