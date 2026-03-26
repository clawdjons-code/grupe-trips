# 🌴 Grupe Trip Planner

A family/group trip planning web app built with **Next.js 15**, **Tailwind CSS**, **Leaflet.js**, and **Supabase**.

## Features

- 📋 **Overview** — Trip summary, stats, and full itinerary timeline
- 📅 **Calendar** — Day-by-day trip schedule grouped by date
- 🗺️ **Map** — Interactive Leaflet map with accommodation pins + popups
- 🏠 **Stays** — Cards for each accommodation with guests and booking links

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Maps | Leaflet.js + OpenStreetMap |
| Calendar | Custom timeline view |
| Backend | Supabase (auth + Postgres) |

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd grupe-trips
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your **Project URL** and **anon/public key** from Settings → API
3. Copy `.env.local.example` → `.env.local` and paste your values:

```bash
cp .env.local.example .env.local
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sample Data

The app ships with hardcoded sample data for a **Florida Gulf Coast Family Reunion (July 4–12, 2026)**:

- 3 accommodations around Clearwater Beach / Indian Rocks / St. Pete Beach
- 11 events (activities, meals, transport)

Edit `app/lib/sampleData.ts` to customize.

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add env vars in Vercel dashboard or:
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Supabase Schema (planned)

```sql
-- trips
create table trips (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  start_date date not null,
  end_date date not null,
  location text,
  description text,
  created_at timestamptz default now()
);

-- accommodations
create table accommodations (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id),
  name text not null,
  address text,
  lat float,
  lng float,
  check_in date,
  check_out date,
  guests text[],
  booking_url text
);

-- trip_events
create table trip_events (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references trips(id),
  title text not null,
  date date not null,
  end_date date,
  location text,
  description text,
  type text check (type in ('activity', 'meal', 'transport', 'accommodation'))
);
```

## License

MIT — use it, fork it, share the beach vibes. 🏖️
