const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }
    async sendCred(to, login, password) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject: 'Данные для входа на ' + process.env.CLIENT_URL,
            text: '',
            html:
                `
                    <div>
                        <h1>Ваши данные для авторизации в системе оповещения сотрудников компании</h1>
                        <p>Логин: ${login}</p>
                        <p>Пароль: ${password}</p>
                    </div>
                `
        });
    }
}

module.exports = new MailService();