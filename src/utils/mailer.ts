import nodemailer from 'nodemailer'
import { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } from '@/config/env'

let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
})

interface EmailParams {
  to: string
  subject: string
  html: string
}

const sendEmail = async ({ to, subject, html }: EmailParams) => {
  try {
    const result = await transporter.sendMail({
      from: `Company <admin@test.com>`,
      to, // list of receivers
      subject, // Subject line
      html, // html body
    })
    return { success: true, message: 'Email enviado' }
  } catch (err) {
    console.log(err)
    return { success: false, message: 'Error al enviar el email', error: err }
  }
}

export default sendEmail
