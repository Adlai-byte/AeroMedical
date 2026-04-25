import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-xs sm:text-sm">
        <div className="container-page flex h-9 items-center justify-between gap-3">
          <p className="truncate">
            <span className="hidden sm:inline">Walk-ins welcome · Mon–Sat 7:00 AM – 5:00 PM · </span>
            Same-day results for most tests
          </p>
          <a href="tel:+639274033804" className="inline-flex items-center gap-1.5 font-medium hover:underline">
            <Phone className="h-3.5 w-3.5" />
            <span>0927 403 3804</span>
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 w-full backdrop-blur transition-colors ${
          scrolled
            ? "bg-background/85 border-b border-border shadow-soft"
            : "bg-background/60 border-b border-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
            <img src={logo} alt="Aero Medical & Diagnostic Clinic logo" className="h-9 w-9" />
            <div className="leading-tight">
              <p className="font-display text-base font-semibold text-foreground">Aero Medical</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                & Diagnostic Clinic
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeProps={{ className: "text-foreground bg-muted" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/contact"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:shadow-elevated hover:brightness-110"
            >
              Book a Test
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <nav className="container-page flex flex-col gap-1 py-4">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  activeOptions={{ exact: l.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "text-foreground bg-muted" }}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground"
              >
                Book a Test
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
