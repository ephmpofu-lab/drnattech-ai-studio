import { useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

/* ─── Types ── */
interface PageView {
  id: string;
  session_id: string;
  page: string;
  referrer: string;
  country: string;
  city: string;
  region: string;
  device_type: string;
  browser: string;
  os: string;
  duration_seconds: number;
  created_at: string;
}

/* ─── Helpers ── */
function fmtTime(secs: number): string {
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

function topN<T>(arr: T[], key: keyof T, n = 8): { label: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const item of arr) {
    const k = String(item[key] || "");
    counts[k] = (counts[k] ?? 0) + 1;
  }
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([label, count]) => ({ label, count }));
}

function viewsByDay(rows: PageView[], days: number): { date: string; views: number }[] {
  const buckets: Record<string, number> = {};
  const now = Date.now();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now - i * 86400_000);
    buckets[d.toISOString().slice(0, 10)] = 0;
  }
  for (const r of rows) {
    const d = r.created_at.slice(0, 10);
    if (d in buckets) buckets[d]++;
  }
  return Object.entries(buckets).map(([date, views]) => ({
    date: date.slice(5),
    views,
  }));
}

function uniqueSessions(rows: PageView[]): number {
  return new Set(rows.map((r) => r.session_id)).size;
}

function avgDuration(rows: PageView[]): number {
  const valid = rows.filter((r) => r.duration_seconds > 0);
  if (!valid.length) return 0;
  return Math.round(valid.reduce((s, r) => s + r.duration_seconds, 0) / valid.length);
}

const PALETTE = ["#0B1A2E", "#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#6366F1", "#8B5CF6"];

/* ─── Stat card ── */
function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "18px 22px" }}>
      <p style={{ margin: 0, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: "#9CA3AF" }}>{label}</p>
      <p style={{ margin: "6px 0 0", fontSize: 32, fontWeight: 800, color: "#0B1A2E", lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6B7280" }}>{sub}</p>}
    </div>
  );
}

