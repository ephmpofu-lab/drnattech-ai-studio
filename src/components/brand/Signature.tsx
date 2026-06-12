import signatureAsset from "@/assets/signature.png.asset.json";

type Props = { size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"; className?: string };

const heights = { sm: 28, md: 40, lg: 56, xl: 80, "2xl": 120, "3xl": 200 } as const;

export function Signature({ size = "md", className = "" }: Props) {
  const h = heights[size];
  return (
    <img
      src={signatureAsset.url}
      alt="Dr. Ephraim Mpofu"
      className={`inline-block select-none ${className}`}
      style={{
        height: h,
        width: "auto",
        objectFit: "contain",
        filter:
          "drop-shadow(0 0 8px rgba(168,85,247,0.7)) drop-shadow(0 0 18px rgba(139,92,246,0.5))",
      }}
    />
  );
}
