import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  ChevronDown,
  ArrowRight,
  User,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";
import { publications, type Publication } from "@/lib/publications";
const portrait = "/images/Dr Mpofu_purple2.webp";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      {
        title:
          "Insights & Publications | AI Governance, RAG, Agentic AI | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Expert insights on AI governance, EU AI Act compliance, RAG architecture, agentic AI systems, and enterprise knowledge architectures by Dr. Ephraim Mpofu, AI Solutions Architect in Vienna.",
      },
      {
        property: "og:title",
        content:
          "Insights & Publications | Dr. Ephraim Mpofu · AI Solutions Architect Vienna",
      },
      {
        property: "og:description",
        content:
          "Research-driven insights on enterprise AI, EU AI Act, RAG systems, and knowledge architecture. By Dr. Ephraim Mpofu.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://dr-ephraim-mpofu.com/insights",
      },
    ],
  }),
  component: InsightsIndexPage,
});

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORY_LABELS = [
  "Enterprise AI",
  "AI Governance",
  "EU AI Act",
  "Knowledge Architecture",
  "RAG Systems",
  "Agentic AI",
  "AI Operations",
  "Case Studies",
  "Research Notes",
];

// Real counts from actual published articles — hides empty categories
const ALL_CATEGORIES = CATEGORY_LABELS
  .map((label) => ({
    label,
    count: publications.filter((p) => p.category === label).length,
  }))
  .filter((c) => c.count > 0);

const PAGE_SIZE = 6;

// ─── PublicationCard ──────────────────────────────────────────────────────────

