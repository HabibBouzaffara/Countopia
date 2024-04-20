import nodemailer from "nodemailer";

// Function to generate OTP
const generateOTP = () => {
    let otp = '';
    for (let i = 0; i < 4; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

// Function to configure mail transport
const mailTransport = (to, subject, html) => {
    return nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD
        }
    });
}

const generateVerificationEmailHTML = (username, verificationCode) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                align-items: center;
            }
            h2 {
                color: #333;
                text-align:center;
            }
            p {
                color: #666;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hello, ${username}!</h2>
            <p>Welcome to Countopia. To complete your registration, please verify your email:</p>
            <h3>Your verification code : ${verificationCode}</h3>
        </div>
    </body>
    </html>
    `;
};

const verifiedEmailHTML = (heading,message) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                align-items: center;
            }
            h2 {
                color: #333;
                text-align:center;
            }
            p {
                color: #666;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>${heading}</h2>
            <h3>${message}</h3>
        </div>
    </body>
    </html>
    `;
};

const generateActivationEmailHTML = (username) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 20px auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                align-items: center;
            }
            h2 {
                color: #333;
                text-align:center;
            }
            p {
                color: #666;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Hello, ${username}!</h2>
            <h3>Your are welcome to Sign in </h3>
            <h4>Welcome to Countopia. Your account is now approved</h4>
            
        </div>
    </body>
    </html>
    `;
};



export {verifiedEmailHTML,generateVerificationEmailHTML, generateOTP, mailTransport,generateActivationEmailHTML };
