# Gradeum Website

Static-export marketing site for Gradeum Technologies LLC, built with Next.js 14, Tailwind CSS, Framer Motion, and Vercel Analytics.

## Local development

```bash
npm install
npm run dev
```

## Build for static export

```bash
npm run build
```

The export output is written to `out/`.

## Trial lead capture

Set the following public environment variables to post the `/trial` form to a Supabase-backed endpoint:

```bash
NEXT_PUBLIC_SUPABASE_LEAD_ENDPOINT=https://your-project.functions.supabase.co/leads
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

If `NEXT_PUBLIC_SUPABASE_LEAD_ENDPOINT` is not set, the form still reveals the download links for local UI testing.

## Vercel deployment

1. Push this repo to GitHub.
2. In Vercel, create a new project and import the GitHub repository.
3. Keep the framework preset as `Next.js`.
4. Add these production environment variables in Vercel Project Settings:

```bash
NEXT_PUBLIC_SUPABASE_LEAD_ENDPOINT=https://your-project.functions.supabase.co/leads
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-public-anon-key
```

5. Deploy. Vercel will run `npm install` and `npm run build`.
6. In the Vercel domain settings, attach `gradeum.com` and `www.gradeum.com`.
7. Set the apex and `www` DNS records at your domain registrar to the values Vercel provides.

## Supabase lead endpoint expectations

The `/trial` page sends a `POST` request with JSON shaped like this:

```json
{
  "email": "you@firm.com",
  "source": "gradeum-trial-page",
  "capturedAt": "2026-03-26T00:00:00.000Z"
}
```

Your Supabase Edge Function should validate the email and insert it into a `leads` table.

Suggested columns:

- `id` UUID primary key
- `email` text not null
- `source` text not null
- `captured_at` timestamptz not null
- `created_at` timestamptz default `now()`

## Production checklist

- Replace the placeholder trial download URLs in `components/trial-form.tsx`
- Add final legal copy to `/privacy` and `/terms`
- Add your real photos in place of the placeholder media blocks
- Confirm the Supabase Edge Function has CORS enabled for `https://gradeum.com`
