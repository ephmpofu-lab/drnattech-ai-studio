import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  // Cache for 60s on the CDN edge, serve stale for 30s during revalidation
  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) {
    return res.status(200).json({
      totalQueries: 0, successRate: 100, totalChunks: 0, totalDocuments: 0, avgResponseMs: 0,
    });
  }

  try {
    const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

    const [
      { count: total },
      { count: successful },
      { count: chunks },
      { count: docs },
      { data: timings },
    ] = await Promise.all([
      sb.from('chat_stats').select('*', { count: 'exact', head: true }),
      sb.from('chat_stats').select('*', { count: 'exact', head: true }).eq('success', true),
      sb.from('rag_chunks').select('*', { count: 'exact', head: true }),
      sb.from('rag_documents').select('*', { count: 'exact', head: true }),
      sb.from('chat_stats').select('response_time_ms').not('response_time_ms', 'is', null),
    ]);

    const successRate = (total ?? 0) > 0
      ? Math.round(((successful ?? 0) / (total ?? 1)) * 100)
      : 100;

    const avgResponseMs = timings?.length
      ? Math.round(timings.reduce((sum, r) => sum + (r.response_time_ms ?? 0), 0) / timings.length)
      : 0;

    return res.status(200).json({
      totalQueries: total ?? 0,
      successRate,
      totalChunks: chunks ?? 0,
      totalDocuments: docs ?? 0,
      avgResponseMs,
    });
  } catch (err) {
    console.error('stats error', err);
    return res.status(200).json({
      totalQueries: 0, successRate: 100, totalChunks: 0, totalDocuments: 0, avgResponseMs: 0,
    });
  }
}
