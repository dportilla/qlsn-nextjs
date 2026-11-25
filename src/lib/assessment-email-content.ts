import type { z } from 'zod';
import type { assessmentSchema } from './assessment-schema';

export type Assessment = z.infer<typeof assessmentSchema>;

export function detailsFor({
  firstName,
  lastName,
  email,
  phone,
  subject,
}: Assessment) {
  return [
    ['Nombre', `${firstName} ${lastName}`],
    ['Correo', email],
    ['Teléfono', phone || 'No indicado'],
    ['Asunto', subject],
  ];
}

export function assessmentEmailText(assessment: Assessment) {
  const details = detailsFor(assessment);
  return `QUALYSYN · NUEVA SOLICITUD DE EVALUACIÓN\n\nRecibiste una nueva solicitud desde el sitio web.\n\nDATOS DE CONTACTO\n${details.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nMENSAJE\n${assessment.message}\n\nResponde a este correo para contactar a la persona que envió la solicitud.`;
}
