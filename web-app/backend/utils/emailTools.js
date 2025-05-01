import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const EMAIL = process.env.EMAIL_ADDY;
const PASS = process.env.EMAIL_PASS;

export async function sendVerificationEmail(toEmail, verificationCode) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL,
            pass: PASS   
        }
    });

    const mailOptions = {
        from: EMAIL,
        to: toEmail,
        subject: 'Account Verification',
        text: `Your verification code is ${verificationCode}. Please enter it in the web-app to verify your account.`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent');
    } catch (err) {
        console.error('Error sending email', err);
    }
};

export function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}