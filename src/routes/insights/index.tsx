import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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

const ALL_CATEGORIES = CATEGORY_LABELS
  .map((label) => ({
    label,
    count: publications.filter((p) => p.category === label).length,
  }))
  .filter((c) => c.count > 0);

const PAGE_SIZE = 6;

// ─── PublicationCard ──────────────────────────────────────────────────────────

function PublicationCard({ pub }: { pub: Publication }) {
  const { t } = useTranslation("common");
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: pub.slug }}
      className="group flex flex-col overflow-hidden rounded-[18px] transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "#F2F0EA",
        border: "1px solid #E3E1DA",
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
        <div className="absolute bottom-3 left-3">
          <span className="text-[10px] font-bold tracking-[0.15em]" style={{ color: pub.categoryColor }}>
            {pub.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3
          className="line-clamp-2 text-[15px] font-medium leading-[1.45]"
          style={{ color: "#1F2125" }}
        >
          {pub.title}
        </h3>
        <p
          className="mt-2 line-clamp-2 text-[13px] leading-[1.6]"
          style={{ color: "#5A5D63" }}
        >
          {pub.abstract}
        </p>

        {/* Footer */}
        <div
          className="mt-auto flex items-center justify-between border-t pt-4 text-[12px]"
          style={{ borderColor: "#E3E1DA", color: "#8A8D93" }}
        >
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            {pub.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3" />
            {pub.readTime} {t("insights.minRead")}
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export function InsightsIndexPage() {
  const { t } = useTranslation("common");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState("latest");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const footerItems = t("insights.footerItems", { returnObjects: true }) as string[];

  const filtered = publications
    .filter((p) => {
      const matchesSearch =
        search.trim() === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.abstract.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchesCategory =
        activeCategory === null || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortOrder === "latest") {
        return new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime();
      }
      return new Date(a.dateISO).getTime() - new Date(b.dateISO).getTime();
    });

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const featuredPub = publications[0];

  return (
    <div
      className="light-page relative min-h-screen"
      style={{ background: "#FAFAF8", color: "#1F2125" }}
    >
      <SiteNav active="Insights" />

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "#FAFAF8",
          borderBottom: "1px solid #E3E1DA",
        }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <div className="max-w-[700px]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#34506E" }}>
              {t("insights.badge")}
            </div>
            <h1 className="mt-6 text-[52px] font-medium leading-[1.05] tracking-[-0.02em] lg:text-[64px]" style={{ color: "#1F2125" }}>
              {t("insights.heroTitle1")}{" "}
              <span style={{ color: "#34506E" }}>
                {t("insights.heroTitle2")}
              </span>
            </h1>
            <p
              className="mt-5 text-[16px] leading-[1.75]"
              style={{ color: "#5A5D63" }}
            >
              {t("insights.heroDesc")}
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
                  style={{ color: "#8A8D93" }}
                />
                <input
                  type="text"
                  placeholder={t("insights.searchPlaceholder")}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="h-11 w-full rounded-[10px] pl-10 pr-4 text-[13.5px] outline-none"
                  style={{
                    background: "#FAFAF8",
                    border: "1px solid #E3E1DA",
                    color: "#1F2125",
                  }}
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  className="h-10 w-full appearance-none rounded-[10px] pl-3.5 pr-9 text-[13px] outline-none"
                  style={{
                    background: "#FAFAF8",
                    border: "1px solid #E3E1DA",
                    color: "#5A5D63",
                  }}
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="latest">{t("insights.sortLatest")}</option>
                  <option value="oldest">{t("insights.sortOldest")}</option>
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2"
                  style={{ color: "#8A8D93" }}
                />
              </div>

              {/* Categories */}
              <div>
                <div
                  className="mb-3 text-[10px] font-bold tracking-[0.22em]"
                  style={{ color: "#8A8D93" }}
                >
                  {t("insights.categoriesLabel")}
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
                            background: "#E9EFF4",
                            color: "#34506E",
                          }
                        : { color: "#5A5D63" }
                    }
                  >
                    <span>{t("insights.allArticles")}</span>
                    <span className="text-[10px] font-semibold" style={{ color: "#8A8D93" }}>
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
                              background: "#E9EFF4",
                              color: "#34506E",
                            }
                          : { color: "#5A5D63" }
                      }
                    >
                      <span>{label}</span>
                      <span className="text-[10px] font-semibold" style={{ color: "#8A8D93" }}>
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
                  style={{ color: "#8A8D93" }}
                >
                  {t("insights.featuredLabel")}
                </div>
                <Link
                  to="/insights/$slug"
                  params={{ slug: featuredPub.slug }}
                  className="group block overflow-hidden rounded-[12px] transition-all"
                  style={{
                    background: "#F2F0EA",
                    border: "1px solid #E3E1DA",
                  }}
                >
                  <div className="relative h-[120px] overflow-hidden">
                    <img
                      src={featuredPub.heroImage}
                      alt={featuredPub.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
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
                      style={{ color: "#1F2125" }}
                    >
                      {featuredPub.title}
                    </p>
                    <div
                      className="mt-2 flex items-center gap-1 text-[11px]"
                      style={{ color: "#8A8D93" }}
                    >
                      <Clock className="h-3 w-3" />
                      {featuredPub.readTime} {t("insights.minRead")}
                    </div>
                  </div>
                </Link>
              </div>

              {/* About the Author */}
              <div
                className="rounded-[14px] p-4"
                style={{
                  background: "#F2F0EA",
                  border: "1px solid #E3E1DA",
                }}
              >
                <div
                  className="mb-3 text-[10px] font-bold tracking-[0.22em]"
                  style={{ color: "#8A8D93" }}
                >
                  {t("insights.authorLabel")}
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src={portrait}
                    alt="Dr. Ephraim Mpofu"
                    className="h-12 w-12 rounded-full object-cover"
                    style={{ border: "2px solid #D7D4CC" }}
                  />
                  <div>
                    <div
                      className="text-[13px] font-semibold"
                      style={{ color: "#1F2125" }}
                    >
                      Dr. Ephraim Mpofu
                    </div>
                    <div
                      className="text-[11px]"
                      style={{ color: "#8A8D93" }}
                    >
                      {t("insights.authorRole")}
                    </div>
                  </div>
                </div>
                <p
                  className="mt-3 text-[12px] leading-[1.6]"
                  style={{ color: "#5A5D63" }}
                >
                  {t("insights.authorBio")}
                </p>
                <Link
                  to="/about"
                  className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium transition-colors hover:opacity-80"
                  style={{ color: "#34506E" }}
                >
                  {t("insights.viewFullProfile")} <ArrowRight className="h-3 w-3" />
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
                  className="text-[22px] font-medium tracking-[-0.01em]"
                  style={{ color: "#1F2125" }}
                >
                  {activeCategory ?? t("insights.allArticles")}
                </h2>
                <p className="mt-0.5 text-[13px]" style={{ color: "#8A8D93" }}>
                  {filtered.length} {filtered.length !== 1 ? t("insights.allArticles").toLowerCase() : t("insights.allArticles").toLowerCase().replace(/e?s$/, "")}
                  {search.trim() ? ` ${t("insights.matching")} "${search}"` : ""}
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
                  background: "#F2F0EA",
                  border: "1px solid #E3E1DA",
                }}
              >
                <div>
                  <User
                    className="mx-auto h-10 w-10 opacity-30"
                    style={{ color: "#8A8D93" }}
                  />
                  <p
                    className="mt-3 text-[14px]"
                    style={{ color: "#8A8D93" }}
                  >
                    {t("insights.noArticles")}
                    {search.trim() ? ` for "${search}"` : ""}.
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setActiveCategory(null);
                    }}
                    className="mt-3 text-[13px] transition-colors hover:opacity-80"
                    style={{ color: "#34506E" }}
                  >
                    {t("insights.clearFilters")}
                  </button>
                </div>
              </div>
            )}

            {/* Load More */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-[12px] px-7 py-3 text-[13.5px] font-semibold transition-all hover:opacity-80"
                  style={{
                    color: "#1F2125",
                    border: "1px solid #D7D4CC",
                  }}
                >
                  {t("insights.loadMore")}{" "}
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
        style={{ borderColor: "#E3E1DA" }}
      >
        <div className="mx-auto max-w-[1400px] px-6 py-5 lg:px-10">
          <div
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[12px] font-medium tracking-[0.08em]"
            style={{ color: "#8A8D93" }}
          >
            {footerItems.map((item, i) => (
              <span key={item} className="flex items-center gap-8">
                {i > 0 && (
                  <span
                    className="h-3 w-px"
                    style={{ background: "#E3E1DA" }}
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
