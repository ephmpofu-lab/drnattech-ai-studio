export default async function handler(req, res) {
  const { code, error } = req.query;

  if (error || !code) {
    // Redirect back to admin — the query param signals an error for future handling
    return res.redirect(302, '/admin?auth_error=' + encodeURIComponent(error || 'no_code'));
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
      return res.redirect(302, '/admin?auth_error=' + encodeURIComponent(data.error_description || 'token_exchange_failed'));
    }

    // Set a first-party same-origin cookie.
    // Because this is a direct server response to the user's own top-level navigation
    // (not a popup), Edge Tracking Prevention does not block it.
    // The /admin page reads this cookie on load and dispatches it to Decap CMS.
    const tokenPayload = encodeURIComponent(
      JSON.stringify({ token: data.access_token, provider: 'github' })
    );
    res.setHeader(
      'Set-Cookie',
      `decap-oauth=${tokenPayload}; Path=/; Secure; SameSite=Lax; Max-Age=120`
    );

    // Redirect directly to admin — no popup communication needed
    return res.redirect(302, '/admin');
  } catch (err) {
    console.error('callback error', err);
    return res.redirect(302, '/admin?auth_error=server_error');
  }
}
