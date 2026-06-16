export default function handler(req, res) {
  const { host } = req.headers;
  const protocol = host && host.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}`;
  const redirectUri = `${baseUrl}/api/callback`;

  const params = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID || '',
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state: Math.random().toString(36).substring(2, 10),
  });

  res.redirect(`https://github.com/login/oauth/authorize?${params.toString()}`);
}
