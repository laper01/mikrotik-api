
import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});


const userSchema = z.object({
    auth: z.object({
      token: z.string(),
      type: z.literal('Bearer'),
    }),
    userState: z.object({
      name: z.string(),
      id: z.number(),
      email: z.string().email(),
      email_verified_at: z.string(),
    }),
  });

  // Type inference
export type userInType = z.infer<typeof userSchema>;

export type LoginFormInputs = z.infer<typeof loginSchema>;
