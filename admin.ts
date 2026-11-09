import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE = 'aa_admin';
function secret() {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value || value.length < 32) throw new Error('ADMIN_SESSION_SECRET must contain at least 32 characters.');
  return value;
}
export function createAdminToken() {
  const payload = Buffer.from(JSON.stringify({ admin: true, exp: Date.now() + 1000 * 60 * 60 * 12 })).toString('base64url');
  const sig = createHmac('sha256', secret()).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}
export function validAdminToken(token?: string) {
  if (!token) return false;
  try {
    const [payload, signature] = token.split('.');
    if (!payload || !signature) return false;
    const expected = createHmac('sha256', secret()).update(payload).digest();
    const actual = Buffer.from(signature, 'base64url');
    if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) return false;
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return data.admin === true && data.exp > Date.now();
  } catch { return false; }
}
export { COOKIE };
