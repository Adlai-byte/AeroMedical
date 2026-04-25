import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ClipboardList,
  Clock,
  FlaskConical,
  HeartPulse,
  Microscope,
  PhoneCall,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TestTube,
  Users,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroImg from "@/assets/hero-clinic.jpg";
import labImg from "@/assets/lab-equipment.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aero Medical & Diagnostic Clinic — Trusted Lab Tests in Davao" },
      {
        name: "description",
        content:
          "Accurate medical and laboratory diagnostics in the Davao Region. Walk-ins welcome, same-day results, accredited team. Book your test today.",
      },
      { property: "og:title", content: "Aero Medical & Diagnostic Clinic — Trusted Lab Tests in Davao" },
      {
        property: "og:description",
        content:
          "Accurate medical and laboratory diagnostics in the Davao Region. Same-day results, accredited team.",
      },
    ],
  }),
  component: HomePage,
});

const services = [
  {
    icon: TestTube,
    name: "Clinical Chemistry",
    desc: "Lipid profile, blood sugar, kidney & liver panels with precise, fast turnaround.",
  },
  {
    icon: FlaskConical,
    name: "Hematology & Urinalysis",
    desc: "CBC, blood typing, urinalysis, and routine workups for general check-ups.",
  },
  {
    icon: Microscope,
    name: "Microbiology",
    desc: "Gram stain, culture and sensitivity, and parasitology screening.",
  },
  {
    icon: HeartPulse,
    name: "ECG & Vital Screening",
    desc: "12-lead ECG, blood pressure and oxygen monitoring with same-day reading.",
  },
  {
    icon: Syringe,
    name: "Drug & Pre-Employment Tests",
    desc: "Drug testing, medical certificates, and complete pre-employment packages.",
  },
  {
    icon: Stethoscope,
    name: "Physical Examination",
    desc: "Annual physicals with licensed physicians and personalized health advice.",
  },
];

const packages = [
  {
    name: "Basic Wellness",
    price: "₱899",
    description: "Ideal for routine check-ups and first-time visitors.",
    items: ["CBC", "Urinalysis", "Fecalysis", "Blood Typing"],
    highlight: false,
  },
  {
    name: "Executive Check-up",
    price: "₱2,499",
    description: "Our most-booked package — a complete health snapshot.",
    items: [
      "Complete Blood Count",
      "Lipid Profile",
      "FBS, BUN, Creatinine",
      "Urinalysis & Fecalysis",
      "Chest X-Ray & ECG",
      "Physical Exam",
    ],
    highlight: true,
  },
  {
    name: "Pre-Employment",
    price: "₱1,299",
    description: "Everything employers in the Davao Region require.",
    items: [
      "CBC, Urinalysis, Fecalysis",
      "Chest X-Ray",
      "Drug Test",
      "Medical Certificate",
    ],
    highlight: false,
  },
];

const trustStrip = [
  { icon: BadgeCheck, label: "DOH-Accredited Team" },
  { icon: Clock, label: "Same-Day Results" },
  { icon: ShieldCheck, label: "Strict Quality Control" },
  { icon: Users, label: "10,000+ Patients Served" },
];

const process = [
  {
    step: "01",
    title: "Book or walk in",
    desc: "Reserve a slot online or visit us during clinic hours — no long queues.",
  },
  {
    step: "02",
    title: "Sample collection",
    desc: "Quick, comfortable collection by trained medical technologists.",
  },
  {
    step: "03",
    title: "Lab analysis",
    desc: "Tests processed on calibrated equipment with strict QC protocols.",
  },
  {
    step: "04",
    title: "Get your results",
    desc: "Pick up, email or chat — most results are released the same day.",
  },
];

const testimonials = [
  {
    quote:
      "Mabilis at maayos ang serbisyo. Naka-receive ako ng results within the day. Highly recommended for pre-employment!",
    name: "Maria L.",
    role: "Patient · Davao City",
  },
  {
    quote:
      "The staff explained every test clearly and the clinic is spotless. Very professional from start to finish.",
    name: "Engr. Rommel A.",
    role: "Annual check-up",
  },
  {
    quote:
      "Affordable packages and accurate results. Our company now uses Aero for all employee medicals.",
    name: "Janine R.",
    role: "HR Manager",
  },
];

const faqs = [
  {
    q: "Do I need to fast before my blood test?",
    a: "For lipid profile and fasting blood sugar, fast for 8–12 hours. Water is allowed. For most other tests, no fasting is required.",
  },
  {
    q: "How long until I get my results?",
    a: "Most routine tests are released within the same day. Cultures and specialized panels may take 3–5 working days.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes — walk-ins are welcome Monday to Saturday, 7:00 AM to 5:00 PM. Booking ahead is faster.",
  },
  {
    q: "Do you offer corporate or pre-employment packages?",
    a: "Absolutely. We provide bulk pricing and on-site collection for companies and group bookings.",
  },
];

