import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  FlaskConical,
  Check,
} from "lucide-react";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";
import { BrandBackground } from "@/components/brand/Background";
import art2 from "@/assets/insight-article-2.jpg";
import art3 from "@/assets/insight-article-3.jpg";
import art4 from "@/assets/insight-article-4.jpg";
import heroImg from "@/assets/insights-hero-v2.jpg";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      {
        title:
          "Academic Publications | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Peer-reviewed publications covering sustainability, governance, systems thinking and interdisciplinary knowledge systems.",
      },
    ],
  }),

  component: PublicationsPage,
});

type Pub = {
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  doiUrl: string;
  url: string;
  thumb: string;
};

const published: Pub[] = [
  {
    title: "Bridging Knowledge Systems in Sustainability Doctoral Education",
    authors:
      "Alexander Mitrofanenko, Charlotte Voigt, Ephraim Mpofu, Carmen Séra-Penker, Maria Wirth, Markus Fiebig, Thomas Thaler, Werner Zollitsch, Christoph Winckler",
    journal: "GAIA – Ecological Perspectives for Science and Society",
    year: 2026,
    doi: "10.14512/gaia.35.2.5",
    doiUrl: "https://doi.org/10.14512/gaia.35.2.5",
    url: "https://www.ingentaconnect.com/content/oekom/gaia/2026/00000035/00000002/art00006",
    thumb: art4,
  },
  {
    title:
      "Fragmented Governance, Shared Landscapes: Policy and Functional (In)Coherence Insights from the Great Limpopo Transfrontier Conservation Area",
    authors:
      "Ephraim Mpofu, Marianne Penker, Verena Radinger-Peer, Walter Musakwa, Katharina Gugerell",
    journal: "Environmental Management",
    year: 2025,
    doi: "10.1007/s00267-025-02309-9",
    doiUrl: "https://doi.org/10.1007/s00267-025-02309-9",
    url: "https://link.springer.com/article/10.1007/s00267-025-02309-9",
    thumb: art2,
  },
  {
    title:
      "Cultural and Empowerment Priorities Amid Tensions in Knowledge Systems and Resource Allocation: Insights from the Great Limpopo Transfrontier Conservation Area",
    authors:
      "Ephraim Mpofu, Walter Musakwa, Verena Radinger-Peer, Marianne Penker, Katharina Gugerell",
    journal: "Ecology and Society",
    year: 2025,
    doi: "10.5751/ES-15729-300109",
    doiUrl: "https://doi.org/10.5751/ES-15729-300109",
    url: "https://ecologyandsociety.org/vol30/iss1/art9/",
    thumb: heroImg,
  },
  {
    title:
      "Discourses on Landscape Governance and Transfrontier Conservation Areas: Converging, Diverging and Evolving Discourses with Geographic Contextual Nuances",
    authors:
      "Ephraim Mpofu, Walter Musakwa, Verena Radinger-Peer, Marianne Penker, Katharina Gugerell",
    journal: "Biodiversity and Conservation",
    year: 2023,
    doi: "10.1007/s10531-023-02720-w",
    doiUrl: "https://doi.org/10.1007/s10531-023-02720-w",
    url: "https://link.springer.com/article/10.1007/s10531-023-02720-w",
    thumb: art4,
  },
  {
    title:
      "Local Community Perceptions on Landscape Change, Ecosystem Services, Climate Change, and Livelihoods in Gonarezhou National Park, Zimbabwe",
    authors: "Walter Musakwa, Ephraim Mpofu, Nesisa Analisa Nyathi",
    journal: "Sustainability",
    year: 2020,
    doi: "10.3390/su12114610",
    doiUrl: "https://doi.org/10.3390/su12114610",
    url: "https://www.mdpi.com/2071-1050/12/11/4610",
    thumb: art3,
  },
  {
    title:
      "Partnerships and Stakeholder Participation in the Management of National Parks: Experiences of the Gonarezhou National Park in Zimbabwe",
    authors:
      "Walter Musakwa, Trynos Gumbo, Gaynor Paradza, Ephraim Mpofu, Nesisa Analisa Nyathi, Ntlakala B. Selamolela",
    journal: "Land",
    year: 2020,
    doi: "10.3390/land9110399",
    doiUrl: "https://doi.org/10.3390/land9110399",
    url: "https://www.mdpi.com/2073-445X/9/11/399",
    thumb: art2,
  },
  {
    title: "Modelling of Natural Fire Occurrences: A Case of South Africa",
    authors: "T. Moyo, W. Musakwa, N.A. Nyathi, E. Mpofu, T. Gumbo",
    journal: "ISPRS Archives / Copernicus Publications",
    year: 2020,
    doi: "10.5194/isprs-archives-XLIII-B3-2020-1477-2020",
    doiUrl: "https://doi.org/10.5194/isprs-archives-XLIII-B3-2020-1477-2020",
    url: "https://isprs-archives.copernicus.org/articles/XLIII-B3-2020/1477/2020/",
    thumb: art4,
  },
  {
    title:
      "The Changing Relationship Between Precipitation and Runoff on the Loess Plateau, China",
    authors: "C. Miao, H. Zheng, J. Jiao, X. Feng, Q. Duan, E. Mpofu",
    journal: "Journal of Geophysical Research: Atmospheres",
    year: 2020,
    doi: "10.1029/2020JD033522",
    doiUrl: "https://doi.org/10.1029/2020JD033522",
    url: "https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2020JD033522",
    thumb: heroImg,
  },
];

