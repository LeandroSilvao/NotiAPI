import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import Email from 'src/interfaces/Email.interface';

@Injectable()
export default class NodeMailerEmail implements Email {
  private transporter = createTransport({
    service: 'Outlook',
    auth: {
      user: '',
      pass: '',
    },
  });
  
  async notify(message: string, from: string, to: string): Promise<object> {
    try {
      const info = await this.transporter.sendMail({
        from: "Leandro",
        to,
        subject: 'Nova Notificação',
        text: message,
        html: `<p>${message}</p>`,
      });

      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
      };
    }
  }
}
