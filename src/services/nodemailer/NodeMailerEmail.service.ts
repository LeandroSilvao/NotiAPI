import Email from 'src/interfaces/Email.interface';

export default class NodeMailerEmail implements Email {
  notify(message: string, from: string, to: string): Promise<object> {
    throw new Error('Method not implemented.');
  }
}
