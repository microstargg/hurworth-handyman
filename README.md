# Hurworth Handyman

A simple single-page website for Hurworth Handyman — handyman repairs, rental property upkeep, and renovation project management.

## Stack

- **Next.js** (App Router) + TypeScript + Tailwind CSS
- **Neon Postgres** for contact form submissions
- **Vercel** for hosting

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and add your Neon connection string:

   ```bash
   cp .env.example .env.local
   ```

   Set `DATABASE_URL` to your Neon Postgres connection string.

3. Run the database migration in the [Neon SQL editor](https://console.neon.tech) or via the Neon CLI:

   ```sql
   -- See db/migrations/001_contact_enquiries.sql
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Contact form

Submissions are stored in the `contact_enquiries` table in Neon. View them in the Neon dashboard (SQL editor or table browser).

Each submission is also emailed to `CONTACT_EMAIL_TO` (default `ben@hurworthhandyman.com`) via [Resend](https://resend.com), with Reply-To set to the customer so you can answer straight from your inbox. The sending domain in `CONTACT_EMAIL_FROM` must be verified in Resend. If email isn't configured or fails, the enquiry is still saved. No email, phone, or address is shown on the public site.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new).
3. Install the **Neon** integration from the Vercel Marketplace — it auto-provisions `DATABASE_URL`.
4. Run the migration SQL against your production Neon database.
5. Deploy.

## Environment variables

| Variable       | Description                          |
| -------------- | ------------------------------------ |
| `DATABASE_URL` | Neon Postgres connection string (server-only) |
| `RESEND_API_KEY` | Resend API key (server-only) |
| `CONTACT_EMAIL_FROM` | Sender, e.g. `Hurworth Handyman Website <enquiries@hurworthhandyman.com>` — domain must be verified in Resend |
| `CONTACT_EMAIL_TO` | Optional recipient, defaults to `ben@hurworthhandyman.com` |
