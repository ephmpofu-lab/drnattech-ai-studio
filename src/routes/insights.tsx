import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Calendar,
  Clock,
  ExternalLink,
  FileText,
  Mail,
  Quote,
  Library,
  Lightbulb,
  Atom,
  Leaf,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";
import { Signature } from "@/components/brand/Signature";
import heroImg from "@/assets/insights-hero-v2.jpg";
import art1 from "@/assets/insight-article-1.jpg";
import art2 from "@/assets/insight-article-2.jpg";
import art3 from "@/assets/insight-article-3.jpg";
import art4 from "@/assets/insight-article-4.jpg";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights & Research — Dr. Ephraim Mpofu · Dr.Nat.Tech" },
      {
        name: "description",
        content:
          "Research & insights by Dr. Ephraim Mpofu — peer-reviewed publications and architecture essays on sustainability, governance, AI systems and intelligent automation.",
      },
      { property: "og:title", content: "Research & Insights — Dr. Ephraim Mpofu" },
      {
        property: "og:description",
        content:
          "Research. Ideas. Impact. Publications and articles from Dr. Ephraim Mpofu.",
      },
    ],
  }),
  component: InsightsPage,
});

const categoryList = [
  { label: "All Content", icon: Library },
  { label: "Research Papers", icon: BookOpen },
  { label: "Research Insights", icon: Lightbulb },
  { label: "AI & Systems", icon: Atom },
  { label: "Sustainability", icon: Leaf },
  { label: "Governance", icon: ShieldCheck },
] as const;

type CatLabel = (typeof categoryList)[number]["label"];

type Article = {
  image: string;
  category: CatLabel;
  title: string;
  date: string;
  read: string;
};

const articles: Article[] = [
  {
    image: art1,
    category: "AI & Systems",
    title: "Designing AI Systems That Deliver Real Value",
    date: "Mar 2026",
    read: "8 min read",
  },
  {
    image: art2,
    category: "Research Insights",
    title: "From Theory to Practice: Lessons from Transfrontier Conservation Areas",
    date: "Feb 2026",
    read: "12 min read",
  },
  {
    image: art3,
    category: "AI & Systems",
    title: "Building Reliable Workflows with n8n and AI Agents",
    date: "Jan 2026",
    read: "10 min read",
  },
  {
    image: art4,
    category: "Sustainability",
    title: "Sustainability Requires Systems Thinking, Not Silos",
    date: "Dec 2025",
    read: "9 min read",
  },
];

type Publication = {
  title: string;
  journal: string;
  year: number;
  doi: string;
  url: string;
  thumb: string;
};

const publications: Publication[] = [
  {
    title: "Bridging Knowledge Systems in Sustainability Doctoral Education",
    journal: "GAIA – Ecological Perspectives for Science and Society",
    year: 2026,
    doi: "10.14512/gaia.35.2.5",
    url: "https://www.ingentaconnect.com/content/oekom/gaia/2026/00000035/00000002/art00006;jsessionid=memx3g7a8w9t.x-ic-live-01",
    thumb: art4,
  },
  {
    title:
      "Fragmented Governance, Shared Landscapes: Policy and Functional (In)Coherence Insights from the Great Limpopo TFCA",
    journal: "Environmental Management",
    year: 2025,
    doi: "10.1007/s00267-025-02309-9",
    url: "https://link.springer.com/article/10.1007/s00267-025-02309-9",
    thumb: art2,
  },
  {
    title:
      "Cultural and Empowerment Priorities Amid Tensions in Knowledge Systems and Resource Allocation",
    journal: "Ecology and Society",
    year: 2025,
    doi: "10.5751/ES-15729-300109",
    url: "https://ecologyandsociety.org/vol30/iss1/art9/",
    thumb: heroImg,
  },
  {
    title: "Discourses on Landscape Governance and Transfrontier Conservation Areas",
    journal: "Biodiversity and Conservation",
    year: 2023,
    doi: "10.1007/s10531-023-02720-w",
    url: "https://link.springer.com/article/10.1007/s10531-023-02720-w",
    thumb: art4,
  },
];

const roles = ["AI Solutions Architect", "Researcher", "Systems Thinker"];
const interests = [
  "Sustainability",
  "Governance",
  "Knowledge Systems",
  "AI Systems",
  "Automation",
];

