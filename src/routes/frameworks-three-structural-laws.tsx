import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";

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
      className="light-page relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-20 pb-20">

        {/* PROBLEM */}
        <section className="mt-16 glass-card p-8">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            The Problem
          </h2>

          <p
            className="mt-4 text-[16px] leading-[1.7]"
            style={{ color: "#5A5D63" }}
          >
            Most AI projects fail because teams focus on tools,
            prompts and models before understanding system
            architecture. The result is fragmented workflows,
            technical debt and systems that cannot scale.
          </p>
        </section>

        {/* THE THREE STRUCTURAL LAWS */}
        <section className="mt-10">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            The Three Structural Laws
          </h2>

          <p
            className="mt-4 text-[16px] leading-[1.7]"
            style={{ color: "#5A5D63" }}
          >
            These principles provide the architectural foundation for
            designing scalable, maintainable and production-ready AI systems.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="glass-card p-6">
              <div
                className="text-[12px] font-bold tracking-[0.2em]"
                style={{ color: "#34506E" }}
              >
                LAW 1
              </div>
              <h3 className="mt-3 text-[24px] font-medium" style={{ color: "#1F2125" }}>
                Architecture Before Automation
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
                Design the business architecture before introducing
                automation. Automation amplifies structure.
              </p>
            </div>

            <div className="glass-card p-6">
              <div
                className="text-[12px] font-bold tracking-[0.2em]"
                style={{ color: "#34506E" }}
              >
                LAW 2
              </div>
              <h3 className="mt-3 text-[24px] font-medium" style={{ color: "#1F2125" }}>
                Separation of Concerns
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
                Every workflow, service and agent should own a
                single responsibility.
              </p>
            </div>

            <div className="glass-card p-6">
              <div
                className="text-[12px] font-bold tracking-[0.2em]"
                style={{ color: "#34506E" }}
              >
                LAW 3
              </div>
              <h3 className="mt-3 text-[24px] font-medium" style={{ color: "#1F2125" }}>
                Systems Over Components
              </h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
                Business value emerges from complete systems,
                not isolated tools and technologies.
              </p>
            </div>
          </div>
        </section>

        {/* HOW THE THREE LAWS WORK TOGETHER */}
        <section className="mt-10 glass-card p-6">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            How The Three Laws Work Together
          </h2>

          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            The laws form a sequence that guides the design of every
            production-grade AI system.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {["Business Problem", "Architecture", "Responsibilities", "Integrated System", "Business Outcome"].map((label, i, arr) => (
              <>
                <div key={label} className="glass-card px-5 py-4 text-center">
                  <div className="font-medium" style={{ color: "#1F2125" }}>{label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div key={`arrow-${i}`} style={{ color: "#34506E" }}>→</div>
                )}
              </>
            ))}
          </div>
        </section>

        {/* APPLIED ACROSS THE AI LIFECYCLE */}
        <section className="mt-10 glass-card p-6">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            Applied Across The AI Lifecycle
          </h2>

          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            The Three Structural Laws apply throughout the entire
            lifecycle of an AI initiative, from discovery through
            long-term operations.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-5">
            {[["PHASE 1", "Discovery"], ["PHASE 2", "Architecture"], ["PHASE 3", "Build"], ["PHASE 4", "Govern"], ["PHASE 5", "Scale"]].map(([phase, title]) => (
              <div key={title} className="glass-card p-5 text-center">
                <div className="text-[12px] font-bold tracking-[0.18em]" style={{ color: "#34506E" }}>
                  {phase}
                </div>
                <div className="mt-3 font-medium" style={{ color: "#1F2125" }}>{title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* OUTCOMES OF APPLYING THE LAWS */}
        <section className="mt-10">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            Outcomes Of Applying The Laws
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="glass-card p-6">
              <h3 className="text-[22px] font-medium" style={{ color: "#1F2125" }}>Better Architecture</h3>
              <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
                Systems remain modular, maintainable and easier to
                evolve as requirements change.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-[22px] font-medium" style={{ color: "#1F2125" }}>Lower Risk</h3>
              <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
                Clear ownership and architectural boundaries reduce
                operational and implementation risk.
              </p>
            </div>
            <div className="glass-card p-6">
              <h3 className="text-[22px] font-medium" style={{ color: "#1F2125" }}>Greater Scale</h3>
              <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
                Well-structured systems can grow from simple
                automations into enterprise AI platforms.
              </p>
            </div>
          </div>
        </section>

        {/* RELATED FRAMEWORKS */}
        <section className="mt-10">
          <h2 className="text-[32px] font-medium" style={{ color: "#1F2125" }}>
            Related Frameworks
          </h2>

          <p className="mt-4 text-[16px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            The Three Structural Laws serve as foundational principles
            across all architecture and governance frameworks.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: "AISA Framework", desc: "End-to-end methodology for delivering enterprise AI systems from discovery to scale." },
              { title: "Complexity Ladder", desc: "Determines the minimum level of AI complexity required to solve a business problem." },
              { title: "AI Governance Framework", desc: "Risk, compliance, monitoring and operational control for production AI systems." },
            ].map((f) => (
              <div key={f.title} className="glass-card p-6">
                <div className="text-[12px] font-bold tracking-[0.2em]" style={{ color: "#34506E" }}>
                  FRAMEWORK
                </div>
                <h3 className="mt-3 text-[22px] font-medium" style={{ color: "#1F2125" }}>{f.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
