import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { supabase } from "@/lib/supabase";

/* ── Helpers ── */
function getOrCreateSession(): string {
  const key = "drnt_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

function parseDevice(): { device_type: string; browser: string; os: string } {
  const ua = navigator.userAgent;
  const device_type = /Mobi|Android/i.test(ua)
    ? "mobile"
    : /Tablet|iPad/i.test(ua)
      ? "tablet"
      : "desktop";
  const browser = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\//i.test(ua)
      ? "Opera"
      : /Chrome\//i.test(ua)
        ? "Chrome"
        : /Safari\//i.test(ua)
          ? "Safari"
          : /Firefox\//i.test(ua)
            ? "Firefox"
            : "Other";
  const os = /Windows/i.test(ua)
    ? "Windows"
    : /Mac OS/i.test(ua)
      ? "macOS"
      : /Linux/i.test(ua)
        ? "Linux"
        : /Android/i.test(ua)
          ? "Android"
          : /iOS|iPhone|iPad/i.test(ua)
            ? "iOS"
            : "Other";
  return { device_type, browser, os };
}

async function getGeo(): Promise<{ country: string; city: string; region: string }> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return { country: "", city: "", region: "" };
    const j = await res.json();
    return {
      country: j.country_name ?? "",
      city: j.city ?? "",
      region: j.region ?? "",
    };
  } catch {
    return { country: "", city: "", region: "" };
  }
}

/* ── Hook ── */
export function usePageTracking() {
  const { pathname } = useLocation();
  const viewIdRef = useRef<string | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => {
    // Skip admin route — don't track your own visits
    if (pathname.startsWith("/admin")) return;

    let cancelled = false;
    const session_id = getOrCreateSession();
    const referrer = document.referrer;
    const { device_type, browser, os } = parseDevice();
    startRef.current = Date.now();

    async function record() {
      const geo = await getGeo();
      if (cancelled) return;

      const { data, error } = await supabase
        .from("page_views")
        .insert({
          session_id,
          page: pathname,
          referrer: referrer || "",
          country: geo.country,
          city: geo.city,
          region: geo.region,
          device_type,
          browser,
          os,
          duration_seconds: 0,
        })
        .select("id")
        .single();

      if (!error && data) viewIdRef.current = data.id;
    }

    void record();

    return () => {
      cancelled = true;
      // Update duration when navigating away
      if (viewIdRef.current) {
        const dur = Math.round((Date.now() - startRef.current) / 1000);
        void supabase
          .from("page_views")
          .update({ duration_seconds: dur })
          .eq("id", viewIdRef.current);
      }
      viewIdRef.current = null;
    };
  }, [pathname]);
}
