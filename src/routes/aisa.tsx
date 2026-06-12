import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";

export const Route = createFileRoute("/aisa")({
  head: () => ({
    meta: [
      {
        title:
          "AISA Framework | Strategic AI Engagement Framework",
      },
      {
        name: "description",
        content:
          "The AISA Framework is a strategic methodology for moving AI projects from business problem to production deployment.",
      },
    ],
  }),
  component: AISAPage,
});

function AISAPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <BrandBackground />

      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1280px] px-6 pt-20 pb-20 lg:px-10">
        {/* HERO */}

        <section className="max-w-[900px]">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.22em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#C4B5FD",
            }}
          >
            FLAGSHIP FRAMEWORK
          </div>

          <h1 className="mt-6 text-[56px] font-bold leading-[1.05] text-white">
            AISA Framework
          </h1>

          <h2
            className="mt-3 text-[26px] font-semibold"
            style={{ color: "#A855F7" }}
          >
            Strategic AI Engagement Framework
          </h2>

          <p
            className="mt-6 max-w-[850px] text-[18px]"
            style={{ color: "#9CA3AF" }}
          >
            A reusable methodology for translating business problems
            into production-ready AI systems. From discovery and
            architecture through deployment, governance and scale.
          </p>
        </section>

        {/* CORE PRINCIPLE */}

        <section className="mt-16 glass-card p-8">
          <h3 className="text-[28px] font-bold text-white">
            The Core Principle
          </h3>

          <p
            className="mt-4 text-[17px]"
            style={{ color: "#9CA3AF" }}
          >
            Clients never come with architecture.
            They come with problems.

            The role of the AI Solutions Architect is to translate
            business pain into technical architecture and deliver the
            minimum complexity required to create measurable value.
          </p>
        </section>

        {/* PHASES */}

        <section className="mt-16">
          <h3 className="text-[32px] font-bold text-white">
            The Six Phases
          </h3>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Discovery",
              "Architecture",
              "Build",
              "Validate",
              "Deploy",
              "Scale",
            ].map((phase, index) => (
              <div
                key={phase}
                className="glass-card p-6"
              >
                <div
                  className="text-[12px] font-bold tracking-[0.2em]"
                  style={{ color: "#8B5CF6" }}
                >
                  PHASE {String(index + 1).padStart(2, "0")}
                </div>

                <h4 className="mt-3 text-[24px] font-bold text-white">
                  {phase}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* COMPLEXITY LADDER */}

        <section className="mt-16">
          <h3 className="text-[32px] font-bold text-white">
            The Complexity Ladder
          </h3>

          <div className="mt-8 grid gap-4">
            {[
              "Single Automation",
              "Single AI Task",
              "AI Pipeline",
              "Multi-Agent System",
              "Autonomous Agent Platform",
            ].map((item, index) => (
              <div
                key={item}
                className="glass-card p-6"
              >
                <div
                  className="text-[12px] font-bold"
                  style={{ color: "#8B5CF6" }}
                >
                  RUNG {index + 1}
                </div>

                <div className="mt-2 text-[22px] font-bold text-white">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}