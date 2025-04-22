import Sms from 'src/interfaces/Sms.interface';

export default class TwilioSms implements Sms {
  notify(message: string): Promise<object> {
    throw new Error('Method not implemented.');
  }
}
