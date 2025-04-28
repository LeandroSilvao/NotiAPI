class ChannelResponseDto {
  name: string;
  success: boolean;
  error?: string;
}

export class NotifyResponseDto {
  sent: number;
  errors: number;
  channels: ChannelResponseDto[];
}
