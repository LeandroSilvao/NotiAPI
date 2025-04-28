export class NotifyResponse {
  sent: number;
  errors: number;
  channels: Array<{
    name: string;
    success: boolean;
    error?: string;
  }>;

  constructor() {
    this.sent = 0;
    this.errors = 0;
    this.channels = [];
  }

  addSuccess(channelName: string) {
    this.sent++;
    this.channels.push({ name: channelName, success: true });
  }

  addError(channelName: string, errorMessage: string) {
    this.errors++;
    this.channels.push({
      name: channelName,
      success: false,
      error: errorMessage,
    });
  }
}
