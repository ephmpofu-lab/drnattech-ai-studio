// ─── Types ────────────────────────────────────────────────────────────────────

export type Reference = {
  id: string;
  authors: string;
  year: string;
  title: string;
  source: string;
  url?: string;
};

export type Figure = {
  image: string;
  caption: string;
  marker: string;
};

export type Publication = {
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  category: string;
  categoryColor: string;
  date: string;        // display: "16 Jun 2026"
  dateISO: string;     // ISO: "2026-06-16"
  readTime: number;
  heroImage: string;   // URL: "/uploads/..." or ""
  heroCaption: string;
  abstract: string;
  body: string;        // Markdown
  figures: Figure[];
  tags: string[];
  references: Reference[];
  citation: string;
  seoTitle?: string;
  seoDescription?: string;
  relatedSlugs: string[];
};

// ─── Raw JSON shape from content/publications/*.json ─────────────────────────

interface RawPublication {
  title: string;
  subtitle: string;
  slug: string;
  author?: string;
  date: string;        // "2026-06-16"
  category: string;
  categoryColor: string;
  readTime: number;
  heroImage?: string;
  heroCaption?: string;
  abstract: string;
  body: string;
  figures?: Figure[];
  tags?: string[];
  references?: Reference[];
  citation?: string;
  seoTitle?: string;
  seoDescription?: string;
  relatedSlugs?: string[];
}

// ─── Load all JSON files via Vite glob ───────────────────────────────────────

const modules = import.meta.glob<{ default: RawPublication }>(
  '/content/publications/*.json',
  { eager: true },
);

function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

export const publications: Publication[] = Object.values(modules)
  .map((m): Publication => {
    const r = m.default;
    return {
      slug: r.slug,
      title: r.title,
      subtitle: r.subtitle,
      author: r.author ?? 'Dr. Ephraim Mpofu',
      category: r.category,
      categoryColor: r.categoryColor,
      date: formatDate(r.date),
      dateISO: r.date,
      readTime: r.readTime,
      heroImage: r.heroImage ?? '',
      heroCaption: r.heroCaption ?? '',
      abstract: r.abstract,
      body: r.body,
      figures: r.figures ?? [],
      tags: r.tags ?? [],
      references: r.references ?? [],
      citation: r.citation ?? '',
      seoTitle: r.seoTitle,
      seoDescription: r.seoDescription,
      relatedSlugs: r.relatedSlugs ?? [],
    };
  })
  .sort(
    (a, b) =>
      new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime(),
  );

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}

export function getRelatedPublications(slugs: string[]): Publication[] {
  return slugs
    .map((s) => getPublicationBySlug(s))
    .filter((p): p is Publication => p !== undefined);
}
