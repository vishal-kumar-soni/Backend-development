import express from 'express';
const app = express();
import twilio from 'twilio'
import dotenv from 'dotenv';
import cors from 'cors'

app.use(cors({
    origin: "http://127.0.0.1:5500",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/send-sms', async (req, res) => {
    const { number, message } = req.body;

    try {
        const result = await client.messages.create({
            body: message, // Cannot use my own message when using free service of twilio
            from: process.env.TWILIO_PHONE_NUMBER,
            to: number,
        });

        res.status(200).json({
            success: true,
            sid: result.sid,
            message: "Message sent successfully",
        });

        console.log(message.body);

    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            message: "SMS could't sent",
            error: error.message
        });
    }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})