import {
  createFileRoute,
  Link,
  notFound,
} from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import {
  getPublicationBySlug,
  getRelatedPublications,
  type Publication,
  type Figure,
} from "@/lib/publications";
const portrait = "/images/Dr Mpofu_purple2.webp";

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
    const title = pub.seoTitle || `${pub.title} | Dr. Ephraim Mpofu`;
    const description = pub.seoDescription || pub.abstract;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: pub.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: pub.dateISO },
        {
          property: "article:author",
          content: "Dr. Ephraim Mpofu",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: pub.title },
        { name: "twitter:description", content: description },
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

// ─── Markdown Helpers ─────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function extractHeadings(markdown: string): Array<{ id: string; heading: string }> {
  return markdown
    .split('\n')
    .filter((line) => line.startsWith('## '))
    .map((line) => {
      const heading = line.replace(/^## /, '');
      return { id: slugify(heading), heading };
    });
}

// ─── Markdown Body Component ──────────────────────────────────────────────────

const MARKDOWN_COMPONENTS = {
  h2: ({ children }: { children?: React.ReactNode }) => {
    const id = slugify(String(children));
    return (
      <h2
        id={id}
        className="mb-5 mt-10 scroll-mt-[120px] text-[24px] font-medium leading-[1.25] tracking-[-0.01em] first:mt-0"
        style={{
          color: '#1F2125',
          borderBottom: '1px solid #E3E1DA',
          paddingBottom: '0.75rem',
        }}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3
      className="mb-4 mt-7 text-[19px] font-medium leading-[1.3]"
      style={{ color: '#1F2125' }}
    >
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="mb-5 text-[15.5px] leading-[1.8]" style={{ color: '#5A5D63' }}>
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-5 space-y-2.5 pl-1">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5 text-[15px] leading-[1.7]" style={{ color: '#5A5D63' }}>
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li
      className="flex gap-3 text-[15px] leading-[1.7]"
      style={{ color: '#5A5D63' }}
    >
      <span
        className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: '#34506E' }}
      />
      <span>{children}</span>
    </li>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote
      className="my-7 rounded-r-[12px] py-5 pl-6 pr-5"
      style={{
        background: '#E9EFF4',
        borderLeft: '3px solid #34506E',
      }}
    >
      <div
        className="text-[16px] font-medium italic leading-[1.75]"
        style={{ color: '#1F2125' }}
      >
        {children}
      </div>
    </blockquote>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full text-[14px]">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead style={{ borderBottom: '1px solid #E3E1DA' }}>
      {children}
    </thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th
      className="pb-3 pr-6 text-left text-[12px] font-semibold tracking-[0.08em]"
      style={{ color: '#8A8D93' }}
    >
      {String(children).toUpperCase()}
    </th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td
      className="py-3.5 pr-6 text-[14px] leading-[1.55]"
      style={{
        color: '#5A5D63',
        borderBottom: '1px solid #E3E1DA',
      }}
    >
      {children}
    </td>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold" style={{ color: '#1F2125' }}>
      {children}
    </strong>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{ color: '#34506E' }}
      className="underline underline-offset-2 transition-colors hover:opacity-70"
    >
      {children}
    </a>
  ),
  code: ({ children, className }: { children?: React.ReactNode; className?: string }) => {
    const isBlock = className?.includes('language-');
    if (isBlock) {
      return (
        <pre
          className="my-6 overflow-x-auto rounded-[12px] p-5 text-[13px] leading-[1.65]"
          style={{
            background: '#EDEBE3',
            border: '1px solid #E3E1DA',
            color: '#5A5D63',
          }}
        >
          <code>{children}</code>
        </pre>
      );
    }
    return (
      <code
        className="rounded px-1.5 py-0.5 text-[13px]"
        style={{
          background: '#EDEBE3',
          color: '#34506E',
        }}
      >
        {children}
      </code>
    );
  },
};

const FIGURE_MARKER_RE = /(\[\[figure-\d+\]\])/g;
const FIGURE_KEY_RE = /^\[\[(figure-\d+)\]\]$/;

