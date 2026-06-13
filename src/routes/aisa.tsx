import { createFileRoute, Link } from "@tanstack/react-router";
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

          <h1 className="mt-4 text-[38px] font-bold leading-[1.05] text-white">
            AISA Framework
          </h1>

          <h2
             className="mt-2 text-[22px] font-semibold"
            style={{ color: "#A855F7" }}
          >
            Strategic AI Engagement Framework
          </h2>

          <p
            className="mt-4 max-w-[850px] text-[17px]"
            style={{ color: "#9CA3AF" }}
          >
            A reusable methodology for translating business problems
            into production-ready AI systems. From discovery and
            architecture through deployment, governance and scale.
          </p>
        </section>

        {/* CORE PRINCIPLE */}

        <section className="mt-10 glass-card p-6">
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

        {/* AISA JOURNEY */}

<section className="mt-12">
  <div className="text-center">
    <h2 className="text-[42px] font-bold text-white">
      The AISA Journey
    </h2>

    <p
      className="mx-auto mt-4 max-w-[900px] text-[18px]"
      style={{ color: "#9CA3AF" }}
    >
      A six-phase methodology for transforming business problems
      into scalable AI systems.
    </p>
  </div>

  <div className="mt-10 glass-card p-8">
    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">

      {[
        ["01", "Discovery"],
        ["02", "Architecture"],
        ["03", "Build"],
        ["04", "Validate"],
        ["05", "Deploy"],
        ["06", "Scale"],
      ].map(([phase, title]) => (
        <div
          key={phase}
          className="text-center"
        >
          <div
            className="text-[56px] font-bold"
            style={{ color: "#8B5CF6" }}
          >
            {phase}
          </div>

          <div className="mt-2 text-[24px] font-bold text-white">
            {title}
          </div>
        </div>
      ))}

    </div>
  </div>
</section>


        {/* COMPLEXITY LADDER */}

<section className="mt-8">
  <div className="glass-card p-8">

    <h3 className="text-center text-[24px] font-bold text-white">
      Complexity Ladder
    </h3>

    <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-5">

      {[
        "Single Automation",
        "Single AI Task",
        "AI Pipeline",
        "Multi-Agent System",
        "Autonomous Platform",
      ].map((item, index) => (
        <div
          key={item}
          className="rounded-xl border border-white/10 p-5 text-center"
        >
          <div
            className="text-[34px] font-bold"
            style={{ color: "#8B5CF6" }}
          >
            {index + 1}
          </div>

          <div className="mt-2 text-[16px] font-semibold text-white">
            {item}
          </div>
        </div>
      ))}

    </div>

    <p
      className="mt-6 text-center text-[15px]"
      style={{ color: "#9CA3AF" }}
    >
      <span style={{ color: "#A855F7" }}>
        GOLDEN RULE:
      </span>{" "}
      Start at the lowest level that solves the problem.
    </p>

  </div>
</section>


{/* DISCOVERY */}

