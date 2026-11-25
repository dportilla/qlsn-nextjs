import { z } from 'zod';

const requiredText = (max: number) =>
  z.string().trim().min(1, 'required').max(max, 'tooLong');

export const assessmentSchema = z.object({
  firstName: requiredText(100),
  lastName: requiredText(100),
  email: z
    .string()
    .trim()
    .min(1, 'required')
    .max(254, 'tooLong')
    .pipe(z.email('invalidEmail')),
  phone: z.string().trim().max(30, 'tooLong'),
  subject: requiredText(150).refine(
    (value) => !/[\r\n]/.test(value),
    'invalidSubject',
  ),
  message: requiredText(5000),
});
