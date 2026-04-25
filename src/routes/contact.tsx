import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  PhoneCall,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

/* ------------------------------------------------------------------ */
/*  Formspree — set VITE_FORMSPREE_FORM_ID in .env to enable real      */
/*  submissions. Without it the form simulates a 1.5 s delay (demo).   */
/* ------------------------------------------------------------------ */
const FORMSPREE_FORM_ID = import.meta.env.VITE_FORMSPREE_FORM_ID as
  | string
  | undefined;

const appointmentSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\-/()\s]+$/, "Enter a valid phone number"),
  email: z
    .string()
    .email("Enter a valid email address")
    .optional()
    .or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  preferredDate: z
    .string()
    .min(1, "Please choose a date")
    .refine(
      (val) => {
        const d = new Date(val + "T00:00:00");
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return d >= today;
      },
      { message: "Please choose today or a future date" },
    ),
  notes: z.string().optional(),
});

type AppointmentValues = z.infer<typeof appointmentSchema>;

/* ------------------------------------------------------------------ */
/*  Route                                                              */
/* ------------------------------------------------------------------ */

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Test — Aero Medical & Diagnostic Clinic" },
      {
        name: "description",
        content:
          "Book your medical or laboratory test at Aero Medical & Diagnostic Clinic. Walk-ins welcome, same-day results, friendly licensed team.",
      },
      {
        property: "og:title",
        content: "Book a Test — Aero Medical & Diagnostic Clinic",
      },
      {
        property: "og:description",
        content:
          "Book your medical or laboratory test. Walk-ins welcome, same-day results.",
      },
    ],
  }),
  component: ContactPage,
});

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AppointmentValues>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      service: "",
      preferredDate: "",
      notes: "",
    },
  });

  /* ---- submit handler ---- */
  const onSubmit = async (data: AppointmentValues) => {
    setSubmitError(null);

    try {
      if (FORMSPREE_FORM_ID) {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Submission failed");
      } else {
        /* Demo mode — pretend to send */
        await new Promise((r) => setTimeout(r, 1500));
      }
      setSubmitted(true);
    } catch {
      setSubmitError(
        "Something went wrong. Please try again or call us at 0927 403 3804.",
      );
    }
  };

  /* ---- scroll-to-form helper (used by "Book a Test" button in map section) ---- */
  const bookTest = () => {
    setSubmitted(false);
    setValue("service", "Basic Wellness Package");
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <SiteLayout>
      {/* ─── Hero ─── */}
      <section className="bg-hero-gradient">
        <div className="container-page py-20 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Book a test
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Reserve your visit in under a minute.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Tell us what you need and our team will confirm your appointment by
            phone or message.
          </p>
        </div>
      </section>

      {/* ─── Form + Sidebar ─── */}
      <section
        ref={formRef}
        id="appointment-form"
        className="py-20 sm:py-24 scroll-mt-24"
      >
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10">
              {submitted ? (
                /* ── Success state ── */
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold">
                    Request received!
                  </h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thank you. Our team will reach out shortly to confirm your
                    appointment details.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      reset();
                    }}
                    className="mt-6 inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-5"
                  noValidate
                >
                  <h2 className="font-display text-2xl font-semibold">
                    Appointment request
                  </h2>

                  {/* Global error banner */}
                  {submitError && (
                    <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                      {submitError}
                    </div>
                  )}

                  {/* Name + Phone */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      required
                      error={errors.fullName?.message}
                    >
                      <input
                        {...register("fullName")}
                        aria-invalid={errors.fullName ? "true" : undefined}
                        type="text"
                        className="form-input"
                        placeholder="Juan Dela Cruz"
                      />
                    </Field>
                    <Field
                      label="Phone number"
                      required
                      error={errors.phone?.message}
                    >
                      <input
                        {...register("phone")}
                        aria-invalid={errors.phone ? "true" : undefined}
                        type="tel"
                        className="form-input"
                        placeholder="0917 000 0000"
                      />
                    </Field>
                  </div>

                  {/* Email */}
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      aria-invalid={errors.email ? "true" : undefined}
                      type="email"
                      className="form-input"
                      placeholder="you@example.com"
                    />
                  </Field>

                  {/* Service + Date */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field
                      label="Service / package"
                      required
                      error={errors.service?.message}
                    >
                      <select
                        {...register("service")}
                        aria-invalid={errors.service ? "true" : undefined}
                        className="form-input"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Select a service
                        </option>
                        <option>Basic Wellness Package</option>
                        <option>Executive Check-up</option>
                        <option>Pre-Employment Package</option>
                        <option>Drug Test</option>
                        <option>ECG / Chest X-Ray</option>
                        <option>Other / not sure</option>
                      </select>
                    </Field>
                    <Field
                      label="Preferred date"
                      required
                      error={errors.preferredDate?.message}
                    >
                      <input
                        {...register("preferredDate")}
                        aria-invalid={errors.preferredDate ? "true" : undefined}
                        type="date"
                        className="form-input"
                      />
                    </Field>
                  </div>

                  {/* Notes */}
                  <Field label="Notes (optional)">
                    <textarea
                      {...register("notes")}
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Any specific tests or special requirements?"
                    />
                  </Field>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      "Request appointment"
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to be contacted by our team about
                    your appointment.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* INFO SIDEBAR */}
          <aside className="space-y-5 lg:col-span-5">
            <InfoCard icon={PhoneCall} title="Call us">
              <a
                href="tel:+639274033804"
                className="block hover:text-foreground"
              >
                0927 403 3804
              </a>
              <a
                href="tel:+639306518366"
                className="block hover:text-foreground"
              >
                0930 651 8366
              </a>
            </InfoCard>
            <InfoCard icon={MessageCircle} title="Chat">
              <p>
                Message us on{" "}
                <a
                  href="https://www.facebook.com/aeromedclinic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  Facebook
                </a>{" "}
                for the fastest reply during clinic hours.
              </p>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a
                href="mailto:hello@aeromedical.ph"
                className="hover:text-foreground"
              >
                hello@aeromedical.ph
              </a>
            </InfoCard>
            <InfoCard icon={MapPin} title="Visit the clinic">
              <p>San Isidro, Davao Region, Philippines</p>
            </InfoCard>
            <InfoCard icon={Clock} title="Clinic hours">
              <p>Monday – Saturday</p>
              <p>7:00 AM – 5:00 PM</p>
              <p className="text-muted-foreground">Closed Sundays & holidays</p>
            </InfoCard>
          </aside>
        </div>
      </section>

      {/* ─── Map ─── */}
      <section className="pb-20 sm:pb-24">
        <div className="container-page">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Find us
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
                Visit our clinic
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                Conveniently located in San Isidro, Davao Region. Walk-ins
                welcome during clinic hours.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={bookTest}
                className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110"
              >
                Book a Test
              </button>
              <a
                href="https://www.google.com/maps/search/?api=1&query=San+Isidro+Davao+Oriental+Philippines"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
              >
                Get directions
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
            <iframe
              title="Aero Medical & Diagnostic Clinic location"
              src="https://www.google.com/maps?q=San+Isidro+Davao+Oriental+Philippines&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* ─── Form input styles ─── */}
      <style>{`
        .form-input {
          width: 100%;
          height: 2.75rem;
          padding: 0 0.875rem;
          border-radius: 0.625rem;
          border: 1px solid var(--color-border);
          background: var(--color-background);
          color: var(--color-foreground);
          font-size: 0.875rem;
          transition: border-color .15s, box-shadow .15s;
          outline: none;
        }
        textarea.form-input { height: auto; padding: 0.75rem 0.875rem; }
        .form-input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 15%, transparent);
        }
        .form-input[aria-invalid="true"] {
          border-color: var(--color-destructive);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-destructive) 15%, transparent);
        }
      `}</style>
    </SiteLayout>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label}{" "}
        {required && <span className="text-primary">*</span>}
      </span>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </label>
  );
}

function InfoCard({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="text-sm leading-relaxed text-foreground">
          <p className="font-semibold">{title}</p>
          <div className="mt-1 text-muted-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
}
