# AccessAudit

Next.js 14 demo for requesting professional website accessibility audits.

## Setup
1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` and fill in the values.
4. Run `npm run dev`.

## Supabase
Run the following SQL in Supabase SQL Editor:

```sql
create table public.audit_orders (
  id uuid primary key default gen_random_uuid(),
  website_url text not null,
  payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'failed')),
  audit_status text not null default 'pending'
    check (audit_status in ('pending', 'completed')),
  created_at timestamptz not null default now()
);
alter table public.audit_orders enable row level security;
create index audit_orders_created_at_idx on public.audit_orders (created_at desc);
```

The app uses the Supabase service-role key only in server-side code. Never expose it through a `NEXT_PUBLIC_` variable or commit it to Git.

## Vercel environment variables
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` (Secret)
- `ADMIN_PASSWORD` (Secret)
- `ADMIN_SESSION_SECRET` (Secret, at least 32 characters)
- `DEMO_PAYMENTS=true` (Plaintext)
- `NEXT_PUBLIC_APP_URL` (your deployed URL)

## Important demo limitations
- The homepage report is simulated; no website is scanned.
- Checkout is a simulation and does not collect money.
- The admin page is protected by a password and signed HTTP-only session cookie.
- Before accepting money, integrate a payment provider with server-side transaction initialization and verified webhooks. Do not treat a browser callback as proof of payment.
- A manual audit does not guarantee legal compliance or constitute legal advice. EAA scope, enforcement, and penalties vary by jurisdiction.
