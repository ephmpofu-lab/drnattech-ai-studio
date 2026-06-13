import { Scale, Database, Eye } from "lucide-react";

// Recognisable marks for the proprietary framework suite. Shared across the
// homepage Framework Suite and the About page Framework Evolution flow so the
// visual language stays identical everywhere.
export function FrameworkVisual({ k }: { k: string }) {
  if (k === "aisa") {
    return (
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          background: "linear-gradient(135deg, #8B5CF6, #A855F7)",
          boxShadow: "0 6px 18px -6px rgba(168,85,247,0.6)",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M12 3 L20 21 H16.2 L12 10.5 L7.8 21 H4 Z" fill="#fff" />
          <rect x="9.2" y="14.6" width="5.6" height="2.2" rx="1" fill="#A855F7" />
        </svg>
      </div>
    );
  }

  if (k === "skaido") {
    const nodes = [
      { l: "S", c: "#A855F7" },
      { l: "K", c: "#6366F1" },
      { l: "A", c: "#3B82F6" },
      { l: "I", c: "#14B8A6" },
      { l: "D", c: "#F59E0B" },
      { l: "O", c: "#EF4444" },
    ];
    return (
      <svg
        viewBox="0 0 156 26"
        className="w-full"
        style={{ maxWidth: 150, height: "auto" }}
      >
        <line
          x1="13"
          y1="13"
          x2="143"
          y2="13"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="2"
        />
        {nodes.map((n, i) => {
          const cx = 13 + i * 26;
          return (
            <g key={n.l}>
              <circle cx={cx} cy="13" r="11" fill={n.c} />
              <text
                x={cx}
                y="17"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#fff"
              >
                {n.l}
              </text>
            </g>
          );
        })}
      </svg>
    );
  }

  if (k === "laws") {
    return (
      <div className="flex items-end gap-3">
        <Scale className="h-7 w-7" style={{ color: "#A855F7" }} />
        <Database className="h-6 w-6" style={{ color: "#3B82F6" }} />
        <Eye className="h-6 w-6" style={{ color: "#22C55E" }} />
      </div>
    );
  }

  if (k === "layers") {
    const layers = [
      { y: 5, c: "#A855F7" },
      { y: 14, c: "#6366F1" },
      { y: 23, c: "#14B8A6" },
      { y: 32, c: "#F59E0B" },
    ];
    return (
      <svg width="56" height="46" viewBox="0 0 56 46">
        {layers.map((L, i) => (
          <polygon
            key={i}
            points={`28,${L.y} 52,${L.y + 6} 28,${L.y + 12} 4,${L.y + 6}`}
            fill={L.c}
            opacity="0.92"
          />
        ))}
      </svg>
    );
  }

  // knowledge architecture — knowledge graph / network
  return (
    <svg width="62" height="46" viewBox="0 0 62 46">
      <g stroke="rgba(168,85,247,0.45)" strokeWidth="1.5">
        <line x1="11" y1="16" x2="31" y2="9" />
        <line x1="31" y1="9" x2="51" y2="18" />
        <line x1="11" y1="16" x2="29" y2="36" />
        <line x1="29" y1="36" x2="51" y2="18" />
        <line x1="31" y1="9" x2="29" y2="36" />
      </g>
      {[
        [11, 16, 4.5],
        [31, 9, 6.5],
        [51, 18, 4.5],
        [29, 36, 4.5],
      ].map(([cx, cy, r], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill={i === 1 ? "#A855F7" : "rgba(139,92,246,0.65)"}
          stroke="#C4B5FD"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
