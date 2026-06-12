import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";

export const Route = createFileRoute(
  "/frameworks-three-structural-laws"
)({
  head: () => ({
    meta: [
      {
        title:
          "Three Structural Laws | Enterprise AI Architecture Principles",
      },
      {
        name: "description",
        content:
          "The Three Structural Laws are foundational principles for designing scalable, maintainable and production-ready AI systems.",
      },
    ],
  }),

  component: ThreeStructuralLawsPage,
});

function ThreeStructuralLawsPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <BrandBackground />
      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-20 pb-20">
        {/* HERO */}

        <div className="max-w-[900px]">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.22em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#C4B5FD",
            }}
          >
            CORE ARCHITECTURE PRINCIPLES
          </div>

          <h1 className="mt-6 text-[56px] font-bold text-white leading-tight">
            The Three Structural Laws
          </h1>

          <p
            className="mt-6 text-[18px] max-w-[800px]"
            style={{ color: "#9CA3AF" }}
          >
            Foundational architecture principles that govern the design,
            implementation and scaling of production-grade AI systems.
          </p>
        </div>

        {/* PROBLEM */}

        <section className="mt-16 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            The Problem
          </h2>

          <p
            className="mt-4 text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            Most AI projects fail because teams focus on tools,
            prompts and models before understanding system
            architecture. The result is fragmented workflows,
            technical debt and systems that cannot scale.
          </p>
        </section>

        {/* LAW 1 */}

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Law 1 — Architecture Before Automation
          </h2>

          <p
            className="mt-4 text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            No automation should be built before the underlying
            business architecture is understood. Automation
            amplifies structure. If the structure is flawed,
            automation simply accelerates failure.
          </p>
        </section>

        {/* LAW 2 */}

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Law 2 — Separation of Concerns
          </h2>

          <p
            className="mt-4 text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            Every workflow, agent and service should own a single
            business responsibility and a single transformation
            responsibility. Systems become scalable when
            responsibilities remain clear and isolated.
          </p>
        </section>

        {/* LAW 3 */}

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Law 3 — Systems Over Components
          </h2>

          <p
            className="mt-4 text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            Value is not created by individual tools, models or
            agents. Value emerges from how components interact
            inside a complete system designed to achieve a business
            outcome.
          </p>
        </section>

        {/* BENEFITS */}

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Benefits
          </h2>

          <ul
            className="mt-4 space-y-3 text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            <li>• Reduced AI project failure rates</li>
            <li>• Improved maintainability</li>
            <li>• Better scalability</li>
            <li>• Faster implementation cycles</li>
            <li>• Stronger governance and compliance</li>
          </ul>
        </section>

        {/* CTA */}

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Related Frameworks
          </h2>

          <p
            className="mt-4 text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            These principles underpin the SKAIDO Framework,
            Knowledge Architecture Operating System, Career
            Intelligence Operating System and Enterprise Multi-Agent
            Framework.
          </p>
        </section>
      </main>
    </div>
  );
}
