'use client';

import { useForm } from '@tanstack/react-form';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { sendAssessment } from '@/app/[locale]/assessment/actions';
import { assessmentSchema } from '@/lib/assessment-schema';

export function AssessmentForm() {
  const t = useTranslations('assessment');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      setStatus('idle');
      const result = assessmentSchema.safeParse(value);
      if (!result.success) {
        const nextErrors: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const field = String(issue.path[0]);
          if (!nextErrors[field]) nextErrors[field] = issue.message;
        }
        setErrors(nextErrors);
        return;
      }
      setErrors({});
      try {
        const response = await sendAssessment(result.data);
        if (response.status !== 'success') {
          setStatus('error');
          return;
        }
        form.reset();
        setStatus('success');
      } catch {
        setStatus('error');
      }
    },
  });
  const fields = [
    {
      name: 'firstName',
      type: 'text',
      autoComplete: 'given-name',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      autoComplete: 'family-name',
      required: true,
    },
    { name: 'email', type: 'email', autoComplete: 'email', required: true },
    { name: 'phone', type: 'tel', autoComplete: 'tel', required: false },
    { name: 'subject', type: 'text', autoComplete: 'off', required: true },
  ] as const;

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-20">
      <div className="relative min-h-80 overflow-hidden rounded-3xl bg-neutral-200 lg:min-h-full">
        <Image
          src="/healthcare-partner.avif"
          alt={t('imageAlt')}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading="eager"
          className="object-scale-down sm:object-cover"
        />
        <div className="absolute inset-x-4 bottom-4 rounded-3xl bg-neutral-950/80 p-6 text-white backdrop-blur-sm sm:p-8">
          <p className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {t('imageTitle')}
          </p>
          <p className="mt-3 text-sm text-white/80">{t('imageDescription')}</p>
        </div>
      </div>
      <div>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-4 text-muted-foreground">{t('description')}</p>
        <form
          className="mt-8 grid gap-x-4 gap-y-5 sm:grid-cols-2"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          {fields.map(({ name, type, autoComplete, required }) => (
            <form.Field key={name} name={name}>
              {(field) => (
                <div className={name === 'email' ? 'sm:col-span-2' : ''}>
                  <label
                    htmlFor={field.name}
                    className="mb-2 block text-sm font-semibold"
                  >
                    {t(name)}
                    {required && ' *'}
                  </label>
                  <input
                    id={field.name}
                    name={field.name}
                    type={type}
                    autoComplete={autoComplete}
                    required={required}
                    aria-invalid={!!errors[name]}
                    aria-describedby={
                      errors[name] ? `${name}-error` : undefined
                    }
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(event) => field.handleChange(event.target.value)}
                    className="h-14 w-full rounded-full border border-transparent bg-neutral-100 px-5 outline-none focus-visible:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                  />
                  {errors[name] && (
                    <p
                      id={`${name}-error`}
                      className="mt-2 text-sm text-red-700"
                    >
                      {t(`errors.${errors[name]}` as 'errors.required')}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          ))}
          <form.Field name="message">
            {(field) => (
              <div className="sm:col-span-2">
                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-semibold"
                >
                  {t('message')} *
                </label>
                <textarea
                  id={field.name}
                  name={field.name}
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  rows={4}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                  className="w-full rounded-3xl border border-transparent bg-neutral-100 px-5 py-4 outline-none focus-visible:border-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-900/20"
                />
                {errors.message && (
                  <p id="message-error" className="mt-2 text-sm text-red-700">
                    {t(`errors.${errors.message}` as 'errors.required')}
                  </p>
                )}
              </div>
            )}
          </form.Field>
          <div className="sm:col-span-2">
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-950 disabled:cursor-wait disabled:opacity-60"
                >
                  {isSubmitting ? t('sending') : t('submit')}
                </button>
              )}
            </form.Subscribe>
            {status === 'success' && (
              <p role="status" className="mt-3 text-sm text-green-700">
                {t('success')}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="mt-3 text-sm text-red-700">
                {t('sendError')}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
