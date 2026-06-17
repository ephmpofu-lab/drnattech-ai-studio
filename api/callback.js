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
  // Stored as a JSON string so the admin tab can JSON.parse it
  const localStorageValue = isSuccess
    ? JSON.stringify(JSON.stringify({ token: content, provider: 'github' }))
    : null;

  return `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body style="background:#050816;margin:0;display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;">
<p id="s" style="color:#A3A3B2;font-size:14px;">Completing authentication…</p>
<script>
(function () {
  var msg = ${JSON.stringify(cmsMsg)};

  // Path 1: standard popup — opener is reachable
  if (window.opener && window.opener !== window) {
    try {
      window.addEventListener('message', function receiveMessage(e) {
        window.opener.postMessage(msg, e.origin);
      }, false);
      window.opener.postMessage('authorizing:github', '*');
      return;
    } catch (ignore) {}
  }

  // Path 2: COOP-restricted — window.opener is null
  // Write token to localStorage; the admin tab storage listener picks it up
  ${isSuccess
    ? `try {
    localStorage.setItem('decap-cms-oauth-token', ${localStorageValue});
    document.getElementById('s').textContent = 'Authenticated — you may close this window.';
    document.getElementById('s').style.color = '#22c55e';
  } catch(e) {
    document.getElementById('s').textContent = 'Auth error: could not store token.';
    document.getElementById('s').style.color = '#ef4444';
  }`
    : `document.getElementById('s').style.color = '#ef4444';
  document.getElementById('s').textContent = ${JSON.stringify('Authentication failed: ' + content)};`
  }

  // Try to close; fall back to redirecting to admin
  setTimeout(function() {
    try { window.close(); } catch(e) {}
    setTimeout(function() { window.location.replace('/admin'); }, 400);
  }, 1000);
})();
<\/script>
</body>
</html>`;
}
