export function BrandBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div
        className="absolute -top-40 left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, #8B5CF6, transparent)" }}
      />
      <div
        className="absolute top-[40%] -left-40 h-[500px] w-[500px] rounded-full opacity-25 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, #3B5BFF, transparent)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.15] animate-pulse-grid"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at top, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}