function PublicationCard({ pub }: { pub: Publication }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: pub.slug }}
      className="group flex flex-col overflow-hidden rounded-[18px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.25)]"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Image */}
      <div className="relative h-[200px] w-full overflow-hidden">
        <img
          src={pub.heroImage}
          alt={pub.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(5,8,22,0.6) 100%)",
          }}
        />
        {/* Category badge over image */}
        <div className="absolute bottom-3 left-3">
          <span
            className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-[0.15em]"
            style={{
              background: `${pub.categoryColor}22`,
              border: `1px solid ${pub.categoryColor}55`,
              color: pub.categoryColor,
            }}
          >
            {pub.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="line-clamp-2 text-[15px] font-semibold leading-[1.45]"
          style={{ color: "#F1F5F9" }}
        >
          {pub.title}
        </h3>
        <p
          className="mt-2 line-clamp-2 text-[13px] leading-[1.6]"
          style={{ color: "#94A3B8" }}
        >
          {pub.abstract}
        </p>

        {/* Footer */}
        <div
          className="mt-auto flex items-center justify-between border-t pt-4 text-[12px]"
          style={{ borderColor: "rgba(255,255,255,0.06)", color: "#64748B" }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {pub.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {pub.readTime} min read
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export function InsightsIndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOrder] = useState("Latest First");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Filter + sort
  const filtered = publications
    .filter((p) => {
      const matchesSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.abstract.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        activeCategory === null || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "Latest First") {
        return (
          new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()
        );
      }
      return new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();
    });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const featuredPub = publications[0];

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "#050816", color: "#fff" }}
    >
      <BrandBackground />
      <SiteNav active="Insights" />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(139,92,246,0.08) 0%, transparent 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <div className="max-w-[700px]">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.22em]"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.35)",
                color: "#C4B5FD",
              }}
            >
              INSIGHTS &amp; PUBLICATIONS
            </span>
            <h1 className="mt-6 text-[52px] font-bold leading-[1.05] tracking-[-0.02em] lg:text-[64px]">
              Insights &amp;{" "}
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #A855F7 50%, #EC4899 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Publications
              </span>
            </h1>
            <p
              className="mt-5 text-[16px] leading-[1.75]"
              style={{ color: "#94A3B8" }}
            >
              Research-driven insights on enterprise AI architecture, EU AI Act
              compliance, knowledge systems design, and the practical realities
              of building AI systems that work in production.
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Layout ── */}
      <div className="mx-auto max-w-[1400px] px-6 py-12 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* ── Sidebar ── */}
          <aside className="hidden w-[260px] shrink-0 lg:block">
            <div className="sticky top-[110px] flex flex-col gap-6">
              {/* Search */}
              <div className="relative">
                <Search
                  className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
                  style={{ color: "#64748B" }}
                />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="h-11 w-full rounded-[10px] pl-10 pr-4 text-[13.5px] outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#fff",
                  }}
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  className="h-10 w-full appearance-none rounded-[10px] pl-3.5 pr-9 text-[13px] outline-none"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "#94A3B8",
                  }}
                  defaultValue="Latest First"
                >
                  <option>Latest First</option>
                  <option>Oldest First</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
                  style={{ color: "#64748B" }}
                />
              </div>

              {/* Categories */}
              <div>
                <div
                  className="mb-3 text-[10px] font-bold tracking-[0.22em]"
                  style={{ color: "#64748B" }}
                >
                  CATEGORIES
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setActiveCategory(null);
                      setVisibleCount(PAGE_SIZE);
                    }}
                    className="flex items-center justify-between rounded-[8px] px-3 py-2 text-left text-[13px] transition-all"
                    style={
                      activeCategory === null
                        ? {
                            background: "rgba(139,92,246,0.15)",
                            color: "#C4B5FD",
                          }
                        : { color: "#94A3B8" }
                    }
                  >
                    <span>All Articles</span>
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                      style={{
                        background: "rgba(255,255,255,0.06)",
                        color: "#64748B",
                      }}
                    >
                      {publications.length}
                    </span>
                  </button>
                  {ALL_CATEGORIES.map(({ label, count }: { label: string; count: number }) => (
                    <button
                      key={label}
                      onClick={() => {
                        setActiveCategory(
                          activeCategory === label ? null : label
                        );
                        setVisibleCount(PAGE_SIZE);
                      }}
                      className="flex items-center justify-between rounded-[8px] px-3 py-2 text-left text-[13px] transition-all"
                      style={
                        activeCategory === label
                          ? {
                              background: "rgba(139,92,246,0.15)",
                              color: "#C4B5FD",
                            }
                          : { color: "#94A3B8" }
                      }
                    >
                      <span>{label}</span>
                      <span
                        className="rounded-full px-1.5 py-0.5 text-[10px] font-semibold"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          color: "#64748B",
                        }}
                      >
                        {count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Featured Publication */}
              <div>
                <div
                  className="mb-3 text-[10px] font-bold tracking-[0.22em]"
                  style={{ color: "#64748B" }}
                >
                  FEATURED PUBLICATION
                </div>
                <Link
                  to="/insights/$slug"
                  params={{ slug: featuredPub.slug }}
                  className="group block overflow-hidden rounded-[12px] transition-all hover:border-purple-500/40"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div className="relative h-[120px] overflow-hidden">
                    <img
                      src={featuredPub.heroImage}
                      alt={featuredPub.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/70 to-transparent" />
                  </div>
                  <div className="p-3">
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: featuredPub.categoryColor }}
                    >
                      {featuredPub.category.toUpperCase()}
                    </span>
                    <p
                      className="mt-1 line-clamp-2 text-[12px] font-medium leading-[1.4]"
                      style={{ color: "#E2E8F0" }}
                    >
                      {featuredPub.title}
                    </p>
                    <div
                      className="mt-2 flex items-center gap-1 text-[11px]"
                      style={{ color: "#64748B" }}
                    >
                      <Clock className="h-3 w-3" />
                      {featuredPub.readTime} min read
                    </div>
                  </div>
                </Link>
              </div>

              {/* About the Author */}
              <div
                className="rounded-[14px] p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-3 text-[10px] font-bold tracking-[0.22em]"
                  style={{ color: "#64748B" }}
                >
                  ABOUT THE AUTHOR
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={portrait}
                    alt="Dr. Ephraim Mpofu"
                    className="h-12 w-12 rounded-full object-cover"
                    style={{ border: "2px solid rgba(139,92,246,0.4)" }}
                  />
                  <div>
                    <div
                      className="text-[13px] font-semibold"
                      style={{ color: "#E2E8F0" }}
                    >
                      Dr. Ephraim Mpofu
                    </div>
                    <div
                      className="text-[11px]"
                      style={{ color: "#64748B" }}
                    >
                      AI Solutions Architect
                    </div>
                  </div>
                </div>
                <p
                  className="mt-3 text-[12px] leading-[1.6]"
                  style={{ color: "#94A3B8" }}
                >
                  Building enterprise AI systems at the intersection of
                  governance, knowledge architecture, and agentic design.
                  Vienna, Austria.
                </p>
                <Link
                  to="/about"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium transition-colors"
                  style={{ color: "#A855F7" }}
                >
                  View Full Profile <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </aside>

          {/* ── Cards Grid ── */}
          <div className="min-w-0 flex-1">
            {/* Result header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  className="text-[22px] font-bold tracking-[-0.01em]"
                  style={{ color: "#F1F5F9" }}
                >
                  {activeCategory ?? "All Articles"}
                </h2>
                <p className="mt-0.5 text-[13px]" style={{ color: "#64748B" }}>
                  {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                  {search.trim() ? ` matching "${search}"` : ""}
                </p>
              </div>
            </div>

            {/* Grid */}
            {visible.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {visible.map((pub) => (
                  <PublicationCard key={pub.slug} pub={pub} />
                ))}
              </div>
            ) : (
              <div
                className="flex h-[240px] items-center justify-center rounded-[18px] text-center"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div>
                  <User
                    className="mx-auto h-10 w-10 opacity-30"
                    style={{ color: "#64748B" }}
                  />
                  <p
                    className="mt-3 text-[14px]"
                    style={{ color: "#64748B" }}
                  >
                    No articles found
                    {search.trim() ? ` for "${search}"` : ""}.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory(null);
                    }}
                    className="mt-3 text-[13px]"
                    style={{ color: "#A855F7" }}
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-[12px] px-7 py-3 text-[13.5px] font-semibold transition-all hover:bg-white/5"
                  style={{
                    color: "#C4B5FD",
                    border: "1px solid rgba(139,92,246,0.4)",
                  }}
                >
                  Load More Publications{" "}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer Strip ── */}
      <div
        className="border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-5 lg:px-10">
          <div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] font-medium tracking-[0.08em]"
            style={{ color: "#475569" }}
          >
            {[
              "Research Driven",
              "Practical Focus",
              "Continuous Updates",
              "Open Knowledge",
            ].map((item, i) => (
              <span key={item} className="flex items-center gap-8">
                {i > 0 && (
                  <span
                    className="h-3 w-px"
                    style={{ background: "rgba(255,255,255,0.08)" }}
                  />
                )}
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
