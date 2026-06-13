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

      {/* THE THREE STRUCTURAL LAWS */}

<section className="mt-10">

  <h2 className="text-[32px] font-bold text-white">
    The Three Structural Laws
  </h2>

  <p
    className="mt-4 text-[16px]"
    style={{ color: "#9CA3AF" }}
  >
    These principles provide the architectural foundation for
    designing scalable, maintainable and production-ready AI systems.
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div className="glass-card p-6">
      <div
        className="text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#A855F7" }}
      >
        LAW 1
      </div>

      <h3 className="mt-3 text-[24px] font-bold text-white">
        Architecture Before Automation
      </h3>

      <p
        className="mt-4 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Design the business architecture before introducing
        automation. Automation amplifies structure.
      </p>
    </div>

    <div className="glass-card p-6">
      <div
        className="text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#A855F7" }}
      >
        LAW 2
      </div>

      <h3 className="mt-3 text-[24px] font-bold text-white">
        Separation of Concerns
      </h3>

      <p
        className="mt-4 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Every workflow, service and agent should own a
        single responsibility.
      </p>
    </div>

    <div className="glass-card p-6">
      <div
        className="text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#A855F7" }}
      >
        LAW 3
      </div>

      <h3 className="mt-3 text-[24px] font-bold text-white">
        Systems Over Components
      </h3>

      <p
        className="mt-4 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Business value emerges from complete systems,
        not isolated tools and technologies.
      </p>
    </div>

  </div>

</section>


      {/* HOW THE THREE LAWS WORK TOGETHER */}

<section className="mt-10 glass-card p-6">

  <h2 className="text-[32px] font-bold text-white">
    How The Three Laws Work Together
  </h2>

  <p
    className="mt-4 text-[16px]"
    style={{ color: "#9CA3AF" }}
  >
    The laws form a sequence that guides the design of every
    production-grade AI system.
  </p>

  <div className="mt-8 flex flex-wrap items-center justify-center gap-4">

    <div className="glass-card px-5 py-4 text-center">
      <div className="font-semibold text-white">
        Business Problem
      </div>
    </div>

    <div style={{ color: "#A855F7" }}>→</div>

    <div className="glass-card px-5 py-4 text-center">
      <div className="font-semibold text-white">
        Architecture
      </div>
    </div>

    <div style={{ color: "#A855F7" }}>→</div>

    <div className="glass-card px-5 py-4 text-center">
      <div className="font-semibold text-white">
        Responsibilities
      </div>
    </div>

    <div style={{ color: "#A855F7" }}>→</div>

    <div className="glass-card px-5 py-4 text-center">
      <div className="font-semibold text-white">
        Integrated System
      </div>
    </div>

    <div style={{ color: "#A855F7" }}>→</div>

    <div className="glass-card px-5 py-4 text-center">
      <div className="font-semibold text-white">
        Business Outcome
      </div>
    </div>

  </div>

</section>

  {/* APPLIED ACROSS THE AI LIFECYCLE */}

<section className="mt-10 glass-card p-6">

  <h2 className="text-[32px] font-bold text-white">
    Applied Across The AI Lifecycle
  </h2>

  <p
    className="mt-4 text-[16px]"
    style={{ color: "#9CA3AF" }}
  >
    The Three Structural Laws apply throughout the entire
    lifecycle of an AI initiative, from discovery through
    long-term operations.
  </p>

  <div className="mt-8 grid gap-5 md:grid-cols-5">

    <div className="glass-card p-5 text-center">
      <div
        className="text-[12px] font-bold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        PHASE 1
      </div>

      <div className="mt-3 font-semibold text-white">
        Discovery
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[12px] font-bold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        PHASE 2
      </div>

      <div className="mt-3 font-semibold text-white">
        Architecture
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[12px] font-bold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        PHASE 3
      </div>

      <div className="mt-3 font-semibold text-white">
        Build
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[12px] font-bold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        PHASE 4
      </div>

      <div className="mt-3 font-semibold text-white">
        Govern
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[12px] font-bold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        PHASE 5
      </div>

      <div className="mt-3 font-semibold text-white">
        Scale
      </div>
    </div>

  </div>

</section>

       {/* OUTCOMES OF APPLYING THE LAWS */}

<section className="mt-10">

  <h2 className="text-[32px] font-bold text-white">
    Outcomes Of Applying The Laws
  </h2>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div className="glass-card p-6">
      <h3 className="text-[22px] font-bold text-white">
        Better Architecture
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Systems remain modular, maintainable and easier to
        evolve as requirements change.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[22px] font-bold text-white">
        Lower Risk
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Clear ownership and architectural boundaries reduce
        operational and implementation risk.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[22px] font-bold text-white">
        Greater Scale
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Well-structured systems can grow from simple
        automations into enterprise AI platforms.
      </p>
    </div>

  </div>

</section>
        {/* RELATED FRAMEWORKS */}

<section className="mt-10">

  <h2 className="text-[32px] font-bold text-white">
    Related Frameworks
  </h2>

  <p
    className="mt-4 text-[16px]"
    style={{ color: "#9CA3AF" }}
  >
    The Three Structural Laws serve as foundational principles
    across all architecture and governance frameworks.
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div className="glass-card p-6">
      <div
        className="text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#A855F7" }}
      >
        FRAMEWORK
      </div>

      <h3 className="mt-3 text-[22px] font-bold text-white">
        AISA Framework
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        End-to-end methodology for delivering enterprise AI
        systems from discovery to scale.
      </p>
    </div>

    <div className="glass-card p-6">
      <div
        className="text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#A855F7" }}
      >
        FRAMEWORK
      </div>

      <h3 className="mt-3 text-[22px] font-bold text-white">
        Complexity Ladder
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Determines the minimum level of AI complexity
        required to solve a business problem.
      </p>
    </div>

    <div className="glass-card p-6">
      <div
        className="text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#A855F7" }}
      >
        FRAMEWORK
      </div>

      <h3 className="mt-3 text-[22px] font-bold text-white">
        AI Governance Framework
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Risk, compliance, monitoring and operational control
        for production AI systems.
      </p>
    </div>

  </div>

</section>
      </main>
    </div>
  );
}
