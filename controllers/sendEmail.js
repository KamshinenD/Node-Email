// const nodemailer= require('nodemailer');


// const sendEmail=async (req,res)=>{
//     let testAccount= await nodemailer.createTestAccount();
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         host: 'smtp.gmail.com',
//         port: 587,
//         secure:false,
//         auth: {
//             user: 'kamshinendeewan@gmail.com',
//             pass: 'hfveblwjzlxtvhjr'
//         }
//     });

//     let info = await transporter.sendMail({
//         from: '"Deewan Consult" <kamshinendeewan@gmail.com>',
//         to: "kjoeldewan@gmail.com, kamshinen.dewan@sterling.ng", 
//         subject: "TEST REQUEST FOR USER DATA",
//         html: "<h2>Sending Emails with Nodejs</h2>",
//       });

//     res.json(info)
// };




// module.exports=sendEmail


// const nodemailer = require('nodemailer');

// const sendEmail = async (req, res) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: 'gmail',
//             host: 'smtp.gmail.com',
//             port: 587,
//             secure: false,
//             auth: {
//                 user: 'kamshinendeewan@gmail.com',
//                 pass: 'hfveblwjzlxtvhjr'
//             }
//         });

//         const recipients = ["kjoeldewan@gmail.com", "kamshinen.dewan@sterling.ng", 'kamshinenjoeldewan@gmail.com'];

//         for (const recipient of recipients) {
//             let info = await transporter.sendMail({
//                 from: '"Deewan Consult" <info@deewan.com>',
//                 to: recipient,
//                 subject: "TEST2 REQUEST FOR USER DATA",
//                 html: "<p>Sending Emails with Nodejs</p>",
//             });

//             console.log(`Email sent to ${recipient}: ${info.response}`);
//         }

//         res.json({ message: 'Emails sent successfully' });
//     } catch (error) {
//         console.error('Error sending emails:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// };

// module.exports = sendEmail;




const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const sendEmail = async (req, res) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            // credentials are just for test purpose and should be in .env file in the real sense
            auth: {
                user: 'kamshinendeewan@gmail.com',
                pass: 'hfveblwjzlxtvhjr'
            }
        });

        const recipients = ["kjoeldewan@gmail.com", "kamshinen.dewan@sterling.ng"];

        for (const recipient of recipients) {
            // Read the HTML template file
            const templatePath = path.join(__dirname, 'emailTemplate.html');
            const templateContent = fs.readFileSync(templatePath, 'utf-8');

            // Replace placeholder with recipient's name or any other dynamic content
            const emailBody = templateContent.replace('{{recipient}}', recipient);

            let info = await transporter.sendMail({
                from: '"Deewan Consult" <kamshinendeewan@gmail.com>',
                to: recipient,
                subject: "TEST REQUEST FOR USER DATA",
                html: emailBody,
            });

            console.log(`Email sent to ${recipient}: ${info.response}`);
        }

        res.json({ message: 'Emails sent successfully' });
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = sendEmail;
