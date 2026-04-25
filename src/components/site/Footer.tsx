import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock, Facebook } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" className="h-10 w-10" />
            <div className="leading-tight">
              <p className="font-display text-lg font-semibold">Aero Medical</p>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                & Diagnostic Clinic
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Above and beyond services. Trusted laboratory and diagnostic care for the Davao
            Region — accurate results, friendly staff, fair prices.
          </p>
          <a
            href="https://www.facebook.com/aeromedclinic"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label="Facebook"
          >
            <Facebook className="h-4 w-4" />
          </a>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/" className="hover:text-foreground">Home</Link></li>
            <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground">Visit & contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>San Isidro, Davao Region, Philippines</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="tel:+639274033804" className="hover:text-foreground">0927 403 3804</a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <a href="mailto:hello@aeromedical.ph" className="hover:text-foreground">
                hello@aeromedical.ph
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <span>Mon–Sat · 7:00 AM – 5:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Aero Medical & Diagnostic Clinic. All rights reserved.</p>
          <p>Above and beyond services.</p>
        </div>
      </div>
    </footer>
  );
}
