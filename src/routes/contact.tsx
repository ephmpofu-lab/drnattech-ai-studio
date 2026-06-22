import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Linkedin,
  Send,
  Lock,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import { CalendlyModal } from "@/components/brand/CalendlyModal";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";
import { Signature } from "@/components/brand/Signature";
import heroImg from "@/assets/contact-hero.webp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Dr. Ephraim Mpofu · Dr.Nat.Tech" },
      {
        name: "description",
        content:
          "Let's start a conversation. Reach Dr. Ephraim Mpofu — AI Solutions Architect, Researcher, and Builder based in Vienna, Austria.",
      },
      { property: "og:title", content: "Contact — Dr. Ephraim Mpofu" },
      {
        property: "og:description",
        content:
          "Let's build intelligent systems together. Get in touch with Dr. Ephraim Mpofu.",
      },
    ],
  }),
  component: ContactPage,
});

const CARD_BG =
  "linear-gradient(180deg, rgba(15,20,40,0.85), rgba(11,16,32,0.7))";
const CARD_BORDER = "1px solid rgba(139,92,246,0.18)";

function CopyEmailButton({ email }: { email: string }) {
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="ml-2 inline-flex items-center gap-1 rounded-[6px] px-2 py-0.5 text-[11px] font-semibold transition-all"
      style={
        copied
          ? { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)", color: "#34D399" }
          : { background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.28)", color: "#A855F7" }
      }
      aria-label={`Copy ${email}`}
    >
      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
      {copied ? t("contact.copiedEmail") : t("contact.copyEmail")}
    </button>
  );
}

