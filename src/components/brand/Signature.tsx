type Props = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
};

// Rendered as live text (handwritten executive signature) rather than an image
// asset, so there is never a broken-image placeholder. The "Great Vibes" /
// "Allura" cursive fonts are preloaded in the root document head.
const fontSizes = {
  sm: 24,
  md: 32,
  lg: 44,
  xl: 60,
  "2xl": 92,
  "3xl": 150,
} as const;

export function Signature({ size = "md", className = "" }: Props) {
  const fontSize = fontSizes[size];
  return (
    <span
      aria-label="Dr. Ephraim Mpofu"
      className={`inline-block select-none ${className}`}
      style={{
        fontFamily: "'Great Vibes', 'Allura', cursive",
        fontSize,
        lineHeight: 1,
        color: "#ffffff",
        whiteSpace: "nowrap",
        textShadow:
          "0 0 8px rgba(168,85,247,0.7), 0 0 18px rgba(139,92,246,0.5)",
      }}
    >
      Dr. Ephraim Mpofu
    </span>
  );
}
