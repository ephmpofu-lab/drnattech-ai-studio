import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { Signature } from "./Signature";
import { localeFromPathname, pathForLocale, type Locale } from "@/lib/i18n";

/* ── Nav items keyed by English label so active prop stays stable ── */
const NAV_KEYS = [
  { key: "Home", tKey: "nav.home" },
  { key: "About", tKey: "nav.about" },
  { key: "Portfolio", tKey: "nav.portfolio" },
  { key: "Frameworks", tKey: "nav.frameworks" },
  { key: "AI Agent", tKey: "nav.aiAgent" },
  { key: "Insights", tKey: "nav.insights" },
  { key: "Publications", tKey: "nav.publications" },
  { key: "Contact", tKey: "nav.contact" },
] as const;

type NavKey = (typeof NAV_KEYS)[number]["key"];

type Props = { active?: NavKey | string };

export function SiteNav({ active = "Home" }: Props) {
  const { t } = useTranslation("common");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const locale = localeFromPathname(pathname);

  /* Build locale-prefixed hrefs based on active locale */
  const prefix = locale === "de" ? "/de" : "";

  const navRoutes: Record<NavKey, string> = {
    Home: locale === "de" ? "/de" : "/",
    About: `${prefix}/about`,
    Portfolio: `${prefix}/portfolio`,
    Frameworks: `${prefix}/frameworks`,
    "AI Agent": `${prefix}/ai-agent`,
    Insights: `${prefix}/insights`,
    Publications: `${prefix}/publications`,
    Contact: `${prefix}/contact`,
  };

  const [mobileOpen, setMobileOpen] = useState(false);

  // Close on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Close on Escape key
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function switchLocale(targetLocale: Locale) {
    const target = pathForLocale(pathname, targetLocale);
    navigate({ to: target });
  }

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "rgba(5,8,22,0.78)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto flex h-[90px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <Link
          to={locale === "de" ? "/de" : "/"}
          className="flex flex-col items-start leading-none"
        >
          <Signature size="md" />
          <span
            className="mt-1.5 text-[8px] font-semibold"
            style={{
              color: "#A855F7",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            {t("footer.role")}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_KEYS.map(({ key, tKey }) => {
            const isActive = key === active;
            const href = navRoutes[key as NavKey];

            return (
              <Link
                key={key}
                to={href}
                className="relative text-[14px] font-medium transition-colors"
              >
                <span style={{ color: isActive ? "#fff" : "#A3A3B2" }}>
                  {t(tKey)}
                </span>
                {isActive && (
                  <span
                    className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #8B5CF6, #A855F7)",
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="hidden items-center gap-0.5 md:flex">
            {(["en", "de"] as Locale[]).map((loc, i) => (
              <span key={loc} className="flex items-center">
                {i > 0 && (
                  <span className="mx-1 text-[11px]" style={{ color: "#374151" }}>
                    |
                  </span>
                )}
                <button
                  onClick={() => switchLocale(loc)}
                  className="text-[12px] font-semibold transition-colors"
                  style={{
                    color: locale === loc ? "#fff" : "#6B7280",
                    cursor: locale === loc ? "default" : "pointer",
                  }}
                  aria-label={`Switch to ${loc === "en" ? "English" : "Deutsch"}`}
                  aria-current={locale === loc ? "true" : undefined}
                >
                  {t(`langSwitcher.${loc}` as `langSwitcher.${Locale}`)}
                </button>
              </span>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-lg p-2 text-white lg:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          style={{ top: "90px" }}
          onClick={() => setMobileOpen(false)}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ background: "rgba(5,8,22,0.6)", backdropFilter: "blur(4px)" }}
          />

          {/* Panel */}
          <nav
            className="relative flex flex-col overflow-y-auto"
            style={{
              background: "rgba(8,10,28,0.98)",
              borderBottom: "1px solid rgba(139,92,246,0.2)",
              maxHeight: "calc(100vh - 90px)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nav links */}
            <div className="flex flex-col px-6 py-4">
              {NAV_KEYS.map(({ key, tKey }) => {
                const isActive = key === active;
                const href = navRoutes[key as NavKey];
                return (
                  <Link
                    key={key}
                    to={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b py-4 text-[16px] font-medium transition-colors"
                    style={{
                      borderColor: "rgba(255,255,255,0.06)",
                      color: isActive ? "#fff" : "#A3A3B2",
                    }}
                  >
                    {t(tKey)}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "#A855F7" }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Bottom section */}
            <div className="flex flex-col gap-4 px-6 py-5">
              {/* Language switcher */}
              <div className="flex items-center gap-3">
                <span className="text-[12px]" style={{ color: "#475569" }}>Language:</span>
                {(["en", "de"] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                    className="rounded-md px-3 py-1.5 text-[13px] font-semibold transition-all"
                    style={
                      locale === loc
                        ? { background: "rgba(139,92,246,0.2)", color: "#A855F7", border: "1px solid rgba(139,92,246,0.4)" }
                        : { background: "rgba(255,255,255,0.04)", color: "#64748B", border: "1px solid rgba(255,255,255,0.07)" }
                    }
                  >
                    {t(`langSwitcher.${loc}` as `langSwitcher.${Locale}`)}
                  </button>
                ))}
              </div>

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
