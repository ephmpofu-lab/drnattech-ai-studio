import { createFileRoute } from "@tanstack/react-router";
import {
  Rocket,
  Clock,
  BarChart3,
  ShieldCheck,
  ArrowRight,
  Bot,
  Database,
  Workflow,
  Boxes,
  Building2,
  Shield,
  Target,
} from "lucide-react";

import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      {
        title:
          "AI Portfolio & Case Studies | Dr. Ephraim Mpofu",
      },
      {
        name: "description",
        content:
          "Enterprise AI architecture, AI agents, automation systems and governance case studies.",
      },
    ],
  }),
  component: PortfolioPage,
});

type Project = {
  badge: string;
  title: string;
  description: string;
  metrics: {
    value: string;
    label: string;
  }[];
  technologies: string[];
  cover: "claims" | "career" | "knowledge";
};

const metrics = [
  {
    icon: Rocket,
    value: "12+",
    label: "Projects Delivered",
  },
  {
    icon: Clock,
    value: "3,500+",
    label: "Hours Automated",
  },
  {
    icon: BarChart3,
    value: "70%",
    label: "Process Reduction",
  },
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Production Ready",
  },
];

const projects: Project[] = [
  {
    badge: "01",
    title: "Insurance Claims Intelligence Platform",
    description:
      "Enterprise multi-agent platform automating claims intake, fraud detection, triage and decision support.",
    metrics: [
      { value: "70%", label: "Processing Time Reduction" },
      { value: "35%", label: "Fraud Detection Improvement" },
      { value: "100%", label: "Audit Trail Coverage" },
    ],
    technologies: [
      "n8n",
      "OpenAI",
      "Claude",
      "Supabase",
      "PostgreSQL",
      "RAG",
    ],
    cover: "claims",
  },

  {
    badge: "02",
    title: "Career Intelligence Operating System",
    description:
      "AI-powered career intelligence platform combining CV intelligence, job intelligence and application automation.",
    metrics: [
      { value: "85%", label: "Time Saved" },
      { value: "3x", label: "Applications Submitted" },
      { value: "Smart", label: "Personalisation" },
    ],
    technologies: [
      "OpenAI",
      "Supabase",
      "Pinecone",
      "n8n",
      "Vector Search",
      "Python",
    ],
    cover: "career",
  },

  {
    badge: "03",
    title: "Knowledge Architecture Operating System",
    description:
      "Enterprise knowledge acquisition, intelligence, indexing and governance platform.",
    metrics: [
      { value: "Centralised", label: "Knowledge" },
      { value: "Faster", label: "Retrieval" },
      { value: "Governed", label: "Access" },
    ],
    technologies: [
      "OpenAI",
      "Pinecone",
      "Supabase",
      "PostgreSQL",
      "RAG",
      "Python",
    ],
    cover: "knowledge",
  },
];

function PortfolioPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <BrandBackground />

      <SiteNav active="Portfolio" />

      <main className="mx-auto max-w-[1400px] px-6 lg:px-10 pb-24">
        <Hero />
        <MetricsStrip />
        <FeaturedProjects />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 items-center gap-16 pt-14 lg:grid-cols-2">
      <div>
        <span
          className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.25)",
            color: "#C4B5FD",
          }}
        >
          Portfolio
        </span>

        <h1 className="mt-8 text-[72px] font-bold leading-[0.95] tracking-tight text-white">
          Proof That
          <br />
          I Deliver
          <span className="text-gradient-brand">
            {" "}Results
          </span>
        </h1>

        <p
          className="mt-8 max-w-[560px] text-[20px] leading-relaxed"
          style={{ color: "#A3A3B2" }}
        >
          Real projects. Real impact.
          <br />
          Built for production.
          Designed for business outcomes.
        </p>
      </div>

      <div className="relative h-[520px]">
        <div
          className="absolute inset-0 rounded-[32px]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(168,85,247,0.18), transparent)",
          }}
        />

        <div
          className="absolute left-[130px] top-[130px] h-[240px] w-[260px] rounded-[28px]"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(139,92,246,0.18)",
          }}
        />

        <div
          className="absolute left-[220px] top-[90px] h-[90px] w-[180px] rounded-[18px]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        <div
          className="absolute right-[40px] top-[120px] h-[120px] w-[180px] rounded-[18px]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        <div
          className="absolute left-[40px] bottom-[90px] h-[120px] w-[180px] rounded-[18px]"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />

        <div
          className="absolute left-[210px] top-[205px] h-[100px] w-[130px] rounded-[18px]"
          style={{
            background:
              "linear-gradient(135deg,#8B5CF6,#A855F7)",
            boxShadow:
              "0 0 120px rgba(168,85,247,0.55)",
          }}
        />
      </div>
    </section>
  );
}

