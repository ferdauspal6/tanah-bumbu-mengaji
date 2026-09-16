import type { APIRoute } from 'astro';

const ADMIN_USER = 'admin';
const ADMIN_PASS = '@Admin123#';
const AUTH_COOKIE = 'tbm_admin_auth';
const SECRET = 'tbm-auth-secret-2026';

function createToken(): string {
  const exp = Date.now() + 30 * 24 * 60 * 60 * 1000;
  const data = `${ADMIN_USER}:${exp}`;
  const sig = btoa(data + SECRET);
  return btoa(data) + '.' + sig;
}

function verifyToken(token: string): boolean {
  try {
    const [dataPart, sig] = token.split('.');
    if (!dataPart || !sig) return false;
    const data = atob(dataPart);
    const expected = btoa(data + SECRET);
    if (sig !== expected) return false;
    const exp = parseInt(data.split(':')[1]);
    return Date.now() < exp;
  } catch {
    return false;
  }
}

function parseCookies(header: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;
  for (const pair of header.split(';')) {
    const [key, ...rest] = pair.split('=');
    if (key) cookies[key.trim()] = rest.join('=').trim();
  }
  return cookies;
}

export const GET: APIRoute = async ({ request }) => {
  const cookies = parseCookies(request.headers.get('cookie'));
  const token = cookies[AUTH_COOKIE];
  if (token && verifyToken(token)) {
    return new Response(JSON.stringify({ authenticated: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return new Response(JSON.stringify({ authenticated: false }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { username, password, remember } = body;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = createToken();
    const maxAge = remember ? 30 * 24 * 60 * 60 : undefined;
    const cookie = `${AUTH_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Lax${maxAge ? `; Max-Age=${maxAge}` : ''}`;
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': cookie,
      },
    });
  }

  return new Response(JSON.stringify({ success: false, error: 'Username atau password salah' }), {
    status: 401,
    headers: { 'Content-Type': 'application/json' },
  });
};
