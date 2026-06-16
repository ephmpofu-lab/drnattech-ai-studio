import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Calendar,
  Clock,
  Bookmark,
  Share2,
  ChevronRight,
  Copy,
  Check,
  Linkedin,
  Twitter,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";
import {
  getPublicationBySlug,
  getRelatedPublications,
  type Publication,
  type ContentBlock,
  type Section,
} from "@/lib/publications";
import portrait from "@/assets/hero-portrait.jpg";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const pub = getPublicationBySlug(params.slug);
    if (!pub) throw notFound();
    return pub;
  },

  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const pub = loaderData as Publication;
    const url = `https://dr-ephraim-mpofu.com/insights/${pub.slug}`;
    return {
      meta: [
        { title: `${pub.title} | Dr. Ephraim Mpofu` },
        { name: "description", content: pub.abstract },
        { property: "og:title", content: pub.title },
        { property: "og:description", content: pub.abstract },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: pub.dateISO },
        {
          property: "article:author",
          content: "Dr. Ephraim Mpofu",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pub.title },
        { name: "twitter:description", content: pub.abstract },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },

  component: ArticlePage,
});

// ─── Schema.org JSON-LD ───────────────────────────────────────────────────────

function SchemaOrg({ pub }: { pub: Publication }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pub.title,
    description: pub.abstract,
    datePublished: pub.dateISO,
    author: {
      "@type": "Person",
      name: "Dr. Ephraim Mpofu",
      url: "https://dr-ephraim-mpofu.com/about",
      jobTitle: "AI Solutions Architect",
    },
    publisher: {
      "@type": "Person",
      name: "Dr. Ephraim Mpofu",
    },
    url: `https://dr-ephraim-mpofu.com/insights/${pub.slug}`,
    keywords: pub.tags.join(", "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Content Block Renderers ─────────────────────────────────────────────────

function BlockRenderer({
  block,
  pub,
}: {
  block: ContentBlock;
  pub: Publication;
}) {
  if (block.kind === "p") {
    return (
      <p
        className="mb-5 text-[15.5px] leading-[1.8]"
        style={{ color: "#CBD5E1" }}
      >
        {block.text}
      </p>
    );
  }

  if (block.kind === "ul") {
    return (
      <ul className="mb-5 space-y-2.5 pl-1">
        {block.items.map((item, i) => (
          <li
            key={i}
            className="flex gap-3 text-[15px] leading-[1.7]"
            style={{ color: "#CBD5E1" }}
          >
            <span
              className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: "#A855F7" }}
            />
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.kind === "quote") {
    return (
      <blockquote
        className="my-7 rounded-r-[12px] py-5 pl-6 pr-5"
        style={{
          background: "rgba(139,92,246,0.06)",
          borderLeft: "3px solid #A855F7",
        }}
      >
        <p
          className="text-[16px] font-medium italic leading-[1.75]"
          style={{ color: "#E2E8F0" }}
        >
          "{block.text}"
        </p>
        {block.attr && (
          <footer
            className="mt-2.5 text-[12.5px]"
            style={{ color: "#64748B" }}
          >
            — {block.attr}
          </footer>
        )}
      </blockquote>
    );
  }

  if (block.kind === "figure") {
    const fig = pub.figures.find((f) => f.id === block.ref);
    if (!fig) return null;
    return (
      <figure className="my-8">
        <div
          className="overflow-hidden rounded-[14px]"
          style={{ border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <img
            src={pub.heroImage}
            alt={fig.alt}
            className="h-auto w-full object-cover"
            style={{ maxHeight: "420px" }}
          />
        </div>
        <figcaption
          className="mt-3 text-center text-[12.5px]"
          style={{ color: "#64748B" }}
        >
          {fig.caption}
        </figcaption>
      </figure>
    );
  }

  if (block.kind === "table") {
    const tbl = pub.tables.find((t) => t.id === block.ref);
    if (!tbl) return null;
    return (
      <div className="my-8 overflow-x-auto">
        <table className="w-full text-[14px]">
          <caption
            className="mb-3 text-left text-[13px] font-semibold"
            style={{ color: "#94A3B8" }}
          >
            {tbl.caption}
          </caption>
          <thead>
            <tr
              style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              {tbl.headers.map((h) => (
                <th
                  key={h}
                  className="pb-3 pr-6 text-left text-[12px] font-semibold tracking-[0.08em]"
                  style={{ color: "#64748B" }}
                >
                  {h.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbl.rows.map((row, ri) => (
              <tr
                key={ri}
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="py-3.5 pr-6 text-[14px] leading-[1.55]"
                    style={{ color: ci === 0 ? "#E2E8F0" : "#94A3B8" }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return null;
}

// ─── Section Component ────────────────────────────────────────────────────────

function SectionRenderer({
  section,
  pub,
  isActive,
}: {
  section: Section;
  pub: Publication;
  isActive: boolean;
}) {
  return (
    <section id={section.id} className="mb-12 scroll-mt-[120px]">
      <h2
        className="mb-5 text-[24px] font-bold leading-[1.25] tracking-[-0.01em]"
        style={{
          color: isActive ? "#E2E8F0" : "#CBD5E1",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          paddingBottom: "0.75rem",
        }}
      >
        {section.heading}
      </h2>
      {section.blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} pub={pub} />
      ))}
    </section>
  );
}

// ─── TOC + Active Section Hook ────────────────────────────────────────────────

function useTOCActiveSection(sectionIds: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (sectionIds.length === 0) return;

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sectionIds]);

  return activeId;
}

// ─── Cite Box ─────────────────────────────────────────────────────────────────

function CiteBox({ pub }: { pub: Publication }) {
  const [copied, setCopied] = useState(false);
  const citation = `Mpofu, E. (${pub.dateISO.slice(0, 4)}). ${pub.title}. Dr. Ephraim Mpofu — Insights & Publications. https://dr-ephraim-mpofu.com/insights/${pub.slug}`;

  function handleCopy() {
    navigator.clipboard.writeText(citation).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <div
      className="mt-10 rounded-[14px] p-6"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        className="mb-3 text-[11px] font-bold tracking-[0.18em]"
        style={{ color: "#64748B" }}
      >
        CITE THIS ARTICLE
      </div>
      <p
        className="mb-4 font-mono text-[13px] leading-[1.7]"
        style={{ color: "#94A3B8" }}
      >
        {citation}
      </p>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-[12.5px] font-medium transition-all hover:bg-white/5"
        style={{
          border: "1px solid rgba(255,255,255,0.1)",
          color: copied ? "#34D399" : "#94A3B8",
        }}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" /> Copied!
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> Copy Citation
          </>
        )}
      </button>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

function ArticlePage() {
  const pub = Route.useLoaderData() as Publication;
  const related = getRelatedPublications(pub.relatedSlugs);
  const sectionIds = pub.sections.map((s) => s.id);
  const activeId = useTOCActiveSection(sectionIds);
  const [bookmarked, setBookmarked] = useState(false);
  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://dr-ephraim-mpofu.com/insights/${pub.slug}`;
  const [linkCopied, setLinkCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  function handleCopyLink() {
    navigator.clipboard.writeText(articleUrl).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    });
  }

  function scrollToSection(e: React.MouseEvent, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      className="relative min-h-screen"
      style={{ background: "#050816", color: "#fff" }}
    >
      <SchemaOrg pub={pub} />
      <BrandBackground />
      <SiteNav active="Insights" />

      <main ref={articleRef} className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-1.5 py-6 text-[12.5px]"
          style={{ color: "#475569" }}
          aria-label="Breadcrumb"
        >
          <Link
            to="/insights"
            className="transition-colors hover:text-white"
          >
            Insights
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span
            className="rounded px-1.5 py-0.5 text-[11.5px] font-semibold"
            style={{
              background: `${pub.categoryColor}18`,
              color: pub.categoryColor,
            }}
          >
            {pub.category}
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span
            className="max-w-[300px] truncate"
            style={{ color: "#94A3B8" }}
          >
            {pub.title}
          </span>
        </nav>

        {/* ── Article Header ── */}
        <header className="mb-8 max-w-[820px]">
          {/* Category badge */}
          <span
            className="inline-block rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.15em]"
            style={{
              background: `${pub.categoryColor}18`,
              border: `1px solid ${pub.categoryColor}40`,
              color: pub.categoryColor,
            }}
          >
            {pub.category.toUpperCase()}
          </span>

          {/* Title */}
          <h1
            className="mt-4 text-[38px] font-bold leading-[1.15] tracking-[-0.02em] lg:text-[46px]"
            style={{ color: "#F1F5F9" }}
          >
            {pub.title}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-3 text-[17px] leading-[1.6]"
            style={{ color: "#94A3B8" }}
          >
            {pub.subtitle}
          </p>

          {/* Author info bar */}
          <div
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[12px] p-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src={portrait}
                alt="Dr. Ephraim Mpofu"
                className="h-10 w-10 rounded-full object-cover"
                style={{ border: "2px solid rgba(139,92,246,0.4)" }}
              />
              <div>
                <div className="text-[14px] font-semibold">
                  Dr. Ephraim Mpofu
                </div>
                <div
                  className="text-[12px]"
                  style={{ color: "#64748B" }}
                >
                  AI Solutions Architect · Vienna
                </div>
              </div>
            </div>

            <div
              className="hidden h-8 w-px lg:block"
              style={{ background: "rgba(255,255,255,0.07)" }}
            />

            <div
              className="flex items-center gap-1.5 text-[13px]"
              style={{ color: "#64748B" }}
            >
              <Calendar className="h-3.5 w-3.5" />
              {pub.date}
            </div>

            <div
              className="flex items-center gap-1.5 text-[13px]"
              style={{ color: "#64748B" }}
            >
              <Clock className="h-3.5 w-3.5" />
              {pub.readTime} min read
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setBookmarked((b) => !b)}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-all hover:bg-white/5"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: bookmarked ? "#A855F7" : "#64748B",
                }}
                aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
              >
                <Bookmark className="h-3.5 w-3.5" fill={bookmarked ? "#A855F7" : "none"} />
              </button>
              <button
                onClick={handleCopyLink}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-all hover:bg-white/5"
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: linkCopied ? "#34D399" : "#64748B",
                }}
                aria-label="Share"
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* ── Hero Image ── */}
        <div className="relative mb-10 overflow-hidden rounded-[20px]">
          <img
            src={pub.heroImage}
            alt={pub.title}
            className="h-[380px] w-full object-cover lg:h-[460px]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 40%, rgba(5,8,22,0.7) 100%)",
            }}
          />
          <div className="absolute bottom-5 left-6 right-6">
            <p
              className="text-[12.5px]"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              {pub.heroCaption}
            </p>
          </div>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col gap-10 pb-20 lg:flex-row lg:gap-12">
          {/* ── Main Content (left, 65%) ── */}
          <div className="min-w-0 flex-[65]">
            {/* Abstract */}
            <div
              className="mb-10 rounded-[14px] p-6"
              style={{
                background: "rgba(139,92,246,0.05)",
                borderLeft: "3px solid #A855F7",
              }}
            >
              <div
                className="mb-2.5 text-[11px] font-bold tracking-[0.18em]"
                style={{ color: "#A855F7" }}
              >
                ABSTRACT
              </div>
              <p
                className="text-[15px] leading-[1.8]"
                style={{ color: "#CBD5E1" }}
              >
                {pub.abstract}
              </p>
            </div>

            {/* Article Sections */}
            {pub.sections.map((section) => (
              <SectionRenderer
                key={section.id}
                section={section}
                pub={pub}
                isActive={activeId === section.id}
              />
            ))}

            {/* References */}
            {pub.references.length > 0 && (
              <section className="mb-10">
                <h2
                  className="mb-5 text-[20px] font-bold"
                  style={{
                    color: "#CBD5E1",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    paddingBottom: "0.75rem",
                  }}
                >
                  References
                </h2>
                <ol className="space-y-4">
                  {pub.references.map((ref, i) => (
                    <li
                      key={ref.id}
                      className="flex gap-4 text-[13.5px] leading-[1.7]"
                      style={{ color: "#94A3B8" }}
                    >
                      <span
                        className="mt-0.5 shrink-0 font-semibold tabular-nums"
                        style={{ color: "#64748B" }}
                      >
                        [{i + 1}]
                      </span>
                      <span>
                        {ref.authors} ({ref.year}). {ref.title}.{" "}
                        <em>{ref.source}</em>.{" "}
                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 transition-colors hover:text-white"
                            style={{ color: "#A855F7" }}
                          >
                            View <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>
            )}

            {/* Cite This Article */}
            <CiteBox pub={pub} />

            {/* About the Author */}
            <div
              className="mt-10 rounded-[18px] p-7"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="mb-4 text-[11px] font-bold tracking-[0.18em]"
                style={{ color: "#64748B" }}
              >
                ABOUT THE AUTHOR
              </div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <img
                  src={portrait}
                  alt="Dr. Ephraim Mpofu"
                  className="h-[80px] w-[80px] shrink-0 rounded-[14px] object-cover"
                  style={{ border: "2px solid rgba(139,92,246,0.35)" }}
                />
                <div>
                  <h3
                    className="text-[18px] font-bold"
                    style={{ color: "#F1F5F9" }}
                  >
                    Dr. Ephraim Mpofu
                  </h3>
                  <div
                    className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[12.5px]"
                    style={{ color: "#64748B" }}
                  >
                    <span>AI Solutions Architect</span>
                    <span>·</span>
                    <span>Knowledge Systems Expert</span>
                    <span>·</span>
                    <span>Vienna, Austria</span>
                  </div>
                  <p
                    className="mt-3 text-[14px] leading-[1.75]"
                    style={{ color: "#94A3B8" }}
                  >
                    Dr. Ephraim Mpofu is an AI Solutions Architect and researcher
                    specialising in enterprise AI systems, knowledge architecture,
                    and AI governance. He holds a PhD (Dr.nat.techn.) from BOKU
                    Vienna and consults for enterprises navigating EU AI Act
                    compliance, RAG system design, and multi-agent workflow
                    automation.
                  </p>
                  <Link
                    to="/about"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors"
                    style={{ color: "#A855F7" }}
                  >
                    View Full Profile <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar (right, 35%) ── */}
          <aside className="hidden shrink-0 flex-[35] lg:block">
            <div className="sticky top-[110px] flex flex-col gap-6">
              {/* On This Page */}
              <div
                className="rounded-[14px] p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: "#64748B" }}
                >
                  ON THIS PAGE
                </div>
                <nav className="flex flex-col gap-1">
                  {pub.sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      onClick={(e) => scrollToSection(e, s.id)}
                      className="rounded-[7px] px-3 py-2 text-[13px] leading-[1.4] transition-all"
                      style={
                        activeId === s.id
                          ? {
                              background: "rgba(139,92,246,0.12)",
                              color: "#C4B5FD",
                              borderLeft: "2px solid #A855F7",
                              paddingLeft: "10px",
                            }
                          : { color: "#64748B" }
                      }
                    >
                      {s.heading}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Categories */}
              <div
                className="rounded-[14px] p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: "#64748B" }}
                >
                  TAGS
                </div>
                <div className="flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 text-[11.5px] font-medium"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.09)",
                        color: "#94A3B8",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div
                className="rounded-[14px] p-5"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div
                  className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: "#64748B" }}
                >
                  SHARE
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-[13px] font-medium transition-all hover:bg-white/5"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#94A3B8",
                    }}
                  >
                    <Linkedin className="h-4 w-4 shrink-0" style={{ color: "#0A66C2" }} />
                    Share on LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(pub.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-[13px] font-medium transition-all hover:bg-white/5"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "#94A3B8",
                    }}
                  >
                    <Twitter className="h-4 w-4 shrink-0" style={{ color: "#1DA1F2" }} />
                    Share on Twitter
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-left text-[13px] font-medium transition-all hover:bg-white/5"
                    style={{
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: linkCopied ? "#34D399" : "#94A3B8",
                    }}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="h-4 w-4 shrink-0" />
                        Link copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 shrink-0" />
                        Copy link
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              {related.length > 0 && (
                <div
                  className="rounded-[14px] p-5"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                    style={{ color: "#64748B" }}
                  >
                    RELATED ARTICLES
                  </div>
                  <div className="flex flex-col gap-4">
                    {related.map((rel) => (
                      <Link
                        key={rel.slug}
                        to="/insights/$slug"
                        params={{ slug: rel.slug }}
                        className="group flex gap-3 transition-opacity hover:opacity-90"
                      >
                        <div className="h-[60px] w-[80px] shrink-0 overflow-hidden rounded-[8px]">
                          <img
                            src={rel.heroImage}
                            alt={rel.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="min-w-0">
                          <span
                            className="text-[10px] font-bold"
                            style={{ color: rel.categoryColor }}
                          >
                            {rel.category.toUpperCase()}
                          </span>
                          <p
                            className="mt-0.5 line-clamp-2 text-[12.5px] font-medium leading-[1.4]"
                            style={{ color: "#CBD5E1" }}
                          >
                            {rel.title}
                          </p>
                          <div
                            className="mt-1 flex items-center gap-1 text-[11px]"
                            style={{ color: "#475569" }}
                          >
                            <Calendar className="h-2.5 w-2.5" />
                            {rel.date}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* ── Back to Insights ── */}
        <div
          className="border-t pb-10 pt-8"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[13.5px] font-medium transition-colors hover:text-white"
            style={{ color: "#64748B" }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Insights
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
