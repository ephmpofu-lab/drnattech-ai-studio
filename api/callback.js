export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error || !code) {
    return res.status(400).send(renderScript('error', error || 'No code received'));
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
      return res.status(401).send(renderScript('error', data.error_description || 'Token exchange failed'));
    }

    return res.status(200).send(renderScript('success', data.access_token));
  } catch (err) {
    return res.status(500).send(renderScript('error', 'Server error during authentication'));
  }
}

function renderScript(status, content) {
  const message =
    status === 'success'
      ? `authorization:github:success:${JSON.stringify({ token: content, provider: 'github' })}`
      : `authorization:github:error:${JSON.stringify({ message: content })}`;

  return `<!DOCTYPE html>
<html>
<head><title>Authenticating...</title></head>
<body>
<script>
(function () {
  function receiveMessage(e) {
    window.opener.postMessage('${message}', e.origin);
  }
  window.addEventListener('message', receiveMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
<\/script>
</body>
</html>`;
}