function MarkdownBody({ body, figures }: { body: string; figures?: Figure[] }) {
  const { t } = useTranslation("common");
  const figureMap: Record<string, Figure> = {};
  for (const f of figures ?? []) {
    figureMap[f.marker] = f;
  }

  const bodyMarkers = [...body.matchAll(/\[\[(figure-\d+)\]\]/g)].map(m => m[1]);
  const uploadedSet = new Set(Object.keys(figureMap));
  const bodySet = new Set(bodyMarkers);
  const orphaned = [...uploadedSet].filter(m => !bodySet.has(m));
  const missing = [...bodySet].filter(m => !uploadedSet.has(m));

  const parts = body.split(FIGURE_MARKER_RE);

  return (
    <div>
      {(orphaned.length > 0 || missing.length > 0) && (
        <div
          className="mb-6 rounded-[10px] p-4"
          style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)' }}
        >
          <p className="mb-1 text-[12px] font-semibold" style={{ color: '#F59E0B' }}>
            {t("article.figurePlacementWarning")}
          </p>
          {orphaned.map(m => (
            <p key={m} className="text-[12px]" style={{ color: '#D97706' }}>
              [[{m}]] — figure uploaded but no matching marker found in the article body.
            </p>
          ))}
          {missing.map(m => (
            <p key={m} className="text-[12px]" style={{ color: '#D97706' }}>
              [[{m}]] — marker found in body but no figure was uploaded for it.
            </p>
          ))}
        </div>
      )}
      {parts.map((part, i) => {
        const markerMatch = part.match(FIGURE_KEY_RE);
        if (markerMatch) {
          const fig = figureMap[markerMatch[1]];
          if (!fig) return null;
          return (
            <figure
              key={i}
              className="my-8 overflow-hidden rounded-[14px]"
              style={{ border: '1px solid #E3E1DA' }}
            >
              <img
                src={fig.image}
                alt={fig.caption}
                className="w-full object-cover"
                loading="lazy"
              />
              {fig.caption && (
                <figcaption
                  className="px-4 py-3 text-center text-[13px] leading-[1.6]"
                  style={{
                    color: '#8A8D93',
                    background: '#FAFAF8',
                    borderTop: '1px solid #E3E1DA',
                  }}
                >
                  {fig.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        if (!part.trim()) return null;
        return (
          <ReactMarkdown key={i} remarkPlugins={[remarkGfm]} components={MARKDOWN_COMPONENTS}>
            {part}
          </ReactMarkdown>
        );
      })}
    </div>
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
  const { t } = useTranslation("common");
  const [copied, setCopied] = useState(false);
  const citation = pub.citation || `Mpofu, E. (${pub.dateISO.slice(0, 4)}). ${pub.title}. Dr. Ephraim Mpofu — Insights & Publications. https://dr-ephraim-mpofu.com/insights/${pub.slug}`;

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
        background: "#F2F0EA",
        border: "1px solid #E3E1DA",
      }}
    >
      <div
        className="mb-3 text-[11px] font-bold tracking-[0.18em]"
        style={{ color: "#8A8D93" }}
      >
        {t("article.cite").toUpperCase()}
      </div>
      <p
        className="mb-4 font-mono text-[13px] leading-[1.7]"
        style={{ color: "#5A5D63" }}
      >
        {citation}
      </p>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-[8px] px-4 py-2 text-[12.5px] font-medium transition-all hover:bg-black/5"
        style={{
          border: "1px solid #D7D4CC",
          color: copied ? "#059669" : "#5A5D63",
        }}
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5" /> {t("article.citationCopied")}
          </>
        ) : (
          <>
            <Copy className="h-3.5 w-3.5" /> {t("article.copyCitation")}
          </>
        )}
      </button>
    </div>
  );
}

// ─── Raw Bibliography ─────────────────────────────────────────────────────────

