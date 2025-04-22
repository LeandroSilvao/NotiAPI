import EmailEnum from 'src/enums/Email.enum';
import Email from 'src/interfaces/Email.interface';
import AWSEmail from 'src/services/aws/AWSEmail.service';
import MailSlurpEmail from 'src/services/mailslurp/MailSlurpEmai.service';
import NodeMailerEmail from 'src/services/nodemailer/NodeMailerEmail.service';

export default class EmailFactory {
  private static instance: Email;

  public static Create(type: EmailEnum): Email {
    if (this.instance) return this.instance;
    else if (type === EmailEnum.AWS) return new AWSEmail();
    else if (type === EmailEnum.NODEMAILER) return new NodeMailerEmail();
    else if (type === EmailEnum.MAIL_SLURP) return new MailSlurpEmail();
  }
}
