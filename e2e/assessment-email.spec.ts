import { expect, test } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { AssessmentEmail } from '../src/lib/assessment-email';
import { assessmentEmailText } from '../src/lib/assessment-email-content';

test('formats all request details safely in HTML and plain text', () => {
  const assessment = {
    firstName: 'Ana <script>',
    lastName: 'Pérez',
    email: 'ana@example.com',
    phone: '',
    subject: 'Revisión & control',
    message: 'Primera línea\nSegunda línea',
  };
  const html = renderToStaticMarkup(
    createElement(AssessmentEmail, { assessment }),
  );
  const text = assessmentEmailText(assessment);

  expect(html).toContain('Ana &lt;script&gt; Pérez');
  expect(html).not.toContain('<script>');
  expect(html).toContain('Revisión &amp; control');
  expect(html).toContain('Primera línea\nSegunda línea');
  expect(text).toContain('Teléfono: No indicado');
  expect(text).toContain('Asunto: Revisión & control');
  expect(text).toContain('Primera línea\nSegunda línea');
});
