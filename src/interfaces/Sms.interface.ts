export default interface Sms {
  notify(message: string): Promise<object>;
}