function InsightsPage() {
  const [activeCat, setActiveCat] = useState<CatLabel>("All Content");

  const visible =
    activeCat === "All Content"
      ? articles
      : articles.filter((a) => a.category === activeCat);

  return (
    <div className="relative min-h-screen" style={{ background: "#050816", color: "#fff" }}>
      <BrandBackground />
      <SiteNav active="Insights" />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* HERO — taller */}
        <section className="grid grid-cols-1 items-center gap-12 pt-20 pb-28 lg:grid-cols-[44%_56%] lg:gap-14">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.22em]"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.35)",
                color: "#C4B5FD",
              }}
            >
              INSIGHTS & RESEARCH
            </span>
            <h1 className="mt-7 text-[60px] font-bold leading-[1.02] tracking-[-0.02em] lg:text-[76px]">
              Research.<br />
              Ideas.<br />
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Impact.
              </span>
            </h1>
            <p className="mt-7 max-w-[520px] text-[16px] leading-[1.7]" style={{ color: "#A3A3B2" }}>
              Peer-reviewed research, architecture insights, and real-world
              learnings at the intersection of sustainability, governance, AI
              systems, and intelligent automation.
            </p>
            <div className="mt-10 flex flex-col items-start gap-2">
              <Signature size="lg" />
              <div className="text-[12px] tracking-[0.18em]" style={{ color: "#A3A3B2" }}>
                AI SOLUTIONS ARCHITECT · RESEARCHER · BUILDER
              </div>
            </div>
          </div>

          <div className="relative">
            <div
              className="relative overflow-hidden rounded-[24px]"
              style={{
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 30px 80px -20px rgba(139,92,246,0.3)",
              }}
            >
              <img
                src={heroImg}
                alt="Research desk with academic journals and notes"
                className="h-[680px] w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(5,8,22,0) 45%, rgba(5,8,22,0.8) 100%)",
                }}
              />
            </div>
            <div
              className="absolute -bottom-8 -left-6 max-w-[380px] rounded-[18px] p-6 backdrop-blur-xl lg:-left-10"
              style={{
                background: "rgba(11,16,32,0.88)",
                border: "1px solid rgba(139,92,246,0.25)",
                boxShadow: "0 20px 50px -20px rgba(0,0,0,0.6)",
              }}
            >
              <Quote className="h-5 w-5" style={{ color: "#A855F7" }} />
              <p className="mt-2 text-[14px] leading-[1.65]" style={{ color: "#E5E7EB" }}>
                Advancing AI through research, building systems that work in
                production, and sharing insights that drive the industry forward.
              </p>
            </div>
          </div>
        </section>

        {/* AUTHOR PROFILE */}
        <section className="mb-10">
          <div
            className="grid grid-cols-1 gap-6 rounded-[20px] p-7 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:p-8"
            style={{
              background: "#0B1020",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center gap-5">
              <div
                className="grid h-14 w-14 shrink-0 place-items-center rounded-[14px] text-[18px] font-bold text-white"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
              >
                EM
              </div>
              <div>
                <h2 className="text-[20px] font-semibold leading-tight">
                  Dr. Ephraim Mpofu
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px]" style={{ color: "#A3A3B2" }}>
                  {roles.map((r, i) => (
                    <span key={r} className="flex items-center gap-2">
                      {i > 0 && <span style={{ color: "#6B7280" }}>·</span>}
                      {r}
                    </span>
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-2 text-[12.5px]" style={{ color: "#C4B5FD" }}>
                  <GraduationCap className="h-3.5 w-3.5" />
                  PhD NatTech — BOKU Vienna
                </div>
              </div>
            </div>

            <div
              className="hidden h-16 w-px lg:block"
              style={{ background: "rgba(255,255,255,0.06)" }}
            />

            <div>
              <div className="text-[11px] font-semibold tracking-[0.22em]" style={{ color: "#A855F7" }}>
                RESEARCH INTERESTS
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {interests.map((i) => (
                  <span
                    key={i}
                    className="rounded-full px-3 py-1.5 text-[12px] font-medium"
                    style={{
                      background: "rgba(139,92,246,0.1)",
                      border: "1px solid rgba(139,92,246,0.25)",
                      color: "#E5E7EB",
                    }}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORY FILTER — slimmer */}
        <div
          className="flex flex-wrap items-center gap-2 rounded-[14px] p-2"
          style={{
            background: "#0B1020",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {categoryList.map(({ label, icon: Icon }) => {
            const active = label === activeCat;
            return (
              <button
                key={label}
                onClick={() => setActiveCat(label)}
                className="inline-flex items-center gap-2 rounded-[10px] px-3.5 py-2 text-[12.5px] font-medium transition-all"
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                        color: "#fff",
                        boxShadow: "0 6px 18px -8px rgba(168,85,247,0.6)",
                      }
                    : { color: "#A3A3B2" }
                }
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            );
          })}
        </div>

        {/* ARTICLES */}
        <section className="pt-16">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.28em]" style={{ color: "#A855F7" }}>
                LATEST INSIGHTS
              </div>
              <h2 className="mt-2 text-[34px] font-bold tracking-[-0.01em]">
                Articles & Insights
              </h2>
            </div>
            <a
              href="#"
              className="hidden items-center gap-2 text-[13px] font-medium transition-colors hover:text-white md:inline-flex"
              style={{ color: "#A3A3B2" }}
            >
              View all articles <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((a) => (
              <article
                key={a.title}
                className="group flex flex-col overflow-hidden rounded-[18px] transition-all hover:-translate-y-1"
                style={{
                  background: "#0B1020",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="relative h-[220px] w-full overflow-hidden">
                  <img
                    src={a.image}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span
                    className="self-start rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-[0.18em]"
                    style={{
                      background: "rgba(139,92,246,0.12)",
                      color: "#C4B5FD",
                      border: "1px solid rgba(139,92,246,0.25)",
                    }}
                  >
                    {a.category.toUpperCase()}
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold leading-[1.4]">
                    {a.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between pt-6 text-[12px]" style={{ color: "#6B7280" }}>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {a.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {a.read}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                    style={{ color: "#A855F7" }}
                  >
                    Read article <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* PUBLICATIONS */}
        <section className="pt-24">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.28em]" style={{ color: "#A855F7" }}>
                ACADEMIC RECORD
              </div>
              <h2 className="mt-2 text-[34px] font-bold tracking-[-0.01em]">
                Peer-reviewed publications
              </h2>
              <p className="mt-2 max-w-[640px] text-[14.5px]" style={{ color: "#A3A3B2" }}>
                Published research across sustainability science, landscape
                governance, and knowledge systems.
              </p>
            </div>
            <Link
              to="/publications"
              className="hidden items-center gap-2 text-[13px] font-medium transition-colors hover:text-white md:inline-flex"
              style={{ color: "#A3A3B2" }}
            >
              View all publications <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div
            className="mt-10 overflow-hidden rounded-[20px]"
            style={{
              background: "#0B1020",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {publications.map((p, i) => (
              <div
                key={p.doi}
                className="grid grid-cols-[40px_84px_1fr_auto] items-center gap-6 px-7 py-8 lg:px-9"
                style={{
                  borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  className="text-[14px] font-semibold tabular-nums"
                  style={{ color: "#A855F7" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="h-[76px] w-[84px] overflow-hidden rounded-lg">
                  <img src={p.thumb} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-[17px] font-semibold leading-[1.4]">{p.title}</h3>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px]" style={{ color: "#C4B5FD" }}>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="h-3.5 w-3.5" /> {p.journal}
                    </span>
                    <span style={{ color: "#6B7280" }}>·</span>
                    <span style={{ color: "#A3A3B2" }}>{p.year}</span>
                    <span style={{ color: "#6B7280" }}>·</span>
                    <span className="font-mono text-[12px]" style={{ color: "#6B7280" }}>
                      DOI: {p.doi}
                    </span>
                  </div>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                  <a
                    href={`https://doi.org/${p.doi}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all hover:bg-white/5"
                    style={{ color: "#A3A3B2", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> DOI
                  </a>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-white"
                    style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
                  >
                    Read article <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <Link
              to="/publications"
              className="inline-flex items-center gap-2 rounded-[12px] px-6 py-3 text-[13.5px] font-semibold transition-all hover:bg-white/5"
              style={{
                color: "#C4B5FD",
                border: "1px solid rgba(139,92,246,0.4)",
              }}
            >
              <FileText className="h-4 w-4" /> View all publications
            </Link>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="pt-24">
          <div
            className="grid grid-cols-1 items-center gap-6 rounded-[20px] p-7 lg:grid-cols-[1fr_auto] lg:p-9"
            style={{
              background:
                "linear-gradient(135deg, rgba(139,92,246,0.08), rgba(168,85,247,0.04))",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <div className="flex items-start gap-5">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-xl"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
              >
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-[20px] font-semibold">Stay informed</h3>
                <p className="mt-1 text-[14px]" style={{ color: "#A3A3B2" }}>
                  Get monthly research highlights, architecture insights, and
                  updates on new publications.
                </p>
              </div>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full items-center gap-2 lg:w-auto"
            >
              <input
                type="email"
                placeholder="you@company.com"
                className="h-11 w-full rounded-[10px] px-4 text-[13.5px] outline-none transition-colors lg:w-[280px]"
                style={{
                  background: "rgba(5,8,22,0.6)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "#fff",
                }}
              />
              <button
                type="submit"
                className="h-11 shrink-0 rounded-[10px] px-5 text-[13px] font-semibold text-white transition-all hover:scale-[1.03]"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #A855F7)" }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}
