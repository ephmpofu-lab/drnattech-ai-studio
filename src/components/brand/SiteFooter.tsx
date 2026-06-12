import { Link } from "@tanstack/react-router";
import { Linkedin, Github, Youtube, Mail } from "lucide-react";

import { Signature } from "./Signature";

const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "AI Agent", to: "/ai-agent" },
  { label: "Insights", to: "/insights" },
  { label: "Contact", to: "/contact" },
];

const resources = [
  { label: "Research Papers", href: "/publications" },
  { label: "Articles", href: "/insights" },
  { label: "Research Insights", href: "/insights" },
  { label: "Publications", href: "/publications" },
];

const connect = [
  { label: "LinkedIn", icon: Linkedin, href: "#" },
  { label: "GitHub", icon: Github, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
  { label: "Email", icon: Mail, href: "mailto:hello@drnat.tech" },
];

export function SiteFooter() {
  return (
    <footer
      className="mt-24 pt-14 pb-10"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1.1fr]">
        {/* Brand */}
        <div>
          <Signature size="lg" />
          <div className="mt-4 text-[14px] font-bold text-white">Dr. Ephraim Mpofu</div>
          <div className="mt-1 text-[11.5px] font-semibold" style={{ color: "#A855F7" }}>
            AI Solutions Architect
          </div>
          <div className="mt-1 text-[11.5px]" style={{ color: "#A3A3B2" }}>
            PhD NatTech — BOKU Vienna
          </div>
          <div className="mt-2 text-[11px] leading-[1.6]" style={{ color: "#A3A3B2" }}>
            Researcher | Systems Thinker | Enterprise AI Builder
          </div>
        </div>

        {/* Navigation */}
        <div>
          <div className="text-[12px] font-semibold tracking-[0.2em] text-white">
            Navigation
          </div>
          <ul className="mt-5 space-y-2.5">
            {nav.map((n) => (
              <li key={n.label}>
                <Link
                  to={n.to}
                  className="text-[13.5px] transition-colors hover:text-white"
                  style={{ color: "#A3A3B2" }}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <div className="text-[12px] font-semibold tracking-[0.2em] text-white">
            Resources
          </div>
          <ul className="mt-5 space-y-2.5">
            {resources.map((r) => (
              <li key={r.label}>
                <a
                  href={r.href}
                  className="text-[13.5px] transition-colors hover:text-white"
                  style={{ color: "#A3A3B2" }}
                >
                  {r.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <div className="text-[12px] font-semibold tracking-[0.2em] text-white">
            Connect
          </div>
          <ul className="mt-5 space-y-2.5">
            {connect.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  className="inline-flex items-center gap-2 text-[13.5px] transition-colors hover:text-white"
                  style={{ color: "#A3A3B2" }}
                >
                  <c.icon className="h-3.5 w-3.5" style={{ color: "#A855F7" }} />
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright column */}
        <div className="flex flex-col items-start lg:items-end">
          <div className="text-[12px] lg:text-right" style={{ color: "#A3A3B2" }}>
            © {new Date().getFullYear()} Dr. Ephraim Mpofu.<br />
            All rights reserved.
          </div>
        </div>
      </div>
      <div
        className="mx-auto mt-10 flex max-w-[1400px] flex-wrap items-center justify-between gap-3 pt-6 text-[12px]"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", color: "#A3A3B2" }}
      >
        <span>Built with purpose. Designed for impact.</span>
        <span>
          <span style={{ color: "#A855F7" }}>♥</span> Vienna, Austria
        </span>
      </div>
    </footer>
  );
}