<section className="mt-12 glass-card overflow-hidden">
  <div className="grid lg:grid-cols-[220px_1fr_280px]">

    {/* LEFT COLUMN */}
    <div className="border-r border-white/10 p-8">
      <div
        className="text-[56px] font-bold"
        style={{ color: "#8B5CF6" }}
      >
        01
      </div>

      <h3 className="text-[22px] font-bold text-white">
        Discovery
      </h3>

      <p
        className="mt-4 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Understand the business problem before discussing
        solutions.
      </p>
    </div>

    {/* MIDDLE COLUMN */}
    <div className="p-6">

      <div
        className="mb-6 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#C4B5FD" }}
      >
        KEY ACTIVITIES
      </div>

      <div className="mt-6 flex items-center gap-6 flex-wrap">

        <div className="text-center">
          <div className="text-[30px]">👥</div>
          <div className="mt-2 font-semibold text-white">
            Interview
          </div>
          <div
            className="text-[12px] mt-1"
            style={{ color: "#9CA3AF" }}
          >
            Stakeholder discovery
          </div>
        </div>

        <div style={{ color: "#8B5CF6" }}>→</div>

        <div className="text-center">
          <div className="text-[30px]">🗺️</div>
          <div className="mt-2 font-semibold text-white">
            Process Map
          </div>
          <div
            className="text-[12px] mt-1"
            style={{ color: "#9CA3AF" }}
          >
            Current workflow
          </div>
        </div>

        <div style={{ color: "#8B5CF6" }}>→</div>

        <div className="text-center">
          <div className="text-[30px]">🗄️</div>
          <div className="mt-2 font-semibold text-white">
            Data Audit
          </div>
          <div
            className="text-[12px] mt-1"
            style={{ color: "#9CA3AF" }}
          >
            Sources & quality
          </div>
        </div>

        <div style={{ color: "#8B5CF6" }}>→</div>

        <div className="text-center">
          <div className="text-[30px]">📈</div>
          <div className="mt-2 font-semibold text-white">
            Feasibility
          </div>
          <div
            className="text-[12px] mt-1"
            style={{ color: "#9CA3AF" }}
          >
            Impact vs complexity
          </div>
        </div>

        <div style={{ color: "#8B5CF6" }}>→</div>

        <div className="text-center">
          <div className="text-[30px]">📋</div>
          <div className="mt-2 font-semibold text-white">
            Scope
          </div>
          <div
            className="text-[12px] mt-1"
            style={{ color: "#9CA3AF" }}
          >
            Success criteria
          </div>
        </div>

      </div>

    </div>

    {/* RIGHT COLUMN */}
    <div className="border-l border-white/10 p-8">

      <div
        className="mb-4 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#C4B5FD" }}
      >
        DELIVERABLES
      </div>

      <ul
        className="space-y-2 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        <li>• Process Baseline Map</li>
        <li>• Data Audit Report</li>
        <li>• Feasibility Matrix</li>
        <li>• Scope Agreement</li>
        <li>• Success Metrics</li>
      </ul>

    </div>

  </div>
</section>

{/* ARCHITECTURE */}
<section className="mt-8 glass-card overflow-hidden">
  <div className="grid lg:grid-cols-[220px_1fr_280px]">

    <div className="border-r border-white/10 p-8">
      <div className="text-[56px] font-bold" style={{ color: "#60A5FA" }}>
        02
      </div>

      <h3 className="text-[28px] font-bold text-white">
        Architecture
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        Design the right solution before building anything.
      </p>
    </div>

    <div className="p-6">
      <div
        className="mb-6 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#93C5FD" }}
      >
        KEY ACTIVITIES
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">

        <div className="text-center">
          <div className="text-[28px]">🗂️</div>
          <div className="mt-2 font-semibold text-white">Master Data</div>
        </div>

        <div className="text-center">
          <div className="text-[28px]">🏗️</div>
          <div className="mt-2 font-semibold text-white">4 Layers</div>
        </div>

        <div className="text-center">
          <div className="text-[28px]">🔗</div>
          <div className="mt-2 font-semibold text-white">Child WFs</div>
        </div>

        <div className="text-center">
          <div className="text-[28px]">⚠️</div>
          <div className="mt-2 font-semibold text-white">Failures</div>
        </div>

        <div className="text-center">
          <div className="text-[28px]">⚙️</div>
          <div className="mt-2 font-semibold text-white">Tech Stack</div>
        </div>

        <div className="text-center">
          <div className="text-[28px]">✅</div>
          <div className="mt-2 font-semibold text-white">Approval</div>
        </div>

      </div>
    </div>

    <div className="border-l border-white/10 p-8">
      <div
        className="mb-4 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#93C5FD" }}
      >
        KEY DELIVERABLES
      </div>

      <ul className="space-y-2 text-[14px]" style={{ color: "#9CA3AF" }}>
        <li>• Master Data Schema</li>
        <li>• Architecture Diagram</li>
        <li>• Child Workflow Contracts</li>
        <li>• Failure Mode Map</li>
        <li>• Technology Decision Document</li>
      </ul>
    </div>

  </div>
</section>

