import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Clock, Mail, MapPin, MessageCircle, PhoneCall } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Test — Aero Medical & Diagnostic Clinic" },
      {
        name: "description",
        content:
          "Book your medical or laboratory test at Aero Medical & Diagnostic Clinic. Walk-ins welcome, same-day results, friendly licensed team.",
      },
      { property: "og:title", content: "Book a Test — Aero Medical & Diagnostic Clinic" },
      {
        property: "og:description",
        content: "Book your medical or laboratory test. Walk-ins welcome, same-day results.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [service, setService] = useState("");

  const bookTest = () => {
    setSubmitted(false);
    setService("Basic Wellness Package");
    requestAnimationFrame(() => {
      document.getElementById("appointment-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };


  return (
    <SiteLayout>
      <section className="bg-hero-gradient">
        <div className="container-page py-20 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            Book a test
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Reserve your visit in under a minute.
          </h1>
          <p className="mt-5 max-w-xl text-muted-foreground">
            Tell us what you need and our team will confirm your appointment by phone or message.
          </p>
        </div>
      </section>

      <section id="appointment-form" className="py-20 sm:py-24 scroll-mt-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          {/* FORM */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-10">
              {submitted ? (
                <div className="flex flex-col items-center py-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success/15 text-success">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold">Request received!</h2>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thank you. Our team will reach out shortly to confirm your appointment details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex h-11 items-center rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
                  >
                    Submit another
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="grid gap-5"
                >
                  <h2 className="font-display text-2xl font-semibold">Appointment request</h2>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" required>
                      <input
                        required
                        type="text"
                        className="form-input"
                        placeholder="Juan Dela Cruz"
                      />
                    </Field>
                    <Field label="Phone number" required>
                      <input
                        required
                        type="tel"
                        className="form-input"
                        placeholder="0917 000 0000"
                      />
                    </Field>
                  </div>

                  <Field label="Email">
                    <input type="email" className="form-input" placeholder="you@example.com" />
                  </Field>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Service / package" required>
                      <select required className="form-input" defaultValue="">
                        <option value="" disabled>Select a service</option>
                        <option>Basic Wellness Package</option>
                        <option>Executive Check-up</option>
                        <option>Pre-Employment Package</option>
                        <option>Drug Test</option>
                        <option>ECG / Chest X-Ray</option>
                        <option>Other / not sure</option>
                      </select>
                    </Field>
                    <Field label="Preferred date" required>
                      <input required type="date" className="form-input" />
                    </Field>
                  </div>

                  <Field label="Notes (optional)">
                    <textarea
                      rows={4}
                      className="form-input resize-none"
                      placeholder="Any specific tests or special requirements?"
                    />
                  </Field>

                  <button
                    type="submit"
                    className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110"
                  >
                    Request appointment
                  </button>
                  <p className="text-xs text-muted-foreground">
                    By submitting, you agree to be contacted by our team about your appointment.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* INFO */}
          <aside className="space-y-5 lg:col-span-5">
            <InfoCard icon={PhoneCall} title="Call us">
              <a href="tel:+639274033804" className="block hover:text-foreground">0927 403 3804</a>
              <a href="tel:+639306518366" className="block hover:text-foreground">0930 651 8366</a>
            </InfoCard>
            <InfoCard icon={MessageCircle} title="Chat">
              <p>Message us on Facebook for the fastest reply during clinic hours.</p>
            </InfoCard>
            <InfoCard icon={Mail} title="Email">
              <a href="mailto:hello@aeromedical.ph" className="hover:text-foreground">
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

      {/* MAP */}
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
                Conveniently located in San Isidro, Davao Region. Walk-ins welcome during clinic hours.
              </p>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=San+Isidro+Davao+Oriental+Philippines"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center rounded-full border border-border px-5 text-sm font-medium hover:bg-muted"
            >
              Get directions
            </a>
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
      `}</style>
    </SiteLayout>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-foreground">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
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
