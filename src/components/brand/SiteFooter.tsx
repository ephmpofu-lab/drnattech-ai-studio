import { Link, useLocation } from "@tanstack/react-router";
import { Linkedin, Github, Youtube, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Signature } from "./Signature";
import { localeFromPathname } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useTranslation("common");
  const { pathname } = useLocation();
  const locale = localeFromPathname(pathname);
  const prefix = locale === "de" ? "/de" : "";

  const nav = [
    { labelKey: "nav.home", to: locale === "de" ? "/de" : "/" },
    { labelKey: "nav.about", to: `${prefix}/about` },
    { labelKey: "nav.portfolio", to: `${prefix}/portfolio` },
    { labelKey: "nav.frameworks", to: `${prefix}/frameworks` },
    { labelKey: "nav.aiAgent", to: `${prefix}/ai-agent` },
    { labelKey: "nav.insights", to: `${prefix}/insights` },
    { labelKey: "nav.contact", to: `${prefix}/contact` },
  ] as const;

  const frameworks = [
    { labelKey: "AISA — AI Solutions Architecture", to: `${prefix}/frameworks` },
    { labelKey: "Three Structural Laws", to: `${prefix}/frameworks` },
    { labelKey: "Knowledge Architecture", to: `${prefix}/frameworks` },
    { labelKey: "Four Workflow Layers", to: `${prefix}/frameworks` },
  ] as const;

  const resources = [
    { labelKey: "footer.links.publications", href: `${prefix}/publications` },
    { labelKey: "footer.links.insights", href: `${prefix}/insights` },
    { labelKey: "footer.links.aiAgent", href: `${prefix}/ai-agent` },
    { labelKey: "footer.links.portfolio", href: `${prefix}/portfolio` },
    { labelKey: "footer.links.researchPapers", href: `${prefix}/publications` },
  ] as const;

  const connect = [
    { labelKey: "footer.social.linkedin", icon: Linkedin, href: "#" },
    { labelKey: "footer.social.github", icon: Github, href: "#" },
    { labelKey: "footer.social.youtube", icon: Youtube, href: "#" },
    { labelKey: "footer.social.email", icon: Mail, href: "mailto:hello@drnat.tech" },
  ] as const;

  return (
    <footer className="mt-10 w-full">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div
          className="pt-8 pb-5"
          style={{ borderTop: "1px solid #E3E1DA" }}
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr_0.9fr]">
            {/* Brand */}
            <div>
              <Signature size="lg" color="#1F2125" />
              <div className="mt-4 text-[14px] font-bold" style={{ color: "#1F2125" }}>Dr. Ephraim Mpofu</div>
              <div className="mt-1 text-[11.5px] font-semibold" style={{ color: "#34506E" }}>
                {t("footer.role")}
              </div>
              <div className="mt-1 text-[11.5px]" style={{ color: "#5A5D63" }}>
                {t("footer.credentials")}
              </div>
              <div className="mt-2 text-[11px] leading-[1.6]" style={{ color: "#5A5D63" }}>
                {t("footer.description")}
              </div>
            </div>

            {/* Navigation */}
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "#1F2125" }}
              >
                {t("footer.sections.navigation")}
              </div>
              <ul className="mt-4 space-y-2.5">
                {nav.map((n) => (
                  <li key={n.labelKey}>
                    <Link
                      to={n.to}
                      className="text-[13px] transition-colors"
                      style={{ color: "#5A5D63" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2125")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5D63")}
                    >
                      {t(n.labelKey as string)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Frameworks */}
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "#1F2125" }}
              >
                {t("footer.sections.frameworks")}
              </div>
              <ul className="mt-4 space-y-2.5">
                {frameworks.map((f) => (
                  <li key={f.labelKey}>
                    <Link
                      to={f.to}
                      className="text-[13px] transition-colors"
                      style={{ color: "#5A5D63" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2125")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5D63")}
                    >
                      {f.labelKey}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Authority */}
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "#1F2125" }}
              >
                {t("footer.sections.authority")}
              </div>
              <ul className="mt-4 space-y-2.5">
                {resources.map((r) => (
                  <li key={r.labelKey}>
                    <a
                      href={r.href}
                      className="text-[13px] transition-colors"
                      style={{ color: "#5A5D63" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2125")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5D63")}
                    >
                      {t(r.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <div
                className="text-[11px] font-bold uppercase tracking-[0.2em]"
                style={{ color: "#1F2125" }}
              >
                {t("footer.sections.connect")}
              </div>
              <ul className="mt-4 space-y-2.5">
                {connect.map((c) => (
                  <li key={c.labelKey}>
                    <a
                      href={c.href}
                      className="inline-flex items-center gap-2 text-[13px] transition-colors"
                      style={{ color: "#5A5D63" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#1F2125")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#5A5D63")}
                    >
                      <c.icon className="h-3.5 w-3.5" style={{ color: "#34506E" }} />
                      {t(c.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-5 text-[12px]"
            style={{ borderTop: "1px solid #E3E1DA", color: "#8A8D93" }}
          >
            <span>{t("footer.tagline")}</span>
            <span>
              <span style={{ color: "#34506E" }}>♥</span> {t("footer.location")}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
