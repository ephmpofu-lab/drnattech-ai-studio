import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/brand/SiteNav";
import { BrandBackground } from "@/components/brand/Background";

export const Route = createFileRoute("/frameworks-skaido")({
  head: () => ({
    meta: [
      {
        title: "SKAIDO Framework | Enterprise AI Implementation Framework",
      },
      {
        name: "description",
        content:
          "The SKAIDO Framework is a proprietary enterprise AI implementation methodology developed by Dr. Ephraim Mpofu for moving from strategy to measurable business outcomes.",
      },
    ],
  }),

  component: SkaidoPage,
});

function SkaidoPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: "#050816" }}
    >
      <BrandBackground />
      <SiteNav active="Frameworks" />

      <main className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-20 pb-20">
        <div className="max-w-[900px]">
          <div
            className="inline-flex rounded-full px-4 py-2 text-[12px] font-semibold tracking-[0.22em]"
            style={{
              background: "rgba(139,92,246,0.12)",
              border: "1px solid rgba(139,92,246,0.25)",
              color: "#C4B5FD",
            }}
          >
            PROPRIETARY FRAMEWORK
          </div>

          <h1 className="mt-6 text-[56px] font-bold text-white leading-tight">
            SKAIDO Framework
          </h1>

          <p
            className="mt-6 text-[18px] max-w-[800px]"
            style={{ color: "#9CA3AF" }}
          >
            A system-first enterprise AI implementation framework designed to
            move organisations from strategy to measurable business outcomes.
          </p>
        </div>

        <section className="mt-16 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Why The Framework Exists
          </h2>

          <p className="mt-4 text-[16px]" style={{ color: "#9CA3AF" }}>
            Most AI projects fail because organisations focus on tools before
            systems. The SKAIDO Framework provides a structured implementation
            methodology that aligns business objectives, architecture,
            governance, workflows, data and outcomes.
          </p>
        </section>

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Core Principle
          </h2>

          <p className="mt-4 text-[16px]" style={{ color: "#9CA3AF" }}>
            AI implementation should be approached as a business system design
            exercise rather than a technology deployment exercise.
          </p>
        </section>

        <section className="mt-10 glass-card p-8">
          <h2 className="text-[32px] font-bold text-white">
            Business Outcomes
          </h2>

          <ul
            className="mt-4 space-y-3 text-[16px]"
            style={{ color: "#9CA3AF" }}
          >
            <li>• Faster implementation cycles</li>
            <li>• Reduced AI project failure rates</li>
            <li>• Improved governance and compliance</li>
            <li>• Measurable business value creation</li>
            <li>• Scalable enterprise architecture</li>
          </ul>
        </section>
      </main>
    </div>
  );
}