function RawBibliography({ text }: { text: string }) {
  const rawBlocks = text.split(/\r?\n(?:\s*\r?\n)+/);

  const blocks =
    rawBlocks.length > 1
      ? rawBlocks.map((b) => b.trim()).filter(Boolean)
      : text
          .split(/\r?\n/)
          .map((l) => l.trim())
          .filter(Boolean);

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => {
        const lines = block.split(/\r?\n/);
        return (
          <div
            key={i}
            className="rounded-[10px] p-4"
            style={{
              background: "#F2F0EA",
              border: "1px solid #E3E1DA",
            }}
          >
            {lines.map((line, j) => (
              <div
                key={j}
                style={{
                  color: j === 0 ? "#1F2125" : "#8A8D93",
                  fontSize: "13.5px",
                  lineHeight: "1.75",
                  fontWeight: j === 0 ? 500 : 400,
                }}
              >
                {line}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

function ArticlePage() {
  const { t } = useTranslation("common");
  const pub = Route.useLoaderData() as Publication;
  const related = getRelatedPublications(pub.relatedSlugs);
  const toc = extractHeadings(pub.body);
  const activeId = useTOCActiveSection(toc.map((h) => h.id));
  const [bookmarked, setBookmarked] = useState(false);
  const articleUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://dr-ephraim-mpofu.com/insights/${pub.slug}`;
  const [linkCopied, setLinkCopied] = useState(false);

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
      className="light-page relative min-h-screen"
      style={{ background: "#FAFAF8", color: "#1F2125" }}
    >
      <SchemaOrg pub={pub} />
      <SiteNav active="Insights" />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ── Breadcrumb ── */}
        <nav
          className="flex items-center gap-1.5 py-6 text-[12.5px]"
          style={{ color: "#8A8D93" }}
          aria-label="Breadcrumb"
        >
          <Link
            to="/insights"
            className="transition-colors hover:text-[#34506E]"
          >
            {t("nav.insights")}
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
            style={{ color: "#5A5D63" }}
          >
            {pub.title}
          </span>
        </nav>

        {/* ── Article Header ── */}
        <header className="mb-8 max-w-[820px]">
          {/* Category badge */}
          <span className="text-[11px] font-bold tracking-[0.15em]" style={{ color: pub.categoryColor }}>
            {pub.category.toUpperCase()}
          </span>

          {/* Title */}
          <h1
            className="mt-4 text-[38px] font-medium leading-[1.15] tracking-[-0.02em] lg:text-[46px]"
            style={{ color: "#1F2125" }}
          >
            {pub.title}
          </h1>

          {/* Subtitle */}
          <p
            className="mt-3 text-[17px] leading-[1.6]"
            style={{ color: "#5A5D63" }}
          >
            {pub.subtitle}
          </p>

          {/* Author info bar */}
          <div
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-[12px] p-4"
            style={{
              background: "#F2F0EA",
              border: "1px solid #E3E1DA",
            }}
          >
            <div className="flex items-center gap-3">
              <img
                src={portrait}
                alt="Dr. Ephraim Mpofu"
                className="h-10 w-10 rounded-full object-cover"
                style={{ border: "2px solid #D7D4CC" }}
              />
              <div>
                <div className="text-[14px] font-medium" style={{ color: "#1F2125" }}>
                  {pub.author}
                </div>
                <div
                  className="text-[12px]"
                  style={{ color: "#8A8D93" }}
                >
                  {t("article.authorRole")}
                </div>
              </div>
            </div>

            <div
              className="hidden h-8 w-px lg:block"
              style={{ background: "#E3E1DA" }}
            />

            <div
              className="flex items-center gap-1.5 text-[13px]"
              style={{ color: "#8A8D93" }}
            >
              <Calendar className="h-3.5 w-3.5" />
              {pub.date}
            </div>

            <div
              className="flex items-center gap-1.5 text-[13px]"
              style={{ color: "#8A8D93" }}
            >
              <Clock className="h-3.5 w-3.5" />
              {pub.readTime} {t("article.minRead")}
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setBookmarked((b) => !b)}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-all hover:bg-black/5"
                style={{
                  border: "1px solid #E3E1DA",
                  color: bookmarked ? "#34506E" : "#8A8D93",
                }}
                aria-label={bookmarked ? t("article.bookmarked") : t("article.bookmark")}
              >
                <Bookmark className="h-3.5 w-3.5" fill={bookmarked ? "#34506E" : "none"} />
              </button>
              <button
                onClick={handleCopyLink}
                className="flex h-8 w-8 items-center justify-center rounded-[8px] transition-all hover:bg-black/5"
                style={{
                  border: "1px solid #E3E1DA",
                  color: linkCopied ? "#059669" : "#8A8D93",
                }}
                aria-label={t("article.share")}
              >
                <Share2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* ── Hero Image ── */}
        {pub.heroImage && (
          <div className="relative mb-10 overflow-hidden rounded-[20px]" style={{ border: "1px solid #E3E1DA" }}>
            <img
              src={pub.heroImage}
              alt={pub.title}
              className="h-[380px] w-full object-cover lg:h-[460px]"
            />
            <div className="absolute bottom-5 left-6 right-6">
              <p
                className="text-[12.5px]"
                style={{ color: "rgba(255,255,255,0.8)", textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
              >
                {pub.heroCaption}
              </p>
            </div>
          </div>
        )}

        {/* ── Two-column layout ── */}
        <div className="flex flex-col gap-10 pb-20 lg:flex-row lg:gap-12">
          {/* ── Main Content (left, 65%) ── */}
          <div className="min-w-0 flex-[65]">
            {/* Abstract */}
            <div
              className="mb-10 rounded-[14px] p-6"
              style={{
                background: "#E9EFF4",
                borderLeft: "3px solid #34506E",
              }}
            >
              <div
                className="mb-2.5 text-[11px] font-bold tracking-[0.18em]"
                style={{ color: "#34506E" }}
              >
                {t("article.abstract").toUpperCase()}
              </div>
              <p
                className="text-[15px] leading-[1.8]"
                style={{ color: "#5A5D63" }}
              >
                {pub.abstract}
              </p>
            </div>

            {/* Article Body — Markdown */}
            <MarkdownBody body={pub.body} figures={pub.figures} />

            {/* References */}
            {(pub.rawReferences || pub.references.length > 0) && (
              <section className="mb-10">
                <h2
                  className="mb-5 text-[20px] font-medium"
                  style={{
                    color: "#1F2125",
                    borderBottom: "1px solid #E3E1DA",
                    paddingBottom: "0.75rem",
                  }}
                >
                  {t("article.references")}
                </h2>

                {pub.rawReferences ? (
                  <RawBibliography text={pub.rawReferences} />
                ) : (
                  <ol className="space-y-4">
                    {pub.references.map((ref, i) => (
                      <li
                        key={ref.id}
                        className="flex gap-4 text-[13.5px] leading-[1.7]"
                        style={{ color: "#5A5D63" }}
                      >
                        <span
                          className="mt-0.5 shrink-0 font-semibold tabular-nums"
                          style={{ color: "#8A8D93" }}
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
                              className="inline-flex items-center gap-1 transition-colors hover:opacity-70"
                              style={{ color: "#34506E" }}
                            >
                              View <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </span>
                      </li>
                    ))}
                  </ol>
                )}
              </section>
            )}

            {/* Cite This Article */}
            <CiteBox pub={pub} />

            {/* About the Author */}
            <div
              className="mt-10 rounded-[18px] p-7"
              style={{
                background: "#F2F0EA",
                border: "1px solid #E3E1DA",
              }}
            >
              <div
                className="mb-4 text-[11px] font-bold tracking-[0.18em]"
                style={{ color: "#8A8D93" }}
              >
                {t("article.aboutAuthor").toUpperCase()}
              </div>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <img
                  src={portrait}
                  alt="Dr. Ephraim Mpofu"
                  className="h-[80px] w-[80px] shrink-0 rounded-[14px] object-cover"
                  style={{ border: "2px solid #D7D4CC" }}
                />
                <div>
                  <h3
                    className="text-[18px] font-medium"
                    style={{ color: "#1F2125" }}
                  >
                    Dr. Ephraim Mpofu
                  </h3>
                  <div
                    className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[12.5px]"
                    style={{ color: "#8A8D93" }}
                  >
                    <span>{t("article.authorTitle")}</span>
                    <span>·</span>
                    <span>{t("article.authorExpertise")}</span>
                    <span>·</span>
                    <span>{t("article.authorLocation")}</span>
                  </div>
                  <p
                    className="mt-3 text-[14px] leading-[1.75]"
                    style={{ color: "#5A5D63" }}
                  >
                    {t("article.authorBio")}
                  </p>
                  <Link
                    to="/about"
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors hover:opacity-70"
                    style={{ color: "#34506E" }}
                  >
                    {t("article.viewProfile")} <ArrowLeft className="h-3.5 w-3.5 rotate-180" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* ── Sidebar (right, 35%) ── */}
          <aside className="hidden shrink-0 flex-[35] lg:block">
            <div className="sticky top-[110px] flex flex-col gap-6">
              {/* On This Page */}
              {toc.length > 0 && (
                <div
                  className="rounded-[14px] p-5"
                  style={{
                    background: "#F2F0EA",
                    border: "1px solid #E3E1DA",
                  }}
                >
                  <div
                    className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                    style={{ color: "#8A8D93" }}
                  >
                    {t("article.toc").toUpperCase()}
                  </div>
                  <nav className="flex flex-col gap-1">
                    {toc.map((s) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={(e) => scrollToSection(e, s.id)}
                        className="rounded-[7px] px-3 py-2 text-[13px] leading-[1.4] transition-all"
                        style={
                          activeId === s.id
                            ? {
                                background: "#E9EFF4",
                                color: "#34506E",
                                borderLeft: "2px solid #34506E",
                                paddingLeft: "10px",
                              }
                            : { color: "#5A5D63" }
                        }
                      >
                        {s.heading}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Tags */}
              <div
                className="rounded-[14px] p-5"
                style={{
                  background: "#F2F0EA",
                  border: "1px solid #E3E1DA",
                }}
              >
                <div
                  className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: "#8A8D93" }}
                >
                  {t("article.tags").toUpperCase()}
                </div>
                <div className="flex flex-wrap gap-2">
                  {pub.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11.5px] font-medium"
                      style={{ color: "#5A5D63" }}
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
                  background: "#F2F0EA",
                  border: "1px solid #E3E1DA",
                }}
              >
                <div
                  className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                  style={{ color: "#8A8D93" }}
                >
                  {t("article.share").toUpperCase()}
                </div>
                <div className="flex flex-col gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-[13px] font-medium transition-all hover:bg-black/5"
                    style={{
                      border: "1px solid #E3E1DA",
                      color: "#5A5D63",
                    }}
                  >
                    <Linkedin className="h-4 w-4 shrink-0" style={{ color: "#0A66C2" }} />
                    {t("article.shareLinkedIn")}
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(pub.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-[13px] font-medium transition-all hover:bg-black/5"
                    style={{
                      border: "1px solid #E3E1DA",
                      color: "#5A5D63",
                    }}
                  >
                    <Twitter className="h-4 w-4 shrink-0" style={{ color: "#1DA1F2" }} />
                    {t("article.shareTwitter")}
                  </a>
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-3 rounded-[9px] px-3.5 py-2.5 text-left text-[13px] font-medium transition-all hover:bg-black/5"
                    style={{
                      border: "1px solid #E3E1DA",
                      color: linkCopied ? "#059669" : "#5A5D63",
                    }}
                  >
                    {linkCopied ? (
                      <>
                        <Check className="h-4 w-4 shrink-0" />
                        {t("article.copied")}
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 shrink-0" />
                        {t("article.copyLink")}
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
                    background: "#F2F0EA",
                    border: "1px solid #E3E1DA",
                  }}
                >
                  <div
                    className="mb-4 text-[10px] font-bold tracking-[0.2em]"
                    style={{ color: "#8A8D93" }}
                  >
                    {t("article.relatedArticles").toUpperCase()}
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
                            style={{ color: "#1F2125" }}
                          >
                            {rel.title}
                          </p>
                          <div
                            className="mt-1 flex items-center gap-1 text-[11px]"
                            style={{ color: "#8A8D93" }}
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
          style={{ borderColor: "#E3E1DA" }}
        >
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[13.5px] font-medium transition-colors hover:text-[#34506E]"
            style={{ color: "#8A8D93" }}
          >
            <ArrowLeft className="h-4 w-4" />
            {t("article.backToInsights")}
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
