import { expect, test } from '@playwright/test';
import { assessmentSchema } from '../src/lib/assessment-schema';

const valid = {
  firstName: 'Ana',
  lastName: 'Pérez',
  email: 'ana@example.com',
  phone: '',
  subject: 'Evaluación',
  message: 'Necesitamos evaluar una sala.',
};

test('validates and trims assessment requests', () => {
  const result = assessmentSchema.safeParse({ ...valid, firstName: ' Ana ' });
  expect(result.success).toBe(true);
  if (result.success) expect(result.data.firstName).toBe('Ana');
});

test('rejects invalid requests and email header injection', () => {
  expect(
    assessmentSchema.safeParse({ ...valid, email: 'incorrecto' }).success,
  ).toBe(false);
  expect(assessmentSchema.safeParse({ ...valid, message: '  ' }).success).toBe(
    false,
  );
  expect(
    assessmentSchema.safeParse({
      ...valid,
      subject: 'Hola\nBcc: otro@example.com',
    }).success,
  ).toBe(false);
  expect(
    assessmentSchema.safeParse({ ...valid, message: 'a'.repeat(5001) }).success,
  ).toBe(false);
});
