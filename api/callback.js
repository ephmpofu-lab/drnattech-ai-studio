export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error || !code) {
    return res.status(400).send(renderPage('error', error || 'No code received'));
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenRes.json();

    if (data.error || !data.access_token) {
      return res.status(401).send(renderPage('error', data.error_description || 'Token exchange failed'));
    }

    // Set a first-party same-origin cookie as the most reliable fallback.
    // This is NOT affected by Edge tracking prevention because it is set in a
    // first-party response (the popup is visiting dr-ephraim-mpofu.com/api/callback).
    const tokenPayload = encodeURIComponent(
      JSON.stringify({ token: data.access_token, provider: 'github' })
    );
    res.setHeader(
      'Set-Cookie',
      `decap-oauth=${tokenPayload}; Path=/; Secure; SameSite=Lax; Max-Age=120`
    );

    return res.status(200).send(renderPage('success', data.access_token));
  } catch (err) {
    return res.status(500).send(renderPage('error', 'Server error during authentication'));
  }
}

function renderPage(status, content) {
  const isSuccess = status === 'success';
  const cmsMsgData = isSuccess
    ? { token: content, provider: 'github' }
    : { message: content };
  const cmsMsg = `authorization:github:${status}:${JSON.stringify(cmsMsgData)}`;
  const tokenJson = isSuccess
    ? JSON.stringify({ token: content, provider: 'github' })
    : null;

  return `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body style="background:#050816;margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
<p id="s" style="color:#A3A3B2;font-size:14px;">Completing authentication…</p>
<script>
(function () {
  var msg = ${JSON.stringify(cmsMsg)};

  // Path 1: standard popup — opener reachable (no COOP interference)
  if (window.opener && window.opener !== window) {
    try {
      window.addEventListener('message', function receiveMessage(e) {
        window.opener.postMessage(msg, e.origin);
      }, false);
      window.opener.postMessage('authorizing:github', '*');
      return;
    } catch (ignore) {}
  }

  ${isSuccess ? `
  // Path 2: BroadcastChannel — same-origin event messaging, NOT blocked by
  // Edge Tracking Prevention (unlike localStorage which is classified as storage).
  try {
    var bc = new BroadcastChannel('decap-cms-oauth');
    bc.postMessage(${JSON.stringify(cmsMsgData)});
    bc.close();
    document.getElementById('s').textContent = 'Authenticated — you may close this window.';
    document.getElementById('s').style.color = '#22c55e';
  } catch (bcErr) {}

  // Path 3: localStorage — fallback for Chrome / Firefox / Edge without strict tracking prevention
  try {
    localStorage.setItem('decap-cms-oauth-token', ${JSON.stringify(tokenJson)});
  } catch (e) {}

  // Path 4: redirect popup to /admin so it can read the server-set cookie on load.
  // This handles the case where both BroadcastChannel and localStorage are blocked.
  setTimeout(function () {
    window.location.replace('/admin');
  }, 1200);
  ` : `
  document.getElementById('s').style.color = '#ef4444';
  document.getElementById('s').textContent = ${JSON.stringify('Authentication failed: ' + content)};
  `}
})();
<\/script>
</body>
</html>`;
}