/* ─── Horizontal bar list ── */
function BarList({ title, data }: { title: string; data: { label: string; count: number }[] }) {
  const max = data[0]?.count ?? 1;
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "18px 22px" }}>
      <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: "#0B1A2E" }}>{title}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {data.length === 0 && <p style={{ margin: 0, fontSize: 12, color: "#9CA3AF" }}>No data yet</p>}
        {data.map((d) => (
          <div key={d.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
              <span style={{ fontSize: 12, color: "#374151", maxWidth: "78%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {d.label || "Direct / Unknown"}
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#0B1A2E" }}>{d.count}</span>
            </div>
            <div style={{ height: 6, borderRadius: 3, background: "#F3F4F6", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 3, background: "#0B1A2E", width: `${(d.count / max) * 100}%`, transition: "width 0.5s" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Recent visitors table ── */
function RecentTable({ rows }: { rows: PageView[] }) {
  return (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", overflow: "hidden" }}>
      <div style={{ padding: "14px 22px", borderBottom: "1px solid #F3F4F6" }}>
        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#0B1A2E" }}>Recent Visitors</p>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: "#F9FAFB" }}>
              {["Time", "Page", "Country", "City", "Device", "Browser", "Referrer", "Duration"].map((h) => (
                <th key={h} style={{ padding: "9px 14px", textAlign: "left", fontWeight: 600, color: "#6B7280", whiteSpace: "nowrap", fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.slice(0, 50).map((r) => (
              <tr key={r.id} style={{ borderTop: "1px solid #F3F4F6" }}>
                <td style={{ padding: "8px 14px", color: "#6B7280", whiteSpace: "nowrap" }}>
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td style={{ padding: "8px 14px", color: "#0B1A2E", fontWeight: 500, maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.page}</td>
                <td style={{ padding: "8px 14px", color: "#374151" }}>{r.country || "-"}</td>
                <td style={{ padding: "8px 14px", color: "#374151" }}>{r.city || "-"}</td>
                <td style={{ padding: "8px 14px", color: "#374151" }}>{r.device_type || "-"}</td>
                <td style={{ padding: "8px 14px", color: "#374151" }}>{r.browser || "-"}</td>
                <td style={{ padding: "8px 14px", color: "#6B7280", maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {r.referrer || "Direct"}
                </td>
                <td style={{ padding: "8px 14px", color: "#374151" }}>
                  {r.duration_seconds > 0 ? fmtTime(r.duration_seconds) : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && (
          <p style={{ textAlign: "center", padding: 32, color: "#9CA3AF", fontSize: 13 }}>
            No visitors recorded yet
          </p>
        )}
      </div>
    </div>
  );
}

/* ─── Login screen ── */
function LoginScreen({ onSession }: { onSession: (s: Session) => void }) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!supabase) { setError("Supabase not configured."); setLoading(false); return; }
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password: pw });
    setLoading(false);
    if (err || !data.session) {
      setError(err?.message ?? "Login failed.");
    } else {
      onSession(data.session);
    }
  }

  const field: React.CSSProperties = {
    width: "100%", boxSizing: "border-box", padding: "10px 14px",
    borderRadius: 8, border: "1.5px solid #D1D5DB", fontSize: 14,
    outline: "none", color: "#0B1A2E", marginBottom: 12,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={submit} style={{ background: "#fff", borderRadius: 16, border: "1px solid #E5E7EB", padding: "40px 48px", width: 360, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "#0B1A2E", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h1 style={{ margin: "0 0 4px", fontSize: 20, fontWeight: 700, color: "#0B1A2E" }}>Admin Dashboard</h1>
        <p style={{ margin: "0 0 28px", fontSize: 13, color: "#9CA3AF" }}>drnattech.com — Analytics</p>

        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com" style={field} autoFocus
          onFocus={(e) => { e.target.style.borderColor = "#0B1A2E"; }}
          onBlur={(e) => { e.target.style.borderColor = "#D1D5DB"; }}
        />

        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 6 }}>Password</label>
        <input type="password" value={pw} onChange={(e) => setPw(e.target.value)}
          placeholder="Password" style={field}
          onFocus={(e) => { e.target.style.borderColor = "#0B1A2E"; }}
          onBlur={(e) => { e.target.style.borderColor = "#D1D5DB"; }}
        />

        {error && <p style={{ margin: "-4px 0 10px", fontSize: 12, color: "#DC2626" }}>{error}</p>}

        <button type="submit" disabled={loading || !email || !pw}
          style={{
            width: "100%", padding: "11px", borderRadius: 9, border: "none",
            fontSize: 14, fontWeight: 700,
            cursor: loading || !email || !pw ? "not-allowed" : "pointer",
            background: loading || !email || !pw ? "#E5E7EB" : "#0B1A2E",
            color: loading || !email || !pw ? "#9CA3AF" : "#fff",
            transition: "background 0.15s",
          }}>
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

/* ─── Dashboard ── */
function Dashboard({ session }: { session: Session }) {
  const [rows, setRows] = useState<PageView[]>([]);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(false);
  const [lastFetch, setLastFetch] = useState("");

  const load = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);
    const since = new Date(Date.now() - days * 86400_000).toISOString();
    const { data, error } = await supabase
      .from("page_views")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false });
    setLoading(false);
    if (!error && data) {
      setRows(data as PageView[]);
      setLastFetch(new Date().toLocaleTimeString());
    }
  }, [days]);

  useEffect(() => { void load(); }, [load]);

  async function signOut() {
    await supabase?.auth.signOut();
    location.reload();
  }

  const byDay        = viewsByDay(rows, days);
  const topPages     = topN(rows, "page");
  const topCountries = topN(rows, "country");
  const topCities    = topN(rows, "city");
  const topRefs      = topN(rows, "referrer");
  const topBrowsers  = topN(rows, "browser");
  const topDevices   = topN(rows, "device_type");

  const grid3: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 };
  const grid2: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginTop: 16 };

  return (
    <div style={{ minHeight: "100vh", background: "#F8F9FB" }}>
      {/* Header */}
      <div style={{ background: "#0B1A2E", padding: "0 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", height: 58, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>drnattech.com</span>
            <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "#60A5FA", background: "rgba(96,165,250,0.12)", padding: "3px 10px", borderRadius: 999 }}>Analytics</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {lastFetch && <span style={{ fontSize: 11, color: "#4B5563" }}>Updated {lastFetch}</span>}
            <button onClick={() => void load()} disabled={loading}
              style={{ padding: "6px 14px", borderRadius: 7, border: "1px solid #374151", background: "transparent", color: "#9CA3AF", fontSize: 12, cursor: "pointer" }}>
              {loading ? "..." : "Refresh"}
            </button>
            <select value={days} onChange={(e) => setDays(Number(e.target.value))}
              style={{ padding: "6px 10px", borderRadius: 7, border: "none", background: "#1E3A8A", color: "#fff", fontSize: 12, cursor: "pointer" }}>
              {[7, 14, 30, 90].map((d) => <option key={d} value={d}>Last {d} days</option>)}
            </select>
            <span style={{ fontSize: 11, color: "#4B5563" }}>{session.user.email}</span>
            <button onClick={signOut}
              style={{ padding: "6px 14px", borderRadius: 7, border: "1px solid #374151", background: "transparent", color: "#6B7280", fontSize: 12, cursor: "pointer" }}>
              Sign out
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "28px 32px 80px" }}>

        {/* KPIs */}
        <div style={grid3}>
          <Stat label="Total Page Views" value={rows.length} sub={`last ${days} days`} />
          <Stat label="Unique Sessions" value={uniqueSessions(rows)} sub="estimated unique visitors" />
          <Stat label="Avg Time on Page" value={fmtTime(avgDuration(rows))} sub="across all pages" />
        </div>

        {/* Trend */}
        <div style={{ marginTop: 16, background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "18px 22px" }}>
          <p style={{ margin: "0 0 16px", fontSize: 13, fontWeight: 700, color: "#0B1A2E" }}>Page Views Over Time</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={byDay} margin={{ top: 4, right: 4, bottom: 0, left: -24 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0B1A2E" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0B1A2E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#9CA3AF" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }} />
              <Area type="monotone" dataKey="views" stroke="#0B1A2E" strokeWidth={2} fill="url(#grad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top pages + countries */}
        <div style={grid2}>
          <BarList title="Top Pages" data={topPages} />
          <BarList title="Top Countries" data={topCountries} />
        </div>

        {/* Cities + referrers */}
        <div style={grid2}>
          <BarList title="Top Cities" data={topCities} />
          <BarList title="Traffic Sources" data={topRefs} />
        </div>

        {/* Browser + device charts */}
        <div style={grid2}>
          {[
            { title: "Browsers", data: topBrowsers },
            { title: "Device Types", data: topDevices },
          ].map(({ title, data }) => (
            <div key={title} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", padding: "18px 22px" }}>
              <p style={{ margin: "0 0 14px", fontSize: 13, fontWeight: 700, color: "#0B1A2E" }}>{title}</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis dataKey="label" tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#9CA3AF" }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E5E7EB" }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {data.map((_, i) => <Cell key={i} fill={PALETTE[i % PALETTE.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
        </div>

        {/* Recent visitors */}
        <div style={{ marginTop: 16 }}>
          <RecentTable rows={rows} />
        </div>
      </div>
    </div>
  );
}

/* ─── Page root ── */
function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!supabase) { setChecking(false); return; }
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "#F8F9FB", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#9CA3AF", fontSize: 14 }}>Loading...</p>
      </div>
    );
  }

  if (!session) return <LoginScreen onSession={setSession} />;
  return <Dashboard session={session} />;
}
