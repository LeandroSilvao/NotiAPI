export default interface Email {
  notify(message: string, from: string, to: string): Promise<object>;
}
