import { createTransport } from 'nodemailer';

export const transporter = createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD
	}
});