type InProgress = {
  title: string;
  authors: string;
  journal: string;
  status: string;
};

const inProgress: InProgress[] = [
  {
    title:
      "Blind Spots: Disconnection of Conservation Planning and Drought Risk Management. Evidence From a Comparative Analysis of Hwange and Gonarezhou National Parks in Zimbabwe",
    authors: "Katharina Gugerell, Walter Musakwa, Ephraim Mpofu, Thomas Thaler",
    journal: "World Development",
    status: "Under Review",
  },
  {
    title:
      "Cultural History and Memory in Relation to Biodiversity Conservation: Lessons from Gonarezhou National Park in Zimbabwe",
    authors:
      "Walter Musakwa, Verena Radinger-Peer, Ephraim Mpofu, Doris Damyanovic, Katharina Gugerell",
    journal: "Discover Conservation",
    status: "Under Review",
  },
];

function formatCitation(p: Pub): string {
  return `${p.authors} (${p.year}). ${p.title}. ${p.journal}. https://doi.org/${p.doi}`;
}

export function PublicationsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyCitation = async (idx: number, p: Pub) => {
    try {
      await navigator.clipboard.writeText(formatCitation(p));
      setCopiedIdx(idx);
      setTimeout(() => setCopiedIdx(null), 1800);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="relative min-h-screen" style={{ background: "#050816", color: "#fff" }}>
      <BrandBackground />
      <SiteNav active="Publications" />

      <main className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* HEADER */}
        <section className="pt-20 pb-14">
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-[12.5px] font-medium transition-colors hover:text-white"
            style={{ color: "#A3A3B2" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Insights
          </Link>
          <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[760px]">
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.22em]"
                style={{
                  background: "rgba(139,92,246,0.12)",
                  border: "1px solid rgba(139,92,246,0.35)",
                  color: "#C4B5FD",
                }}
              >
                PUBLICATIONS LIBRARY
              </span>
              <h1 className="mt-5 text-[48px] font-bold leading-[1.05] tracking-[-0.02em] lg:text-[60px]">
                Academic{" "}
                <span
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Publications
                </span>
              </h1>
              <p className="mt-5 text-[15.5px] leading-[1.7]" style={{ color: "#A3A3B2" }}>
                Peer-reviewed research, systems thinking, governance,
                sustainability, and interdisciplinary knowledge systems —
                authored and co-authored by Dr. Ephraim Mpofu.
              </p>
            </div>
            <div className="flex gap-8">
              <Stat label="Published" value={String(published.length)} />
              <Stat label="In Progress" value={String(inProgress.length)} />
              <Stat label="Span" value="2020–2026" />
            </div>
          </div>
        </section>

        {/* PUBLISHED RESEARCH */}
        <section className="pb-16">
          <SectionHeader
            eyebrow="PEER-REVIEWED"
            title="Published Research"
            subtitle="Reverse chronological order. All papers indexed by DOI."
          />

          <div
            className="mt-10 overflow-hidden rounded-[20px]"
            style={{
              background: "#0B1020",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {published.map((p, i) => {
              const open = openIdx === i;
              return (
                <div
                  key={p.doi}
                  className="px-7 py-8 lg:px-9"
                  style={{
                    borderTop: i === 0 ? "none" : "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div className="grid grid-cols-[40px_96px_1fr] items-start gap-6 lg:grid-cols-[40px_110px_1fr_auto] lg:gap-8">
                    <div
                      className="pt-1 text-[14px] font-semibold tabular-nums"
                      style={{ color: "#A855F7" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="h-[92px] w-[96px] overflow-hidden rounded-lg lg:w-[110px]">
                      <img
                        src={p.thumb}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 col-span-3 lg:col-span-1">
                      <h3 className="text-[18px] font-semibold leading-[1.4]">
                        {p.title}
                      </h3>
                      <p
                        className="mt-2 text-[13px] leading-[1.6]"
                        style={{ color: "#A3A3B2" }}
                      >
                        {p.authors}
                      </p>
                      <div
                        className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]"
                        style={{ color: "#C4B5FD" }}
                      >
                        <span className="flex items-center gap-1.5">
                          <BookOpen className="h-3.5 w-3.5" /> {p.journal}
                        </span>
                        <span style={{ color: "#6B7280" }}>·</span>
                        <span style={{ color: "#A3A3B2" }}>{p.year}</span>
                        <span style={{ color: "#6B7280" }}>·</span>
                        <span
                          className="font-mono text-[12px]"
                          style={{ color: "#6B7280" }}
                        >
                          DOI: {p.doi}
                        </span>
                      </div>
                    </div>
                    <div className="col-span-3 mt-3 flex flex-wrap items-center gap-2 lg:col-span-1 lg:mt-0 lg:justify-end">
                      <button
                        onClick={() => copyCitation(i, p)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all hover:bg-white/5"
                        style={{
                          color: "#A3A3B2",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {copiedIdx === i ? (
                          <>
                            <Check className="h-3.5 w-3.5" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" /> Cite
                          </>
                        )}
                      </button>
                      <a
                        href={p.doiUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all hover:bg-white/5"
                        style={{
                          color: "#A3A3B2",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> DOI
                      </a>
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-semibold text-white"
                        style={{
                          background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
                        }}
                      >
                        Read article <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                      <button
                        onClick={() => setOpenIdx(open ? null : i)}
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all hover:bg-white/5"
                        style={{
                          color: "#A3A3B2",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {open ? (
                          <>
                            <ChevronUp className="h-3.5 w-3.5" /> Hide
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3.5 w-3.5" /> Details
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  {open && (
                    <div
                      className="mt-6 rounded-[14px] p-5"
                      style={{
                        background: "rgba(139,92,246,0.05)",
                        border: "1px solid rgba(139,92,246,0.18)",
                      }}
                    >
                      <div
                        className="text-[10.5px] font-semibold tracking-[0.24em]"
                        style={{ color: "#A855F7" }}
                      >
                        CITATION
                      </div>
                      <p
                        className="mt-2 text-[13.5px] leading-[1.7]"
                        style={{ color: "#E5E7EB" }}
                      >
                        {formatCitation(p)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* RESEARCH IN PROGRESS */}
        <section className="pb-24">
          <SectionHeader
            eyebrow="UNDER REVIEW"
            title="Research In Progress"
            subtitle="Manuscripts currently under peer review."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {inProgress.map((p) => (
              <article
                key={p.title}
                className="flex flex-col rounded-[18px] p-7"
                style={{
                  background: "#0B1020",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold tracking-[0.2em]"
                    style={{
                      background: "rgba(168,85,247,0.12)",
                      color: "#C4B5FD",
                      border: "1px solid rgba(168,85,247,0.3)",
                    }}
                  >
                    <FlaskConical className="h-3 w-3" /> {p.status.toUpperCase()}
                  </span>
                  <span className="text-[12px]" style={{ color: "#6B7280" }}>
                    {p.journal}
                  </span>
                </div>
                <h3 className="mt-5 text-[17px] font-semibold leading-[1.45]">
                  {p.title}
                </h3>
                <p
                  className="mt-3 text-[13px] leading-[1.65]"
                  style={{ color: "#A3A3B2" }}
                >
                  {p.authors}
                </p>
              </article>
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        className="text-[28px] font-bold leading-none"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {value}
      </div>
      <div
        className="mt-1.5 text-[10.5px] font-semibold tracking-[0.22em]"
        style={{ color: "#A3A3B2" }}
      >
        {label.toUpperCase()}
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div>
      <div
        className="text-[11px] font-semibold tracking-[0.28em]"
        style={{ color: "#A855F7" }}
      >
        {eyebrow}
      </div>
      <h2 className="mt-2 text-[32px] font-bold tracking-[-0.01em]">{title}</h2>
      {subtitle && (
        <p className="mt-2 text-[14px]" style={{ color: "#A3A3B2" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