{/* BUILD */}
<section className="mt-8 glass-card overflow-hidden">
  <div className="grid lg:grid-cols-[220px_1fr_280px]">

    <div className="border-r border-white/10 p-8">
      <div className="text-[56px] font-bold" style={{ color: "#14B8A6" }}>
        03
      </div>

      <h3 className="text-[28px] font-bold text-white">
        Build
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        Build in sequence and validate each layer.
      </p>
    </div>

    <div className="p-6">
      <div
        className="mb-6 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#14B8A6" }}
      >
        KEY ACTIVITIES
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">

        <div className="text-center">⬇️<div className="text-white font-semibold mt-2">Ingestion</div></div>
        <div className="text-center">🧩<div className="text-white font-semibold mt-2">Child WF</div></div>
        <div className="text-center">🔗<div className="text-white font-semibold mt-2">Processing</div></div>
        <div className="text-center">🏛️<div className="text-white font-semibold mt-2">Orchestration</div></div>
        <div className="text-center">📤<div className="text-white font-semibold mt-2">Output</div></div>
        <div className="text-center">🚨<div className="text-white font-semibold mt-2">Errors</div></div>

      </div>
    </div>

    <div className="border-l border-white/10 p-8">
      <div
        className="mb-4 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#14B8A6" }}
      >
        KEY DELIVERABLES
      </div>

      <ul className="space-y-2 text-[14px]" style={{ color: "#9CA3AF" }}>
        <li>• Working Ingestion Layer</li>
        <li>• Tested Child Workflows</li>
        <li>• Connected Processing Chain</li>
        <li>• Orchestration Routing</li>
        <li>• Output Layer</li>
      </ul>
    </div>

  </div>
</section>

{/* VALIDATE */}
<section className="mt-8 glass-card overflow-hidden">
  <div className="grid lg:grid-cols-[220px_1fr_280px]">

    <div className="border-r border-white/10 p-8">
      <div className="text-[56px] font-bold" style={{ color: "#84CC16" }}>
        04
      </div>

      <h3 className="text-[28px] font-bold text-white">
        Validate
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        Prove the system works under real conditions.
      </p>
    </div>

    <div className="p-6">
      <div
        className="mb-6 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#84CC16" }}
      >
        KEY ACTIVITIES
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
        <div className="text-center">🙂<div className="text-white mt-2 font-semibold">Happy Path</div></div>
        <div className="text-center">❌<div className="text-white mt-2 font-semibold">Failure Path</div></div>
        <div className="text-center">🧠<div className="text-white mt-2 font-semibold">AI Eval</div></div>
        <div className="text-center">🎯<div className="text-white mt-2 font-semibold">Grounding</div></div>
        <div className="text-center">⚡<div className="text-white mt-2 font-semibold">Performance</div></div>
        <div className="text-center">👥<div className="text-white mt-2 font-semibold">UAT</div></div>
      </div>
    </div>

    <div className="border-l border-white/10 p-8">
      <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#84CC16" }}>
        KEY DELIVERABLES
      </div>

      <ul className="space-y-2 text-[14px]" style={{ color: "#9CA3AF" }}>
        <li>• Test Report</li>
        <li>• AI Evaluation</li>
        <li>• Groundedness Audit</li>
        <li>• SLA Report</li>
        <li>• Client Sign-off</li>
      </ul>
    </div>

  </div>
</section>

{/* DEPLOY */}
<section className="mt-8 glass-card overflow-hidden">
  <div className="grid lg:grid-cols-[220px_1fr_280px]">

    <div className="border-r border-white/10 p-8">
      <div className="text-[56px] font-bold" style={{ color: "#F97316" }}>
        05
      </div>

      <h3 className="text-[28px] font-bold text-white">
        Deploy
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        Go live safely through staged rollout.
      </p>
    </div>

    <div className="p-6">
      <div
        className="mb-6 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#F97316" }}
      >
        KEY ACTIVITIES
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">

        <div className="text-center">🌑<div className="text-white mt-2 font-semibold">Shadow</div></div>
        <div className="text-center">📈<div className="text-white mt-2 font-semibold">10%</div></div>
        <div className="text-center">📊<div className="text-white mt-2 font-semibold">50%</div></div>
        <div className="text-center">🚀<div className="text-white mt-2 font-semibold">Production</div></div>
        <div className="text-center">🤝<div className="text-white mt-2 font-semibold">Handover</div></div>

      </div>
    </div>

    <div className="border-l border-white/10 p-8">
      <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#F97316" }}>
        KEY DELIVERABLES
      </div>

      <ul className="space-y-2 text-[14px]" style={{ color: "#9CA3AF" }}>
        <li>• Shadow Report</li>
        <li>• Rollout Plan</li>
        <li>• Environment Setup</li>
        <li>• Rollback Plan</li>
        <li>• Handover Docs</li>
      </ul>
    </div>

  </div>
