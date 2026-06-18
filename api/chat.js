const N8N_WEBHOOK_URL =
  'https://ephraimmpofu.app.n8n.cloud/webhook/460d3a70-e380-4fa2-8816-0caefe7a9e6c/chat';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, sessionId } = req.body || {};

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message is required' });
  }

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
      return res.status(502).json({ error: 'Agent unavailable' });
    }

    const data = await upstream.json();
    // n8n AI Agent node returns { output: "..." }
    const reply = data?.output ?? data?.text ?? data?.message ?? '';

    if (!reply) {
      return res.status(502).json({ error: 'Empty response from agent' });
    }

    return res.status(200).json({ output: reply });
  } catch (err) {
    console.error('chat proxy error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
