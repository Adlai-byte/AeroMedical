import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Award, HeartHandshake, Microscope, Sparkles, Target } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import consult from "@/assets/consultation.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aero Medical & Diagnostic Clinic" },
      {
        name: "description",
        content:
          "Aero Medical & Diagnostic Clinic is committed to accurate, affordable diagnostics in the Davao Region — driven by an experienced, compassionate team.",
      },
      { property: "og:title", content: "About — Aero Medical & Diagnostic Clinic" },
      {
        property: "og:description",
        content:
          "Driven by an experienced, compassionate team — we bring above-and-beyond diagnostic care to the Davao Region.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Target, title: "Accuracy first", desc: "Calibrated equipment and strict QC protocols on every shift." },
  { icon: HeartHandshake, title: "Patient-centered", desc: "We treat every patient with warmth, respect and clarity." },
  { icon: Award, title: "Accredited team", desc: "Licensed medical technologists and physicians you can trust." },
  { icon: Sparkles, title: "Above & beyond", desc: "Going further to make diagnostics easy, fast and affordable." },
];

function AboutPage() {
  return (
    <SiteLayout>
      <section className="bg-hero-gradient">
        <div className="container-page grid gap-12 py-20 lg:grid-cols-12 lg:items-center sm:py-24">
          <div className="lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">About us</p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] sm:text-5xl">
              Diagnostic care, built around you.
            </h1>
            <p className="mt-5 max-w-xl text-muted-foreground">
              Aero Medical & Diagnostic Clinic is a community-rooted laboratory and diagnostic center
              in the Davao Region. Our microscope-and-airplane mark reflects our commitment to deep
              examination and the ambition to take our services above and beyond.
            </p>
          </div>
          <div className="lg:col-span-5">
            <img
              src={consult}
              alt="Aero Medical staff welcoming a patient at the reception"
              width={1200}
              height={900}
              loading="lazy"
              className="rounded-3xl border border-border object-cover shadow-elevated"
            />
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <article className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Target className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">Our mission</h2>
            <p className="mt-3 text-muted-foreground">
              To provide efficient and reliable service in achieving excellence in patient care —
              dedicated to quality diagnostic products and services that continually reach and surpass
              our customers' expectations, wellness and continuous satisfaction.
            </p>
          </article>
          <article className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-10">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
              <Microscope className="h-5 w-5" />
            </div>
            <h2 className="mt-5 font-display text-2xl font-semibold">Our vision</h2>
            <p className="mt-3 text-muted-foreground">
              By the year 2030, Aero Medical & Diagnostic Clinic will progress into a premier,
              innovative laboratory service and accredited diagnostic center for the entire
              Davao Region.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-surface py-20 sm:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
              What we stand for
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              The values behind every result.
            </h2>
          </div>
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page rounded-3xl border border-border bg-primary-gradient p-10 text-center shadow-glow sm:p-14">
          <h2 className="font-display text-3xl font-semibold text-primary-foreground sm:text-4xl">
            Visit us — we'd love to take care of you.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Book online or walk in any day from Monday to Saturday.
          </p>
          <Link
            to="/contact"
            className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-background px-6 text-sm font-semibold text-foreground shadow-elevated transition-transform hover:-translate-y-0.5"
          >
            Get in touch <ArrowRight className="h-4 w-4 text-primary" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