</section>

{/* SCALE */}
<section className="mt-8 glass-card overflow-hidden">
  <div className="grid lg:grid-cols-[220px_1fr_280px]">

    <div className="border-r border-white/10 p-8">
      <div className="text-[56px] font-bold" style={{ color: "#EF4444" }}>
        06
      </div>

      <h3 className="text-[28px] font-bold text-white">
        Scale
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        Monitor, optimise and improve continuously.
      </p>
    </div>

    <div className="p-6">
      <div
        className="mb-6 text-[12px] font-bold tracking-[0.2em]"
        style={{ color: "#EF4444" }}
      >
        KEY ACTIVITIES
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">

        <div className="text-center">📊<div className="text-white mt-2 font-semibold">Monitor</div></div>
        <div className="text-center">🎯<div className="text-white mt-2 font-semibold">Drift</div></div>
        <div className="text-center">💰<div className="text-white mt-2 font-semibold">Costs</div></div>
        <div className="text-center">📈<div className="text-white mt-2 font-semibold">Scale</div></div>
        <div className="text-center">📅<div className="text-white mt-2 font-semibold">Review</div></div>
        <div className="text-center">🔔<div className="text-white mt-2 font-semibold">Alerts</div></div>

      </div>
    </div>

    <div className="border-l border-white/10 p-8">
      <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#EF4444" }}>
        KEY DELIVERABLES
      </div>

      <ul className="space-y-2 text-[14px]" style={{ color: "#9CA3AF" }}>
        <li>• Weekly Report</li>
        <li>• Monthly Evaluation</li>
        <li>• Cost Dashboard</li>
        <li>• Architecture Review</li>
        <li>• Drift Alerts</li>
      </ul>
    </div>

  </div>
</section>

{/* ARCHITECTURE LAWS */}
<section className="mt-10">
  <h2 className="text-center text-[40px] font-bold text-white">
    The Three Architecture Laws
  </h2>

  <div className="mt-8 grid gap-6 md:grid-cols-3">

    <div className="glass-card p-6">
      <div className="text-[12px] tracking-[0.25em] font-bold" style={{ color: "#A855F7" }}>
        LAW 1
      </div>

      <h3 className="mt-4 text-[18px] font-bold text-white">
        Separation of Concerns
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        One responsibility per node. No node should validate, enrich and route simultaneously.
      </p>
    </div>

    <div className="glass-card p-6">
      <div className="text-[12px] tracking-[0.25em] font-bold" style={{ color: "#3B82F6" }}>
        LAW 2
      </div>

      <h3 className="mt-4 text-[18px] font-bold text-white">
        Single Source of Truth
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        Data fetched once. Passed forward. Raw data remains immutable.
      </p>
    </div>

    <div className="glass-card p-6">
      <div className="text-[12px] tracking-[0.25em] font-bold" style={{ color: "#22C55E" }}>
        LAW 3
      </div>

      <h3 className="mt-4 text-[18px] font-bold text-white">
        Fail Visibility
      </h3>

      <p className="mt-4 text-[15px]" style={{ color: "#9CA3AF" }}>
        Every critical failure must be observable through logs, alerts and escalation.
      </p>
    </div>

  </div>
</section>


{/* CTA */}

<section className="mt-10 glass-card p-8 text-center">
  <h3 className="text-[36px] font-bold text-white">
    Build AI Systems That Scale
  </h3>

  <p
    className="mx-auto mt-4 max-w-[800px] text-[17px]"
    style={{ color: "#9CA3AF" }}
  >
    AISA transforms AI from isolated experiments into
    production-ready systems that deliver measurable
    business outcomes.
  </p>

  <Link
    to="/contact"
    className="mt-8 inline-flex rounded-lg px-6 py-3 text-white font-semibold"
    style={{
      background: "#A855F7",
    }}
  >
    Let's Build Your AI Advantage →
  </Link>
</section>

      </main>
    </div>
  );
}