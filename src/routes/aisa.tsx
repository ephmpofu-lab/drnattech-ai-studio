import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { SiteFooter } from "@/components/brand/SiteFooter";

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
      className="light-page relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#FAFAF8" }}
    >
      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1280px] px-6 pt-20 pb-20 lg:px-10">
        {/* HERO */}
        <section className="max-w-[900px]">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.22em]"
            style={{
              background: "#E9EFF4",
              border: "1px solid #D7D4CC",
              color: "#34506E",
            }}
          >
            FLAGSHIP FRAMEWORK
          </div>

          <h1 className="mt-4 text-[38px] font-medium leading-[1.05]" style={{ color: "#1F2125" }}>
            AISA Framework
          </h1>

          <h2 className="mt-2 text-[22px] font-medium" style={{ color: "#34506E" }}>
            Strategic AI Engagement Framework
          </h2>

          <p
            className="mt-4 max-w-[850px] text-[17px] leading-[1.7]"
            style={{ color: "#5A5D63" }}
          >
            A reusable methodology for translating business problems
            into production-ready AI systems. From discovery and
            architecture through deployment, governance and scale.
          </p>
        </section>

        {/* CORE PRINCIPLE */}
        <section className="mt-10 glass-card p-6">
          <h3 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>
            The Core Principle
          </h3>

          <p className="mt-4 text-[17px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            Clients never come with architecture. They come with problems.

            The role of the AI Solutions Architect is to translate
            business pain into technical architecture and deliver the
            minimum complexity required to create measurable value.
          </p>
        </section>

        {/* AISA JOURNEY */}
        <section className="mt-12">
          <div className="text-center">
            <h2 className="text-[42px] font-medium" style={{ color: "#1F2125" }}>
              The AISA Journey
            </h2>

            <p className="mx-auto mt-4 max-w-[900px] text-[18px] leading-[1.7]" style={{ color: "#5A5D63" }}>
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
                <div key={phase} className="text-center">
                  <div className="text-[56px] font-bold" style={{ color: "#34506E" }}>
                    {phase}
                  </div>
                  <div className="mt-2 text-[24px] font-medium" style={{ color: "#1F2125" }}>
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
            <h3 className="text-center text-[24px] font-medium" style={{ color: "#1F2125" }}>
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
                  className="rounded-xl p-5 text-center"
                  style={{ border: "1px solid #E3E1DA", background: "#EDEBE3" }}
                >
                  <div className="text-[34px] font-bold" style={{ color: "#34506E" }}>
                    {index + 1}
                  </div>
                  <div className="mt-2 text-[16px] font-medium" style={{ color: "#1F2125" }}>
                    {item}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
              <span style={{ color: "#34506E" }}>GOLDEN RULE:</span>{" "}
              Start at the lowest level that solves the problem.
            </p>
          </div>
        </section>

        {/* DISCOVERY */}
        <section className="mt-12 glass-card overflow-hidden">
          <div className="grid lg:grid-cols-[220px_1fr_280px]">
            <div className="p-8" style={{ borderRight: "1px solid #E3E1DA" }}>
              <div className="text-[56px] font-bold" style={{ color: "#34506E" }}>01</div>
              <h3 className="text-[22px] font-medium" style={{ color: "#1F2125" }}>Discovery</h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>
                Understand the business problem before discussing solutions.
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#34506E" }}>
                KEY ACTIVITIES
              </div>
              <div className="mt-6 flex items-center gap-6 flex-wrap">
                {[
                  { emoji: "👥", title: "Interview", sub: "Stakeholder discovery" },
                  { emoji: "🗺️", title: "Process Map", sub: "Current workflow" },
                  { emoji: "🗄️", title: "Data Audit", sub: "Sources & quality" },
                  { emoji: "📈", title: "Feasibility", sub: "Impact vs complexity" },
                  { emoji: "📋", title: "Scope", sub: "Success criteria" },
                ].map((item, i, arr) => (
                  <>
                    <div key={item.title} className="text-center">
                      <div className="text-[30px]">{item.emoji}</div>
                      <div className="mt-2 font-medium" style={{ color: "#1F2125" }}>{item.title}</div>
                      <div className="text-[12px] mt-1" style={{ color: "#5A5D63" }}>{item.sub}</div>
                    </div>
                    {i < arr.length - 1 && <div key={`a${i}`} style={{ color: "#34506E" }}>→</div>}
                  </>
                ))}
              </div>
            </div>

            <div className="p-8" style={{ borderLeft: "1px solid #E3E1DA" }}>
              <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#34506E" }}>
                DELIVERABLES
              </div>
              <ul className="space-y-2 text-[14px] leading-[1.7]" style={{ color: "#5A5D63" }}>
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
            <div className="p-8" style={{ borderRight: "1px solid #E3E1DA" }}>
              <div className="text-[56px] font-bold" style={{ color: "#60A5FA" }}>02</div>
              <h3 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>Architecture</h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>Design the right solution before building anything.</p>
            </div>
            <div className="p-6">
              <div className="mb-6 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#60A5FA" }}>KEY ACTIVITIES</div>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                {["🗂️ Master Data", "🏗️ 4 Layers", "🔗 Child WFs", "⚠️ Failures", "⚙️ Tech Stack", "✅ Approval"].map((item) => {
                  const [emoji, ...rest] = item.split(" ");
                  return (
                    <div key={item} className="text-center">
                      <div className="text-[28px]">{emoji}</div>
                      <div className="mt-2 font-medium" style={{ color: "#1F2125" }}>{rest.join(" ")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-8" style={{ borderLeft: "1px solid #E3E1DA" }}>
              <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#60A5FA" }}>KEY DELIVERABLES</div>
              <ul className="space-y-2 text-[14px] leading-[1.7]" style={{ color: "#5A5D63" }}>
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
            <div className="p-8" style={{ borderRight: "1px solid #E3E1DA" }}>
              <div className="text-[56px] font-bold" style={{ color: "#14B8A6" }}>03</div>
              <h3 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>Build</h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>Build in sequence and validate each layer.</p>
            </div>
            <div className="p-6">
              <div className="mb-6 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#14B8A6" }}>KEY ACTIVITIES</div>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                {["⬇️ Ingestion", "🧩 Child WF", "🔗 Processing", "🏛️ Orchestration", "📤 Output", "🚨 Errors"].map((item) => {
                  const parts = item.split(" ");
                  return (
                    <div key={item} className="text-center">
                      <div>{parts[0]}</div>
                      <div className="font-medium mt-2" style={{ color: "#1F2125" }}>{parts.slice(1).join(" ")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-8" style={{ borderLeft: "1px solid #E3E1DA" }}>
              <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#14B8A6" }}>KEY DELIVERABLES</div>
              <ul className="space-y-2 text-[14px] leading-[1.7]" style={{ color: "#5A5D63" }}>
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
            <div className="p-8" style={{ borderRight: "1px solid #E3E1DA" }}>
              <div className="text-[56px] font-bold" style={{ color: "#84CC16" }}>04</div>
              <h3 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>Validate</h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>Prove the system works under real conditions.</p>
            </div>
            <div className="p-6">
              <div className="mb-6 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#84CC16" }}>KEY ACTIVITIES</div>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                {["🙂 Happy Path", "❌ Failure Path", "🧠 AI Eval", "🎯 Grounding", "⚡ Performance", "👥 UAT"].map((item) => {
                  const parts = item.split(" ");
                  return (
                    <div key={item} className="text-center">
                      <div>{parts[0]}</div>
                      <div className="mt-2 font-medium" style={{ color: "#1F2125" }}>{parts.slice(1).join(" ")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-8" style={{ borderLeft: "1px solid #E3E1DA" }}>
              <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#84CC16" }}>KEY DELIVERABLES</div>
              <ul className="space-y-2 text-[14px] leading-[1.7]" style={{ color: "#5A5D63" }}>
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
            <div className="p-8" style={{ borderRight: "1px solid #E3E1DA" }}>
              <div className="text-[56px] font-bold" style={{ color: "#F97316" }}>05</div>
              <h3 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>Deploy</h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>Go live safely through staged rollout.</p>
            </div>
            <div className="p-6">
              <div className="mb-6 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#F97316" }}>KEY ACTIVITIES</div>
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
                {["🌑 Shadow", "📈 10%", "📊 50%", "🚀 Production", "🤝 Handover"].map((item) => {
                  const parts = item.split(" ");
                  return (
                    <div key={item} className="text-center">
                      <div>{parts[0]}</div>
                      <div className="mt-2 font-medium" style={{ color: "#1F2125" }}>{parts.slice(1).join(" ")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-8" style={{ borderLeft: "1px solid #E3E1DA" }}>
              <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#F97316" }}>KEY DELIVERABLES</div>
              <ul className="space-y-2 text-[14px] leading-[1.7]" style={{ color: "#5A5D63" }}>
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
            <div className="p-8" style={{ borderRight: "1px solid #E3E1DA" }}>
              <div className="text-[56px] font-bold" style={{ color: "#EF4444" }}>06</div>
              <h3 className="text-[28px] font-medium" style={{ color: "#1F2125" }}>Scale</h3>
              <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>Monitor, optimise and improve continuously.</p>
            </div>
            <div className="p-6">
              <div className="mb-6 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#EF4444" }}>KEY ACTIVITIES</div>
              <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
                {["📊 Monitor", "🎯 Drift", "💰 Costs", "📈 Scale", "📅 Review", "🔔 Alerts"].map((item) => {
                  const parts = item.split(" ");
                  return (
                    <div key={item} className="text-center">
                      <div>{parts[0]}</div>
                      <div className="mt-2 font-medium" style={{ color: "#1F2125" }}>{parts.slice(1).join(" ")}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="p-8" style={{ borderLeft: "1px solid #E3E1DA" }}>
              <div className="mb-4 text-[12px] font-bold tracking-[0.2em]" style={{ color: "#EF4444" }}>KEY DELIVERABLES</div>
              <ul className="space-y-2 text-[14px] leading-[1.7]" style={{ color: "#5A5D63" }}>
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
          <h2 className="text-center text-[40px] font-medium" style={{ color: "#1F2125" }}>
            The Three Architecture Laws
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { label: "LAW 1", color: "#34506E", title: "Separation of Concerns", desc: "One responsibility per node. No node should validate, enrich and route simultaneously." },
              { label: "LAW 2", color: "#3B82F6", title: "Single Source of Truth", desc: "Data fetched once. Passed forward. Raw data remains immutable." },
              { label: "LAW 3", color: "#22C55E", title: "Fail Visibility", desc: "Every critical failure must be observable through logs, alerts and escalation." },
            ].map((law) => (
              <div key={law.label} className="glass-card p-6">
                <div className="text-[12px] tracking-[0.25em] font-bold" style={{ color: law.color }}>
                  {law.label}
                </div>
                <h3 className="mt-4 text-[18px] font-medium" style={{ color: "#1F2125" }}>{law.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.7]" style={{ color: "#5A5D63" }}>{law.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-10 glass-card p-8 text-center">
          <h3 className="text-[36px] font-medium" style={{ color: "#1F2125" }}>
            Build AI Systems That Scale
          </h3>

          <p className="mx-auto mt-4 max-w-[800px] text-[17px] leading-[1.7]" style={{ color: "#5A5D63" }}>
            AISA transforms AI from isolated experiments into
            production-ready systems that deliver measurable
            business outcomes.
          </p>

          <Link
            to="/contact"
            className="mt-8 inline-flex rounded-lg px-6 py-3 text-[14px] font-semibold transition-all hover:opacity-80"
            style={{ background: "#34506E", color: "#FAFAF8" }}
          >
            Let's Build Your AI Advantage →
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
