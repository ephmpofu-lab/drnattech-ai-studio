import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-agent")({
  head: () => ({
    meta: [
      {
        title:
          "AI Agent Systems | Enterprise AI Agents & Multi-Agent Architecture",
      },
      {
        name: "description",
        content:
          "Design and implementation of enterprise AI agents, workflow agents, multi-agent systems and autonomous AI platforms.",
      },
    ],
  }),
  component: AIAgentPage,
});

function AIAgentPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <BrandBackground />

      <SiteNav active="Services" />

      <main className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-16 pb-20">

        {/* HERO */}

        <section className="max-w-[900px]">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.2em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#C4B5FD",
            }}
          >
            AI AGENT SYSTEMS
          </div>

          <h1 className="mt-5 text-[48px] font-bold leading-tight text-white">
            Enterprise AI Agent Systems
          </h1>

          <p
            className="mt-5 max-w-[760px] text-[17px]"
            style={{ color: "#9CA3AF" }}
          >
            Design, build and govern AI agent systems that automate
            decisions, coordinate workflows and create measurable
            business outcomes.
          </p>
        </section>

        {/* OVERVIEW */}

        <section className="mt-10 grid gap-6 md:grid-cols-2">

          <div className="glass-card p-6">
            <h2 className="text-[24px] font-bold text-white">
              What Are AI Agents?
            </h2>

            <p
              className="mt-4 text-[15px]"
              style={{ color: "#9CA3AF" }}
            >
              AI agents are systems that can perceive information,
              reason about it, make decisions and take actions
              toward a defined objective.
            </p>
          </div>

          <div className="glass-card p-6">
            <h2 className="text-[24px] font-bold text-white">
              Why They Matter
            </h2>

            <p
              className="mt-4 text-[15px]"
              style={{ color: "#9CA3AF" }}
            >
              Agents reduce manual effort, improve consistency,
              accelerate decision-making and scale operations.
            </p>
          </div>

        </section>

        {/* CAPABILITY LADDER */}

        <section className="mt-12">

          <h2 className="text-[30px] font-bold text-white">
            Agent Capability Ladder
          </h2>

          <p
            className="mt-3 text-[15px]"
            style={{ color: "#9CA3AF" }}
          >
            Not every problem requires a multi-agent platform.
            Start at the lowest level of complexity that solves
            the business problem.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-5">

            {[
              "Assistant",
              "Workflow Agent",
              "AI Pipeline",
              "Multi-Agent",
              "Autonomous Platform",
            ].map((item, index) => (
              <div
                key={item}
                className="glass-card p-5 text-center"
              >
                <div
                  className="text-[12px] font-bold tracking-[0.15em]"
                  style={{ color: "#A855F7" }}
                >
                  LEVEL {index + 1}
                </div>

                <div className="mt-3 text-white font-semibold">
                  {item}
                </div>
              </div>
            ))}

          </div>

        </section>

 
{/* ENTERPRISE USE CASES */}

<section className="mt-14">

  <h2 className="text-[30px] font-bold text-white">
    Enterprise Use Cases
  </h2>

  <p
    className="mt-3 text-[15px]"
    style={{ color: "#9CA3AF" }}
  >
    Practical AI agent implementations that create measurable business value.
  </p>

  <div className="mt-6 grid gap-6 md:grid-cols-2">

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Customer Support
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Intelligent support agents capable of answering questions,
        retrieving information and escalating complex cases.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Operations
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Workflow agents that coordinate processes, validate inputs
        and automate repetitive operational tasks.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Human Resources
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Recruitment, screening and onboarding agents that accelerate
        talent acquisition workflows.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Insurance
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Claims triage, document intelligence and policy support
        agents operating within governed workflows.
      </p>
    </div>

  </div>

</section>

{/* WHY CLIENTS WORK WITH ME */}

<section className="mt-14">

  <h2 className="text-[30px] font-bold text-white">
    Why Organisations Choose My Approach
  </h2>

  <p
    className="mt-3 max-w-[850px] text-[15px]"
    style={{ color: "#9CA3AF" }}
  >
    Most AI projects fail because they focus on models instead of systems.
    I design AI agents as governed business capabilities that integrate with
    existing workflows, data sources and operational processes.
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-2">

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Architecture First
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Every agent begins with business requirements,
        workflow architecture and governance design before
        implementation starts.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Production Ready
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Built for reliability, monitoring, observability,
        security and operational scalability.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Human Oversight
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Critical decisions remain governed through approval
        workflows, escalation paths and audit trails.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[20px] font-bold text-white">
        Measurable Outcomes
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Focused on reducing costs, increasing productivity,
        improving decision quality and accelerating execution.
      </p>
    </div>

  </div>

</section>

{/* AI AGENT LIFECYCLE */}

