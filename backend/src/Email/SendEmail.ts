import mail from "nodemailer";
import { SMTPConfig } from "../Config";

/**
 * @description
 * Send a email
 */
export async function SendEmail(
    reciever: string, 
    subject: string, 
    body: {
        isHTML: boolean;
        body: any;
        attachments?: any;
    },
    callback?: (error: Error|null, sent: Boolean|null) => void
): Promise<Boolean | void>
{
    const config = {
        host: SMTPConfig.host,
        port: SMTPConfig.port,
        secure: SMTPConfig.secure,
        secureConnection: false,
        ignoreTLS: false,
        requireTLS: true,
        auth: {
            user: SMTPConfig.username,
            pass: SMTPConfig.password
        },
        tls: {
            rejectUnauthorized: false
        },
    }

    let email: {
        from: string;
        to: string;
        subject: string;
        text?: string;
        html?: string;
        attachments?: any;
    } = {
        from: `"Tolfix | Contribution Program" <${SMTPConfig.username}>`,
        to: `${reciever}`,
        subject: subject,
    }

    if(body.isHTML)
        email.html = body.body;

    if(!body.isHTML)
        email.text = body.body

    if(body.attachments)
        email.attachments = body.attachments;

    //@ts-ignore
    const transport = mail.createTransport(config);

    transport.sendMail(email).then(e => {
        callback ? callback?.(null, true) : Promise.resolve(true);
    }).catch(e => {
        callback ? callback?.(e, false) : Promise.resolve(false);
    });
}