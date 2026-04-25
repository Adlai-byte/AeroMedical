import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Baby,
  Beaker,
  Droplets,
  FlaskConical,
  HeartPulse,
  Microscope,
  Scan,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TestTube,
} from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Aero Medical & Diagnostic Clinic" },
      {
        name: "description",
        content:
          "Browse all medical and diagnostic services at Aero Medical & Diagnostic Clinic — from CBC and lipid panels to ECG, X-Ray and pre-employment packages.",
      },
      { property: "og:title", content: "Services — Aero Medical & Diagnostic Clinic" },
      {
        property: "og:description",
        content:
          "From routine blood work to specialized screenings — handled by licensed medical technologists with care and precision.",
      },
    ],
  }),
  component: ServicesPage,
});

const groups = [
  {
    title: "Laboratory tests",
    icon: FlaskConical,
    items: [
      { icon: TestTube, name: "Clinical Chemistry", desc: "Lipid profile, FBS, kidney & liver function panels." },
      { icon: Droplets, name: "Hematology", desc: "Complete blood count, blood typing, ESR." },
      { icon: Beaker, name: "Urinalysis & Fecalysis", desc: "Routine workups for general check-ups." },
      { icon: Microscope, name: "Microbiology", desc: "Gram stain, culture & sensitivity, parasitology." },
    ],
  },
  {
    title: "Imaging & cardiology",
    icon: Scan,
    items: [
      { icon: Scan, name: "Chest X-Ray", desc: "Digital imaging with same-day reading." },
      { icon: HeartPulse, name: "12-Lead ECG", desc: "Cardiac screening interpreted by physicians." },
      { icon: Activity, name: "Vital Signs Monitoring", desc: "BP, oxygen saturation, BMI assessments." },
    ],
  },
  {
    title: "Medical certificates & packages",
    icon: ShieldCheck,
    items: [
      { icon: Syringe, name: "Drug Testing", desc: "DOH-accredited drug testing for individuals & companies." },
      { icon: Stethoscope, name: "Pre-Employment Medical", desc: "Complete pre-employment workup with certificate." },
      { icon: Baby, name: "Annual Physical Exam", desc: "Comprehensive yearly check-ups for adults & seniors." },
    ],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient">
        <div className="container-page py-20 sm:py-24">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">Services</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
            Every test you need, delivered with clinical care.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            We offer a complete range of laboratory, imaging and medical certification services
            — all under one accredited roof.
          </p>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page space-y-20">
          {groups.map((g) => (
            <div key={g.title}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <g.icon className="h-5 w-5" />
                </div>
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">{g.title}</h2>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map(({ icon: Icon, name, desc }) => (
                  <article
                    key={name}
                    className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated"
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
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-page flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-8 shadow-soft sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Don't see a test you need?
            </h2>
            <p className="mt-2 text-muted-foreground">
              We handle 80+ specialized tests. Reach out and we'll confirm availability and price.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-glow transition-all hover:brightness-110"
          >
            Ask our team <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
