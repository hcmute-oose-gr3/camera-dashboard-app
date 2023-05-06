import {createTransport} from "nodemailer"
import {EMAIL_SERVER_USER} from "$env/static/private"
import {EMAIL_SERVER_PASSWORD} from "$env/static/private"

export const transporter = createTransport({
    host: 'smtp.gmail.com',
	port: 587,
    auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
    }
})
