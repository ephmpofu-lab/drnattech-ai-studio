import { createClient } from '@supabase/supabase-js';

const N8N_WEBHOOK_URL =
  'https://ephraimmpofu.app.n8n.cloud/webhook/460d3a70-e380-4fa2-8816-0caefe7a9e6c/chat';

function logQuery(sessionId, question, success, responseTimeMs) {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) return;
  const sb = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);
  sb.from('chat_stats').insert({
    session_id: sessionId || 'anonymous',
    question: (question || '').slice(0, 500),
    success,
    response_time_ms: responseTimeMs,
  }).then(() => {}).catch((e) => console.error('log error', e));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionId } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

  const start = Date.now();

  try {
    const upstream = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'sendMessage',
        sessionId: sessionId || 'anonymous',
        chatInput: message.trim(),
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      console.error('n8n error', upstream.status, text);
      logQuery(sessionId, message, false, Date.now() - start);
      return res.status(502).json({ error: 'Agent unavailable' });
    }

    const data = await upstream.json();
    const reply = data?.output ?? data?.text ?? data?.message ?? '';

    if (!reply) {
      logQuery(sessionId, message, false, Date.now() - start);
      return res.status(502).json({ error: 'Empty response from agent' });
    }

    logQuery(sessionId, message, true, Date.now() - start);
    return res.status(200).json({ output: reply });
  } catch (err) {
    console.error('chat proxy error', err);
    logQuery(sessionId, message, false, Date.now() - start);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
