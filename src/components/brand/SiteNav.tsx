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
  { key: "AISA", tKey: "nav.aisa" },
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
    AISA: `/aisa`,
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
      className="sticky top-0 z-50"
      style={{
        background: "#FAFAF8",
        borderBottom: "1px solid #E3E1DA",
      }}
    >
      <div className="mx-auto flex h-[90px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        {/* Brand */}
        <Link
          to={locale === "de" ? "/de" : "/"}
          className="flex flex-col items-start leading-none"
        >
          <Signature size="md" color="#1F2125" />
          <span
            className="mt-1.5 text-[8px] font-semibold"
            style={{
              color: "#34506E",
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
                className="relative text-[14px] font-medium transition-colors hover:text-[#1F2125]"
              >
                <span style={{ color: isActive ? "#1F2125" : "#5A5D63" }}>
                  {t(tKey)}
                </span>
                {isActive && (
                  <span
                    className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full"
                    style={{ background: "#34506E" }}
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
                  <span className="mx-1 text-[11px]" style={{ color: "#D7D4CC" }}>
                    |
                  </span>
                )}
                <button
                  onClick={() => switchLocale(loc)}
                  className="text-[12px] font-semibold transition-colors"
                  style={{
                    color: locale === loc ? "#1F2125" : "#8A8D93",
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
            className="rounded-lg p-2 lg:hidden"
            style={{ color: "#1F2125" }}
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
            style={{ background: "rgba(250,250,248,0.7)", backdropFilter: "blur(4px)" }}
          />

          {/* Panel */}
          <nav
            className="relative flex flex-col overflow-y-auto"
            style={{
              background: "#FAFAF8",
              borderBottom: "1px solid #E3E1DA",
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
                      borderColor: "#E3E1DA",
                      color: isActive ? "#1F2125" : "#5A5D63",
                    }}
                  >
                    {t(tKey)}
                    {isActive && (
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: "#34506E" }}
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
                <span className="text-[12px]" style={{ color: "#8A8D93" }}>Language:</span>
                {(["en", "de"] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => { switchLocale(loc); setMobileOpen(false); }}
                    className="rounded-md px-3 py-1.5 text-[13px] font-semibold transition-all"
                    style={
                      locale === loc
                        ? { background: "#E9EFF4", color: "#34506E", border: "1px solid #D7D4CC" }
                        : { background: "transparent", color: "#8A8D93", border: "1px solid #E3E1DA" }
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
