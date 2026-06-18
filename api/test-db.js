import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;

  const result = {
    supabase_url_set: !!url,
    supabase_key_set: !!key,
    supabase_url_value: url ?? 'NOT SET',
    supabase_key_prefix: key ? key.slice(0, 15) + '...' : 'NOT SET',
  };

  if (!url || !key) {
    return res.status(200).json({ ...result, verdict: 'ENV VARS MISSING — add them in Vercel and redeploy' });
  }

  try {
    const sb = createClient(url, key);

    // 1. Try counting existing rows
    const { count, error: countErr } = await sb
      .from('chat_stats')
      .select('*', { count: 'exact', head: true });

    result.count_test = countErr
      ? { error: countErr.message, code: countErr.code }
      : { ok: true, rows: count };

    // 2. Try inserting a test row
    const { error: insertErr } = await sb.from('chat_stats').insert({
      session_id: 'diagnostic',
      question: 'test insert from /api/test-db',
      success: true,
      response_time_ms: 1,
    });

    result.insert_test = insertErr
      ? { error: insertErr.message, code: insertErr.code, details: insertErr.details, hint: insertErr.hint }
      : { ok: true, verdict: 'INSERT SUCCEEDED — env vars and Supabase are working' };

    return res.status(200).json(result);
  } catch (err) {
    return res.status(200).json({ ...result, exception: err.message });
  }
}
