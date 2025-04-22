import { z } from 'zod';

export const NotifyDtoSchema = z.object({
  user: z.string().uuid('Invalid user uuid id'),
  channels: z.array(z.string().uuid('Each channel must be a valid UUID')),
  message: z.string().min(1, "Message is required")
});