<section className="mt-14">

  <h2 className="text-[30px] font-bold text-white">
    AI Agent Lifecycle
  </h2>

  <p
    className="mt-3 text-[15px]"
    style={{ color: "#9CA3AF" }}
  >
    Successful AI agents are not built in a single step. They move through a
    structured lifecycle from discovery to continuous optimisation.
  </p>

  <div className="mt-8 grid gap-6 md:grid-cols-5">

    <div className="glass-card p-5 text-center">
      <div
        className="text-[13px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        STEP 1
      </div>

      <h3 className="mt-3 text-[18px] font-bold text-white">
        Discover
      </h3>

      <p
        className="mt-3 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        Identify business opportunities and automation candidates.
      </p>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[13px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        STEP 2
      </div>

      <h3 className="mt-3 text-[18px] font-bold text-white">
        Design
      </h3>

      <p
        className="mt-3 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        Define workflows, tools, data sources and governance controls.
      </p>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[13px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        STEP 3
      </div>

      <h3 className="mt-3 text-[18px] font-bold text-white">
        Build
      </h3>

      <p
        className="mt-3 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        Develop and integrate agents into business operations.
      </p>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[13px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        STEP 4
      </div>

      <h3 className="mt-3 text-[18px] font-bold text-white">
        Govern
      </h3>

      <p
        className="mt-3 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        Monitor performance, risks, approvals and compliance.
      </p>
    </div>

    <div className="glass-card p-5 text-center">
      <div
        className="text-[13px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}
      >
        STEP 5
      </div>

      <h3 className="mt-3 text-[18px] font-bold text-white">
        Optimise
      </h3>

      <p
        className="mt-3 text-[14px]"
        style={{ color: "#9CA3AF" }}
      >
        Continuously improve accuracy, performance and business value.
      </p>
    </div>

  </div>

</section>

{/* FAQ */}

<section className="mt-14">

  <h2 className="text-[30px] font-bold text-white">
    Frequently Asked Questions
  </h2>

  <p
    className="mt-3 text-[15px]"
    style={{ color: "#9CA3AF" }}
  >
    Common questions about enterprise AI agents and intelligent automation.
  </p>

  <div className="mt-8 space-y-6">

    <div className="glass-card p-6">
      <h3 className="text-[18px] font-bold text-white">
        What is an AI agent?
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        An AI agent is a software system that can perceive information,
        reason about it, make decisions and perform actions to achieve
        a defined objective.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[18px] font-bold text-white">
        What is the difference between an AI chatbot and an AI agent?
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Chatbots primarily answer questions. AI agents can take actions,
        interact with systems, execute workflows and coordinate tasks
        across multiple business processes.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[18px] font-bold text-white">
        When should a company implement AI agents?
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        AI agents are valuable when repetitive decisions, manual workflows,
        document-heavy processes or operational bottlenecks limit business
        efficiency and scalability.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[18px] font-bold text-white">
        Are AI agents safe for enterprise environments?
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Yes, when implemented with proper governance, approval workflows,
        monitoring, audit trails, access controls and human oversight.
      </p>
    </div>

    <div className="glass-card p-6">
      <h3 className="text-[18px] font-bold text-white">
        Can AI agents integrate with existing systems?
      </h3>

      <p
        className="mt-3 text-[15px]"
        style={{ color: "#9CA3AF" }}
      >
        Yes. AI agents can integrate with CRMs, ERPs, databases,
        document repositories, APIs, workflow platforms and other
        enterprise applications.
      </p>
    </div>

  </div>

</section>

{/* AI AGENT DELIVERY LIFECYCLE */}

<section className="mt-14">

  <h2 className="text-[30px] font-bold text-white">
    AI Agent Delivery Lifecycle
  </h2>

  <p
    className="mt-3 max-w-[850px] text-[15px]"
    style={{ color: "#9CA3AF" }}
  >
    Successful AI agents require more than model integration.
    They require architecture, governance, deployment and
    operational management.
  </p>

  <div className="mt-8 grid gap-5 md:grid-cols-5">

    <div className="glass-card p-5 text-center">
      <div className="text-[12px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}>
        PHASE 1
      </div>
      <div className="mt-3 font-semibold text-white">
        Discovery
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div className="text-[12px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}>
        PHASE 2
      </div>
      <div className="mt-3 font-semibold text-white">
        Architecture
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div className="text-[12px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}>
        PHASE 3
      </div>
      <div className="mt-3 font-semibold text-white">
        Build
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div className="text-[12px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}>
        PHASE 4
      </div>
      <div className="mt-3 font-semibold text-white">
        Governance
      </div>
    </div>

    <div className="glass-card p-5 text-center">
      <div className="text-[12px] font-semibold tracking-[0.18em]"
        style={{ color: "#A855F7" }}>
        PHASE 5
      </div>
      <div className="mt-3 font-semibold text-white">
        Scale
      </div>
    </div>

  </div>

</section>

{/* CTA */}

<section className="mt-14">

  <div className="glass-card p-8 text-center">

    <div
      className="text-[12px] font-semibold tracking-[0.2em]"
      style={{ color: "#A855F7" }}
    >
      NEXT STEP
    </div>

    <h2 className="mt-4 text-[36px] font-bold text-white">
      Build AI Systems That Deliver Real Business Value
    </h2>

    <p
      className="mx-auto mt-4 max-w-[700px] text-[16px]"
      style={{ color: "#9CA3AF" }}
    >
      Whether you're exploring your first AI initiative or scaling
      enterprise AI operations, a strong architecture foundation
      reduces risk, accelerates delivery and increases the chances
      of long-term success.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-4">

      <Link
        to="/contact"
        className="rounded-lg px-6 py-3 font-semibold text-white"
        style={{
          background: "#A855F7",
        }}
      >
        Book a Discovery Call
      </Link>

      <Link
        to="/frameworks"
        className="rounded-lg px-6 py-3 font-semibold text-white"
        style={{
          border: "1px solid rgba(168,85,247,0.35)",
          background: "rgba(168,85,247,0.08)",
        }}
      >
        Explore Frameworks
      </Link>

    </div>

  </div>

</section>
    </main>
  </div>
);
}