function MetricsStrip() {
  return (
    <section className="mt-10">
      <div
        className="grid grid-cols-2 overflow-hidden rounded-[24px] lg:grid-cols-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(139,92,246,0.15)",
        }}
      >
        {metrics.map((item) => (
          <div key={item.label} className="p-8">
            <item.icon
              className="h-8 w-8"
              style={{ color: "#A855F7" }}
            />

            <div className="mt-4 text-[46px] font-bold text-gradient-brand">
              {item.value}
            </div>

            <div
              className="mt-2 text-sm"
              style={{ color: "#A3A3B2" }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
function FeaturedProjects() {
  return (
    <section className="mt-20">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-5xl font-bold text-white">
            Featured Case Studies
          </h2>

          <p
            className="mt-3 text-lg"
            style={{ color: "#A3A3B2" }}
          >
            Enterprise AI systems designed, architected and delivered.
          </p>
        </div>

        <button
          className="hidden items-center gap-2 text-sm font-semibold lg:flex"
          style={{ color: "#A855F7" }}
        >
          View All Projects
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
          />
        ))}
      </div>

      <ServicesSection />
      <TechnologySection />
      <PortfolioCTA />
    </section>
  );
}

function ProjectCard({
  project,
}: {
  project: Project;
}) {
  return (
    <article
      className="overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-2"
      style={{
        background: "#0B1020",
        border: "1px solid rgba(139,92,246,0.15)",
        boxShadow:
          "0 0 50px rgba(139,92,246,0.05)",
      }}
    >
      <ProjectGraphic type={project.cover} />

      <div className="p-7">
        <div
          className="inline-flex rounded-full px-3 py-1 text-[11px] font-bold"
          style={{
            background:
              "rgba(168,85,247,0.18)",
            color: "#E9D5FF",
          }}
        >
          {project.badge}
        </div>

        <h3 className="mt-5 text-[28px] font-bold leading-tight text-white">
          {project.title}
        </h3>

        <p
          className="mt-4 min-h-[90px] text-[15px] leading-relaxed"
          style={{ color: "#A3A3B2" }}
        >
          {project.description}
        </p>

        <div
          className="mt-8 text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{ color: "#6B7280" }}
        >
          Impact
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {project.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-xl p-4"
              style={{
                background:
                  "rgba(168,85,247,0.05)",
                border:
                  "1px solid rgba(168,85,247,0.15)",
              }}
            >
              <div className="text-xl font-bold text-[#A855F7]">
                {metric.value}
              </div>

              <div
                className="mt-2 text-xs leading-tight"
                style={{
                  color: "#A3A3B2",
                }}
              >
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <div
            className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em]"
            style={{ color: "#6B7280" }}
          >
            Technologies
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-3 py-1 text-xs"
                style={{
                  background:
                    "rgba(255,255,255,0.04)",
                  border:
                    "1px solid rgba(139,92,246,0.15)",
                  color: "#E5E7EB",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <button
          className="mt-8 inline-flex items-center gap-2 font-semibold"
          style={{
            color: "#A855F7",
          }}
        >
          View Case Study
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}

function ProjectGraphic({
  type,
}: {
  type: Project["cover"];
}) {
  return (
    <div
      className="relative h-[220px] overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg,#24184A,#0B1020)",
        borderBottom:
          "1px solid rgba(139,92,246,0.15)",
      }}
    >
      <svg
        viewBox="0 0 420 220"
        className="absolute inset-0 h-full w-full"
      >
        {type === "claims" && (
          <>
            <line x1="90" y1="110" x2="170" y2="60" stroke="#8B5CF6" />
            <line x1="90" y1="110" x2="170" y2="160" stroke="#8B5CF6" />
            <line x1="250" y1="60" x2="330" y2="110" stroke="#8B5CF6" />
            <line x1="250" y1="160" x2="330" y2="110" stroke="#8B5CF6" />

            {[
              ["Intake", 40, 92],
              ["Triage", 170, 42],
              ["Fraud", 170, 142],
              ["Decision", 310, 92],
            ].map(([label, x, y]) => (
              <g key={label}>
                <rect
                  x={Number(x)}
                  y={Number(y)}
                  width="80"
                  height="36"
                  rx="8"
                  fill="rgba(139,92,246,0.18)"
                  stroke="rgba(168,85,247,0.7)"
                />
                <text
                  x={Number(x) + 40}
                  y={Number(y) + 22}
                  fill="white"
                  textAnchor="middle"
                  fontSize="11"
                >
                  {label}
                </text>
              </g>
            ))}

            <circle
              cx="210"
              cy="110"
              r="18"
              fill="rgba(168,85,247,0.25)"
              stroke="#A855F7"
            />
          </>
        )}

        {type === "career" && (
          <>
            <line x1="80" y1="110" x2="170" y2="110" stroke="#8B5CF6" />
            <line x1="250" y1="110" x2="340" y2="110" stroke="#8B5CF6" />

            {[
              ["CV", 40],
              ["Matching", 150],
              ["AI Agent", 260],
            ].map(([label, x]) => (
              <g key={label}>
                <rect
                  x={Number(x)}
                  y="90"
                  width="80"
                  height="40"
                  rx="8"
                  fill="rgba(139,92,246,0.18)"
                  stroke="rgba(168,85,247,0.7)"
                />
                <text
                  x={Number(x) + 40}
                  y="114"
                  fill="white"
                  textAnchor="middle"
                  fontSize="11"
                >
                  {label}
                </text>
              </g>
            ))}

            <rect
              x="150"
              y="35"
              width="120"
              height="30"
              rx="8"
              fill="rgba(255,255,255,0.05)"
              stroke="rgba(255,255,255,0.1)"
            />

            <text
              x="210"
              y="54"
              fill="#C4B5FD"
              textAnchor="middle"
              fontSize="10"
            >
              Career Insights
            </text>
          </>
        )}

        {type === "knowledge" && (
          <>
            {[
              ["Acquire", 25],
              ["Intelligence", 120],
              ["Index", 220],
              ["Governance", 315],
            ].map(([label, x]) => (
              <g key={label}>
                <rect
                  x={Number(x)}
                  y="92"
                  width="80"
                  height="38"
                  rx="8"
                  fill="rgba(139,92,246,0.18)"
                  stroke="rgba(168,85,247,0.7)"
                />

                <text
                  x={Number(x) + 40}
                  y="115"
                  fill="white"
                  textAnchor="middle"
                  fontSize="10"
                >
                  {label}
                </text>
              </g>
            ))}

            <line x1="105" y1="110" x2="120" y2="110" stroke="#8B5CF6" />
            <line x1="200" y1="110" x2="220" y2="110" stroke="#8B5CF6" />
            <line x1="300" y1="110" x2="315" y2="110" stroke="#8B5CF6" />
          </>
        )}
      </svg>
    </div>
  );
}
function ServicesSection() {
  const services = [
    {
      icon: Target,
      title: "AI Strategy",
      description:
        "Translate business goals into practical AI roadmaps, investment plans and implementation strategies.",
    },

    {
      icon: Bot,
      title: "AI Agent Systems",
      description:
        "Design autonomous agents and multi-agent architectures that perform real business work.",
    },

    {
      icon: Workflow,
      title: "Workflow Automation",
      description:
        "Eliminate manual processes through intelligent orchestration and automation.",
    },

    {
      icon: Database,
      title: "RAG Platforms",
      description:
        "Enterprise retrieval systems built for accuracy, governance and scalability.",
    },

    {
      icon: Building2,
      title: "Enterprise Architecture",
      description:
        "Production-grade architectures designed for reliability, security and growth.",
    },

    {
      icon: Shield,
      title: "AI Governance",
      description:
        "Risk management, auditability, compliance and responsible AI controls.",
    },
  ];

  return (
    <section className="mt-28">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white">
          How I Can Help Your Organization
        </h2>

        <p
          className="mx-auto mt-5 max-w-[800px] text-lg"
          style={{ color: "#A3A3B2" }}
        >
          End-to-end support across AI strategy, architecture,
          implementation and governance.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.title}
            className="rounded-[24px] p-8 transition-all duration-300 hover:-translate-y-2"
            style={{
              background: "#0B1020",
              border: "1px solid rgba(139,92,246,0.15)",
              boxShadow:
                "0 0 40px rgba(139,92,246,0.05)",
            }}
          >
            <service.icon
              className="h-10 w-10"
              style={{
                color: "#A855F7",
              }}
            />

            <h3 className="mt-6 text-2xl font-bold text-white">
              {service.title}
            </h3>

            <p
              className="mt-4 text-[15px] leading-relaxed"
              style={{
                color: "#A3A3B2",
              }}
            >
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function TechnologySection() {
  const technologies = [
    "OpenAI",
    "Claude",
    "n8n",
    "Python",
    "Supabase",
    "PostgreSQL",
    "Pinecone",
    "Docker",
    "AWS",
    "Azure",
    "Power BI",
    "LangChain",
  ];

  return (
    <section className="mt-28">
      <div className="text-center">
        <h2 className="text-5xl font-bold text-white">
          Technology Ecosystem
        </h2>

        <p
          className="mx-auto mt-5 max-w-[800px] text-lg"
          style={{ color: "#A3A3B2" }}
        >
          Modern tools and platforms used to build enterprise AI systems.
        </p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {technologies.map((tech) => (
          <div
            key={tech}
            className="flex h-[90px] items-center justify-center rounded-[20px] text-sm font-semibold transition-all duration-300 hover:-translate-y-1"
            style={{
              background: "#0B1020",
              border: "1px solid rgba(139,92,246,0.15)",
              color: "#FFFFFF",
            }}
          >
            {tech}
          </div>
        ))}
      </div>
    </section>
  );
}

function PortfolioCTA() {
  return (
    <section
      className="mt-28 overflow-hidden rounded-[32px] p-10 lg:p-14"
      style={{
        background:
          "linear-gradient(135deg, rgba(139,92,246,0.20), rgba(20,20,40,0.85))",
        border: "1px solid rgba(139,92,246,0.20)",
      }}
    >
      <div className="grid gap-14 lg:grid-cols-2">
        <div>
          <h2 className="text-5xl font-bold text-white">
            Ready To Build Your AI Advantage?
          </h2>

          <p
            className="mt-6 text-lg leading-relaxed"
            style={{
              color: "#D1D5DB",
            }}
          >
            From AI strategy and architecture to deployment and
            governance, I help organisations move from experimentation
            to production-ready AI systems.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              className="rounded-xl px-8 py-4 font-semibold text-white"
              style={{
                background:
                  "linear-gradient(135deg,#8B5CF6,#A855F7)",
              }}
            >
              Book a Discovery Call
            </button>

            <button
              className="rounded-xl px-8 py-4 font-semibold text-white"
              style={{
                border:
                  "1px solid rgba(139,92,246,0.30)",
              }}
            >
              Contact Me
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative w-full">
            <div
              className="absolute left-0 right-0 top-6 h-[2px]"
              style={{
                background:
                  "rgba(168,85,247,0.30)",
              }}
            />

            <div className="relative flex justify-between">
              {[
                "Discovery",
                "Architecture",
                "Build",
                "Governance",
                "Scale",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex flex-col items-center"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
                    style={{
                      background:
                        "linear-gradient(135deg,#8B5CF6,#A855F7)",
                    }}
                  >
                    {index + 1}
                  </div>

                  <div
                    className="mt-4 text-center text-xs font-semibold uppercase tracking-wider"
                    style={{
                      color: "#D1D5DB",
                    }}
                  >
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}