function HomePage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <div className="container-page relative grid gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Trusted by 10,000+ patients in the Davao Region
            </span>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
              Diagnostics you can <span className="text-primary">trust</span>,
              <br className="hidden sm:block" /> care that goes above and beyond.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Accurate laboratory tests, friendly licensed staff, and same-day results — all
              at fair, transparent prices. Book your visit in under 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110"
              >
                Book a test <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="tel:+639274033804"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground shadow-soft transition-colors hover:bg-muted"
              >
                <PhoneCall className="h-4 w-4 text-primary" />
                0927 403 3804
              </a>
            </div>

            <dl className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Patients</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">10k+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Tests offered</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">80+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">Accuracy QC</dt>
                <dd className="mt-1 font-display text-2xl font-semibold">99.8%</dd>
              </div>
            </dl>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card shadow-elevated">
              <img
                src={heroImg}
                alt="Friendly medical laboratory technician at Aero Medical & Diagnostic Clinic"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-64 rounded-2xl border border-border bg-card p-4 shadow-elevated sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-success">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Results released</p>
                  <p className="text-xs text-muted-foreground">Same-day · 92% of tests</p>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-8 hidden w-56 rounded-2xl border border-border bg-card p-4 shadow-elevated md:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Activity className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Calibrated daily</p>
                  <p className="text-xs text-muted-foreground">Strict QC protocols</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="border-t border-border bg-background/60 backdrop-blur">
          <div className="container-page grid grid-cols-2 gap-6 py-6 md:grid-cols-4">
            {trustStrip.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Our services
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
                Comprehensive diagnostics under one roof.
              </h2>
              <p className="mt-3 text-muted-foreground">
                From routine blood work to specialized screenings — handled by licensed
                medical technologists with care and precision.
              </p>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              View all services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, name, desc }) => (
              <article
                key={name}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Affordable packages
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Transparent prices. No surprises.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Choose a package that fits your needs — every test bundled at honest, clinic-direct pricing.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {packages.map((p) => (
              <article
                key={p.name}
                className={`relative flex flex-col rounded-3xl border p-7 ${
                  p.highlight
                    ? "border-primary bg-card shadow-glow"
                    : "border-border bg-card shadow-soft"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold">{p.name}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-semibold">{p.price}</span>
                  <span className="text-sm text-muted-foreground">/ visit</span>
                </div>
                <ul className="mt-6 space-y-2.5 border-t border-border pt-6">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm">
                      <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`mt-7 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-all ${
                    p.highlight
                      ? "bg-primary text-primary-foreground hover:brightness-110"
                      : "border border-border bg-background text-foreground hover:bg-muted"
                  }`}
                >
                  Book this package
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={labImg}
              alt="Modern diagnostic equipment at Aero Medical & Diagnostic Clinic"
              width={1200}
              height={900}
              loading="lazy"
              className="rounded-3xl border border-border object-cover shadow-elevated"
            />
            <div className="absolute -right-4 -bottom-4 hidden rounded-2xl border border-border bg-card p-5 shadow-elevated sm:block">
              <p className="font-display text-3xl font-semibold text-primary">99.8%</p>
              <p className="mt-1 text-xs text-muted-foreground">Quality control accuracy</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Why choose Aero
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Clinical precision. Human warmth.
            </h2>
            <p className="mt-4 text-muted-foreground">
              We combine modern equipment with a team that genuinely cares — so you leave
              informed, reassured, and confident in your results.
            </p>

            <ul className="mt-8 space-y-5">
              {[
                {
                  icon: ShieldCheck,
                  title: "Accredited & licensed",
                  desc: "Operated by registered medical technologists and physicians.",
                },
                {
                  icon: Clock,
                  title: "Fast turnaround",
                  desc: "Same-day results for most routine tests, ready by closing time.",
                },
                {
                  icon: ClipboardList,
                  title: "Easy reporting",
                  desc: "Clear, plain-language results delivered in print or by email.",
                },
              ].map(({ icon: Icon, title, desc }) => (
                <li key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              How it works
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Simple, comfortable, fast.
            </h2>
            <p className="mt-3 text-muted-foreground">
              From booking to results in four straightforward steps.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((s) => (
              <li
                key={s.step}
                className="relative rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="font-display text-3xl font-semibold text-primary/30">
                  {s.step}
                </span>
                <h3 className="mt-3 text-base font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Patient stories
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Loved by patients, trusted by employers.
            </h2>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <div className="flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                      <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.78L10 14.77l-5.2 2.73.99-5.78L1.58 7.62l5.82-.85L10 1.5z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface py-20 sm:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              Frequently asked
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Answers before you visit.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Can't find what you're looking for? Our team is one call away.
            </p>
            <a
              href="tel:+639274033804"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <PhoneCall className="h-4 w-4" /> Talk to us — 0927 403 3804
            </a>
          </div>

          <div className="lg:col-span-7">
            <dl className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
              {faqs.map((f) => (
                <details key={f.q} className="group p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer items-center justify-between gap-4">
                    <dt className="text-base font-semibold">{f.q}</dt>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-current">
                        <path d="M10 4a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V5a1 1 0 011-1z" />
                      </svg>
                    </span>
                  </summary>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</dd>
                </details>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 sm:py-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-3xl bg-primary-gradient p-10 shadow-glow sm:p-14">
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
              aria-hidden
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <h2 className="font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
                  Ready to take control of your health?
                </h2>
                <p className="mt-3 max-w-xl text-primary-foreground/85">
                  Book your test today — most appointments are confirmed within minutes,
                  and walk-ins are always welcome.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground shadow-elevated transition-transform hover:-translate-y-0.5"
                >
                  <CalendarCheck className="h-4 w-4 text-primary" />
                  Book a test
                </Link>
                <a
                  href="tel:+639274033804"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-primary-foreground/30 px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
                >
                  <PhoneCall className="h-4 w-4" />
                  Call now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
