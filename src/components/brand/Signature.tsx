type Props = {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  color?: string;
};

/*
  Wordmark rendered as live text in Cinzel SemiBold (Roman inscription uppercase).
  Font is preloaded in the root document head via Google Fonts.
  Sizing is calibrated so that at "md" (nav size) the rendered width of
  "DR EPHRAIM MPOFU" at 0.2em tracking approximately matches the width of the
  "AI Solutions Architect" subtitle at 9px / 0.28em tracking below it.
*/
const fontSizes = {
  sm:  9,
  md:  12,
  lg:  17,
  xl:  23,
  "2xl": 34,
  "3xl": 56,
} as const;

export function Signature({ size = "md", className = "", color = "#ffffff" }: Props) {
  const fontSize = fontSizes[size];
  return (
    <span
      aria-label="Dr. Ephraim Mpofu"
      className={`inline-block select-none ${className}`}
      style={{
        fontFamily: "'Cinzel', 'Trajan Pro', 'Times New Roman', serif",
        fontWeight: 600,
        fontSize,
        lineHeight: 1.1,
        letterSpacing: "0.2em",
        color,
        whiteSpace: "nowrap",
        textTransform: "uppercase",
      }}
    >
      Dr Ephraim Mpofu
    </span>
  );
}
