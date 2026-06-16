import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  url?: string;
}

export function CalendlyModal({ open, onClose, url = "https://calendly.com/ephraim-mpofu" }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(5,8,22,0.88)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[860px] rounded-[20px] overflow-hidden"
        style={{
          background: "#0a0c1e",
          border: "1px solid rgba(139,92,246,0.3)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
          maxHeight: "90vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-5 py-3.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(139,92,246,0.08)" }}
        >
          <span className="text-[13px] font-semibold text-white">Book a Strategy Call</span>
          <button onClick={onClose} className="rounded-lg p-1 transition-colors hover:bg-white/10" aria-label="Close">
            <X className="h-4 w-4" style={{ color: "#9CA3AF" }} />
          </button>
        </div>
        <iframe
          src={`${url}?embed=true&background_color=050816&text_color=ffffff&primary_color=8B5CF6`}
          width="100%"
          height="650"
          frameBorder="0"
          title="Schedule a call with Dr. Ephraim Mpofu"
          style={{ display: "block" }}
        />
      </div>
    </div>
  );
}
