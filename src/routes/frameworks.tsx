import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/frameworks")({
  head: () => ({
    meta: [
      {
        title:
          "AI Frameworks & Methodologies | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Explore SKAIDO, Three Structural Laws, Knowledge Architecture Operating System, Career Intelligence Operating System and other proprietary AI frameworks.",
      },
    ],
  }),

  component: FrameworksPage,
});

export function FrameworksPage() {
const frameworks = [
  {
    title: "AISA Framework",
    description:
      "Strategic AI Engagement Framework for translating business problems into scalable AI architectures and production systems.",
    link: "/aisa",
    available: true,
  },

  {
    title: "SKAIDO Framework",
    description:
      "Enterprise AI implementation framework for moving from strategy to measurable business outcomes.",
    link: "/frameworks-skaido",
    available: true,
  },

  {
    title: "Three Structural Laws",
    description:
      "Foundational principles for designing scalable, maintainable and production-ready AI systems.",
    link: "/frameworks-three-structural-laws",
    available: true,
  },

  {
    title: "Knowledge Architecture Operating System",
    description:
      "Four-workflow architecture for enterprise knowledge acquisition, intelligence, indexing and governance.",
    link: "/frameworks-kaos",
    available: false,
  },

  {
    title: "Enterprise Multi-Agent Framework",
    description:
      "Design framework for autonomous agents, orchestration layers, memory systems and governance.",
    link: "/frameworks-multi-agent",
    available: false,
  },

  {
    title: "RAG Governance Framework",
    description:
      "Production methodology for retrieval, evaluation, indexing, monitoring and AI knowledge governance.",
    link: "/frameworks-rag-governance",
    available: false,
  },
];

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <BrandBackground />

      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-20">
        {/* HERO */}

        <section className="pt-16 pb-12">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#C4B5FD",
            }}
          >
            Proprietary Frameworks
          </div>

          <h1 className="mt-6 text-[48px] font-bold leading-tight text-white lg:text-[64px]">
            The Systems Behind
            <br />
            <span className="text-gradient-brand">
              Every AI Solution
            </span>
          </h1>

          <p
            className="mt-6 max-w-3xl text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            A collection of frameworks, methodologies and operating
            systems developed through real-world AI architecture,
            automation and enterprise implementation projects.
          </p>
        </section>

        ```tsx
{/* FRAMEWORKS GRID */}

<section className="grid grid-cols-1 gap-6 md:grid-cols-2">
  {frameworks.map((framework) => (
    <div
      key={framework.title}
      className="glass-card p-6"
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ color: "#8B8B9A" }}
      >
        Framework
      </div>

      <h3 className="mt-3 text-[24px] font-bold text-white">
        {framework.title}
      </h3>

      <p
        className="mt-3 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        {framework.description}
      </p>

      {framework.available ? (
        <Link
          to={framework.link}
          className="mt-6 inline-flex rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          Learn More →
        </Link>
      ) : (
        <button
          className="mt-6 rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          Coming Soon
        </button>
      )}
    </div>
  ))}
</section>


        {/* CTA */}

        <section className="mt-10">
          <div className="glass-card p-8">
            <h2 className="text-[32px] font-bold text-white">
              Interested in Applying These Frameworks?
            </h2>

            <p
              className="mt-4 max-w-2xl"
              style={{ color: "#9CA3AF" }}
            >
              Explore the projects, systems and case studies where
              these frameworks have been applied to real-world AI
              implementations.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                className="rounded-lg px-5 py-3 font-semibold text-white"
                style={{
                  background:
                    "linear-gradient(90deg,#8B5CF6,#A855F7)",
                }}
              >
                View Portfolio
              </button>

              <button
                className="rounded-lg px-5 py-3 font-semibold text-white"
                style={{
                  border: "1px solid rgba(255,255,255,0.12)",
                }}
              >
                Ask My AI Agent
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}