import { SmsEnum } from 'src/enums/Sms.enum';
import Sms from 'src/interfaces/Sms.interface';
import MailSlurpSms from 'src/services/mailslurp/MailSlurpSms.service';
import MessageBirdSms from 'src/services/messagebird/MessageBirdSms.service';
import PlivioSms from 'src/services/plivio/PlivioSms.service';
import TwilioSms from 'src/services/twilio/TwilioSms.service';

export default class SmsFactory {
  private static instance: Sms;

  public static Create(type: SmsEnum): Sms {
    if (this.instance) return this.instance;
    else if (type === SmsEnum.TWILIO) return new TwilioSms();
    else if (type === SmsEnum.PLIVO) return new PlivioSms();
    else if (type === SmsEnum.MESSAGE_BIRD) return new MessageBirdSms();
    else if (type === SmsEnum.MAIL_SLURP) return new MailSlurpSms();
  }
}
