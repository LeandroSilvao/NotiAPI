import { z } from 'zod';

export const NotifyRecipientType = {
  EMAIL: 'email',
  MOBILE: 'mobile',
} as const;

export type NotifyRecipientType =
  (typeof NotifyRecipientType)[keyof typeof NotifyRecipientType];

export const NotifyRecipientDtoSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal(NotifyRecipientType.EMAIL),
    value: z.string().email('Invalid email address'),
  }),
  z.object({
    type: z.literal(NotifyRecipientType.MOBILE),
    value: z.string().regex(/^[0-9]{10,15}$/, {
      message: 'Invalid mobile number',
    }),
  }),
]);

export const NotifyDtoSchema = z.object({
  user: z.string().uuid('Invalid user uuid id'),
  channels: z.array(z.string().uuid('Each channel must be a valid UUID')),
  to: z
    .array(NotifyRecipientDtoSchema)
    .nonempty('At least one recipient is required'),
  message: z.string().min(1, 'Message is required'),
});

export type RecipientDto = z.infer<typeof NotifyRecipientDtoSchema>;
export type NotifyDto = z.infer<typeof NotifyDtoSchema>;
