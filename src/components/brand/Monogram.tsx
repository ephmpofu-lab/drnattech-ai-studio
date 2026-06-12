type Props = { size?: number; className?: string };

export function Monogram({ size = 48, className = "" }: Props) {
  return (
    <div
      className={`flex items-center justify-center rounded-[10px] font-bold ${className}`}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.34,
        letterSpacing: "0.02em",
        color: "#fff",
        background:
          "linear-gradient(160deg, rgba(139,92,246,0.18), rgba(11,16,32,0.9))",
        border: "1.5px solid #8B5CF6",
        boxShadow:
          "0 0 22px -6px rgba(139,92,246,0.55), inset 0 0 10px rgba(139,92,246,0.18)",
      }}
    >
      DR
    </div>
  );
}
