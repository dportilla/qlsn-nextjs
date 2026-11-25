'use server';

import { createElement } from 'react';
import { Resend } from 'resend';
import { CONTACT_INFO } from '@/constants/contact';
import { AssessmentEmail } from '@/lib/assessment-email';
import { assessmentEmailText } from '@/lib/assessment-email-content';
import { assessmentSchema } from '@/lib/assessment-schema';

export async function sendAssessment(input: unknown) {
  const parsed = assessmentSchema.safeParse(input);
  if (!parsed.success) return { status: 'invalid' as const };

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) {
    console.error('Assessment email configuration is missing', {
      missing: [
        !apiKey && 'RESEND_API_KEY',
        !from && 'RESEND_FROM_EMAIL',
      ].filter(Boolean),
    });
    return { status: 'error' as const };
  }

  const { email, subject } = parsed.data;
  const recipient = CONTACT_INFO.find((contact) => contact.name === 'Email');
  if (!recipient) {
    console.error('Assessment email recipient is not configured');
    return { status: 'error' as const };
  }

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: recipient.href.replace('mailto:', ''),
      replyTo: email,
      subject: `Solicitud de evaluación: ${subject}`,
      react: createElement(AssessmentEmail, { assessment: parsed.data }),
      text: assessmentEmailText(parsed.data),
    });
    if (error) {
      console.error('Resend rejected assessment email', {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });
      return { status: 'error' as const };
    }
    return { status: 'success' as const };
  } catch (error) {
    console.error(
      'Assessment email failed before Resend accepted it',
      error instanceof Error
        ? { name: error.name, message: error.message }
        : { type: typeof error },
    );
    return { status: 'error' as const };
  }
}