export function ContactPage() {
  const { t, i18n } = useTranslation("common");
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [calendlyOpen, setCalendlyOpen] = useState(false);

  const agentHref = i18n.language === "de" ? "/de/ai-agent" : "/ai-agent";

  const contactCards = [
    {
      icon: MapPin,
      title: t("contact.cardAddress"),
      lines: ["Hopfengasse 5", "1210 Vienna", "Austria"],
    },
    {
      icon: Phone,
      title: t("contact.cardPhone"),
      lines: [{ text: "+43 677 64883723", href: "tel:+4367764883723" }],
    },
    {
      icon: Mail,
      title: t("contact.cardEmail"),
      lines: [
        { text: "ephmpofu@gmail.com", href: "mailto:ephmpofu@gmail.com" },
      ],
    },
    {
      icon: Clock,
      title: t("contact.cardHours"),
      lines: ["08:00 – 21:00", "Every Day"],
    },
    {
      icon: Linkedin,
      title: t("contact.cardLinkedin"),
      lines: [
        {
          text: "linkedin.com/in/ephraim-mpofu",
          href: "https://www.linkedin.com/in/ephraim-mpofu-a340608b/",
          external: true,
        },
      ],
    },
  ] as const;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`,
    );
    const subj = encodeURIComponent(form.subject || "Hello from drnat.tech");
    window.location.href = `mailto:ephmpofu@gmail.com?subject=${subj}&body=${body}`;
    setSubmitted(true);
  }

  const mapSrc =
    "https://www.google.com/maps?q=Hopfengasse%205,%201210%20Vienna,%20Austria&output=embed";
  const directionsUrl =
    "https://www.google.com/maps/dir/?api=1&destination=Hopfengasse+5,+1210+Vienna,+Austria";

  return (
    <div
      className="relative min-h-screen overflow-hidden text-white"
      style={{ background: "#050816" }}
    >
      <BrandBackground />
      <SiteNav active="Contact" />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* HERO */}
        <section className="grid grid-cols-1 items-center gap-12 pt-16 pb-20 lg:grid-cols-[45fr_55fr] lg:gap-16 lg:pt-24 lg:pb-28">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em]"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.4)",
                color: "#C4B5FD",
              }}
            >
              <Sparkles className="h-3 w-3" /> {t("contact.badge")}
            </span>

            <h1 className="mt-7 text-[44px] font-bold leading-[1.08] tracking-[-0.02em] md:text-[56px] lg:text-[64px]">
              {t("contact.heroTitle1")}{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #A855F7 0%, #8B5CF6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("contact.heroTitle2")}
              </span>
            </h1>

            <p
              className="mt-7 max-w-[540px] text-[16.5px] leading-[1.75]"
              style={{ color: "#A3A3B2" }}
            >
              {t("contact.heroDesc1")}
            </p>
            <p
              className="mt-3 max-w-[540px] text-[16.5px] leading-[1.75]"
              style={{ color: "#A3A3B2" }}
            >
              {t("contact.heroDesc2")}
            </p>

            <div className="mt-10 flex flex-col items-start gap-2">
              <Signature size="lg" />
              <span
                className="text-[11px] font-semibold tracking-[0.26em]"
                style={{ color: "#A855F7" }}
              >
                {t("contact.tagline")}
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute -inset-6 -z-10 rounded-[28px] opacity-60 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(139,92,246,0.5), transparent)",
              }}
            />
            <div
              className="overflow-hidden rounded-[22px]"
              style={{
                border: "1px solid rgba(139,92,246,0.25)",
                boxShadow:
                  "0 30px 80px -20px rgba(139,92,246,0.35), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <img
                src={heroImg}
                alt="Dr. Ephraim Mpofu workspace — laptop, notebook and architectural sketches"
                className="h-[460px] w-full object-cover lg:h-[560px]"
                width={1280}
                height={1280}
              />
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <section className="grid grid-cols-1 gap-10 pb-24 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
          {/* LEFT */}
          <div>
            <h2 className="text-[32px] font-bold tracking-[-0.01em] md:text-[36px]">
              {t("contact.sectionTitle")}
            </h2>
            <p className="mt-3 text-[15px]" style={{ color: "#A3A3B2" }}>
              {t("contact.sectionDesc")}
            </p>

            <button
              onClick={() => setCalendlyOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ background: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)", boxShadow: "0 12px 30px -10px rgba(139,92,246,0.6)" }}
            >
              {t("contact.bookCall")}
            </button>

            <div className="mt-8 space-y-4">
              {contactCards.map((card) => {
                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="group flex items-start gap-5 rounded-2xl p-5 transition-all hover:-translate-y-0.5"
                    style={{ background: CARD_BG, border: CARD_BORDER }}
                  >
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(139,92,246,0.25), rgba(168,85,247,0.15))",
                        border: "1px solid rgba(139,92,246,0.45)",
                        boxShadow:
                          "0 0 22px -6px rgba(139,92,246,0.6), inset 0 0 10px rgba(139,92,246,0.15)",
                      }}
                    >
                      <Icon className="h-5 w-5" style={{ color: "#C4B5FD" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div
                        className="text-[11px] font-semibold tracking-[0.22em]"
                        style={{ color: "#A855F7" }}
                      >
                        {card.title.toUpperCase()}
                      </div>
                      <div className="mt-1.5 space-y-0.5">
                        {card.lines.map((line, i) => {
                          if (typeof line === "string") {
                            return (
                              <div
                                key={i}
                                className="text-[15px] leading-[1.5] text-white"
                              >
                                {line}
                              </div>
                            );
                          }
                          const isExt = "external" in line && line.external;
                          const isEmail = card.title === t("contact.cardEmail");
                          return (
                            <div key={i} className="flex flex-wrap items-center gap-1">
                              <a
                                href={line.href}
                                target={isExt ? "_blank" : undefined}
                                rel={isExt ? "noopener noreferrer" : undefined}
                                className="break-all text-[15px] leading-[1.5] text-white transition-colors hover:text-[#C4B5FD]"
                              >
                                {line.text}
                              </a>
                              {isEmail && <CopyEmailButton email={line.text} />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div
            className="rounded-3xl p-8 md:p-10"
            style={{
              background: CARD_BG,
              border: CARD_BORDER,
              boxShadow:
                "0 30px 80px -30px rgba(139,92,246,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
          >
            <h2 className="text-[32px] font-bold tracking-[-0.01em] md:text-[36px]">
              {t("contact.formTitle")}
            </h2>
            <p className="mt-3 text-[15px]" style={{ color: "#A3A3B2" }}>
              {t("contact.formDesc")}
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <Field
                  label={t("contact.labelName")}
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder={t("contact.placeholderName")}
                  required
                />
                <Field
                  label={t("contact.labelEmail")}
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder={t("contact.placeholderEmail")}
                  required
                />
              </div>
              <Field
                label={t("contact.labelSubject")}
                value={form.subject}
                onChange={(v) => setForm({ ...form, subject: v })}
                placeholder={t("contact.placeholderSubject")}
              />
              <div>
                <label
                  className="mb-2 block text-[12px] font-semibold tracking-[0.18em]"
                  style={{ color: "#A3A3B2" }}
                >
                  {t("contact.labelMessage")}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  required
                  rows={6}
                  placeholder={t("contact.placeholderMessage")}
                  className="w-full resize-none rounded-xl px-4 py-3 text-[15px] text-white outline-none transition-all placeholder:text-[#6B7280] focus:border-[#8B5CF6]"
                  style={{
                    background: "rgba(5,8,22,0.6)",
                    border: "1px solid rgba(139,92,246,0.22)",
                  }}
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-[15px] font-semibold text-white shadow-lg transition-all hover:scale-[1.01]"
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                  boxShadow: "0 14px 36px -10px rgba(139,92,246,0.6)",
                }}
              >
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                {submitted ? t("contact.sentBtn") : t("contact.sendBtn")}
              </button>

              <div
                className="flex items-center justify-center gap-2 text-[12.5px]"
                style={{ color: "#6B7280" }}
              >
                <Lock className="h-3.5 w-3.5" style={{ color: "#A855F7" }} />
                {t("contact.privacy")}
              </div>
            </form>
          </div>
        </section>

        {/* LOCATION */}
        <section className="pb-24">
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ background: CARD_BG, border: CARD_BORDER }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
              <div className="relative h-[380px] lg:h-[500px]">
                <iframe
                  title="Map — Hopfengasse 5, 1210 Vienna"
                  src={mapSrc}
                  className="h-full w-full"
                  style={{
                    border: 0,
                    filter:
                      "invert(0.92) hue-rotate(190deg) saturate(0.85) brightness(0.92) contrast(1.05)",
                  }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(5,8,22,0.35) 0%, transparent 35%, transparent 65%, rgba(5,8,22,0.55) 100%)",
                  }}
                />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <div
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(168,85,247,0.15))",
                    border: "1px solid rgba(139,92,246,0.45)",
                    boxShadow: "0 0 22px -4px rgba(139,92,246,0.7)",
                  }}
                >
                  <MapPin className="h-5 w-5" style={{ color: "#C4B5FD" }} />
                </div>
                <h3 className="mt-5 text-[28px] font-bold tracking-[-0.01em]">
                  Hopfengasse 5
                </h3>
                <div
                  className="mt-1 text-[15px]"
                  style={{ color: "#A3A3B2" }}
                >
                  1210 Vienna, Austria
                </div>
                <p
                  className="mt-5 text-[14.5px] leading-[1.7]"
                  style={{ color: "#A3A3B2" }}
                >
                  {t("contact.locationDesc")}
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex items-center justify-center gap-2 self-start rounded-xl px-5 py-3 text-[13.5px] font-semibold text-white transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                    boxShadow: "0 12px 30px -10px rgba(139,92,246,0.6)",
                  }}
                >
                  {t("contact.getDirections")} <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* AI AGENT CTA */}
        <section className="pb-20">
          <div
            className="relative overflow-hidden rounded-3xl p-8 md:p-12"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.18) 0%, rgba(11,16,32,0.85) 60%)",
              border: "1px solid rgba(139,92,246,0.3)",
              boxShadow: "0 30px 80px -30px rgba(139,92,246,0.45)",
            }}
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-[280px] w-[280px] rounded-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(168,85,247,0.6), transparent)",
              }}
            />

            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[auto_1fr_auto]">
              <div
                className="flex h-20 w-20 items-center justify-center rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(139,92,246,0.35), rgba(168,85,247,0.2))",
                  border: "1px solid rgba(139,92,246,0.55)",
                  boxShadow:
                    "0 0 30px -6px rgba(139,92,246,0.7), inset 0 0 12px rgba(139,92,246,0.2)",
                }}
              >
                <MessageSquare
                  className="h-8 w-8"
                  style={{ color: "#C4B5FD" }}
                />
              </div>

              <div>
                <h3 className="text-[26px] font-bold tracking-[-0.01em] md:text-[30px]">
                  {t("contact.agentTitle")}
                </h3>
                <p
                  className="mt-3 max-w-[640px] text-[15px] leading-[1.7]"
                  style={{ color: "#A3A3B2" }}
                >
                  {t("contact.agentDesc")}
                </p>
                <div
                  className="mt-3 text-[13px]"
                  style={{ color: "#6B7280" }}
                >
                  {t("contact.agentSub")}
                </div>
              </div>

              <Link
                to={agentHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-[14px] font-semibold text-white transition-all hover:scale-[1.03]"
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)",
                  boxShadow: "0 14px 36px -10px rgba(139,92,246,0.6)",
                }}
              >
                <MessageSquare className="h-4 w-4" /> {t("contact.askAnything")}
              </Link>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        className="mb-2 block text-[12px] font-semibold tracking-[0.18em]"
        style={{ color: "#A3A3B2" }}
      >
        {label.toUpperCase()}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl px-4 py-3 text-[15px] text-white outline-none transition-all placeholder:text-[#6B7280] focus:border-[#8B5CF6]"
        style={{
          background: "rgba(5,8,22,0.6)",
          border: "1px solid rgba(139,92,246,0.22)",
        }}
      />
    </div>
  );
}
