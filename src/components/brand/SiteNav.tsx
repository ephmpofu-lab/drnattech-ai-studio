import { Link } from "@tanstack/react-router";
import { Menu, MessageSquare } from "lucide-react";
import { Signature } from "./Signature";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Frameworks", to: "/frameworks" },
  { label: "AI Agent", to: "/ai-agent" },
  { label: "Insights", to: "/insights" },
  { label: "Publications", to: "/publications" },
  { label: "Contact", to: "/contact" },
] as const;

type Props = { active?: string };

export function SiteNav({ active = "Home" }: Props) {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "rgba(5,8,22,0.78)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="mx-auto flex h-[90px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <Link to="/" className="flex flex-col items-start leading-none">
          <Signature size="md" />
          <span
            className="mt-2 text-[9px] font-semibold tracking-[0.28em]"
            style={{ color: "#A855F7" }}
          >
            AI SOLUTIONS ARCHITECT
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const isActive = item.label === active;

            // ALL PAGES ARE LIVE
            const isLive = true;

            const cls =
              "relative text-[14px] font-medium transition-colors";

            const inner = (
              <>
                <span style={{ color: isActive ? "#fff" : "#A3A3B2" }}>
                  {item.label}
                </span>

                {isActive && (
                  <span
                    className="absolute -bottom-[22px] left-0 right-0 h-[2px] rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, #8B5CF6, #A855F7)",
                    }}
                  />
                )}
              </>
            );

            return isLive ? (
              <Link
                key={item.label}
                to={item.to}
                className={cls}
              >
                {inner}
              </Link>
            ) : (
              <a
                key={item.label}
                href="#"
                className={cls}
              >
                {inner}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/ai-agent"
            className="hidden items-center gap-2 rounded-[10px] px-5 py-2.5 text-[13px] font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:brand-glow md:inline-flex"
            style={{
              background:
                "linear-gradient(135deg, #8B5CF6, #A855F7)",
            }}
          >
            <MessageSquare className="h-4 w-4" />
            Ask Me Anything
          </a>

          <button
            className="rounded-lg p-2 text-white lg:hidden"
            aria-label="Menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}