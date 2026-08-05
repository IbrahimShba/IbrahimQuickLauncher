# IbrahimQuickLauncher

A quick-access dashboard for the websites I visit most. I got tired of digging through browser bookmarks, so I built this instead — I add a URL, it grabs the site's icon automatically, and shows it as a clickable tile I can open in one click.

Built for CSCI390: Web Programming.

## Features

- **Dashboard** — favorites section (if I have any) + all my links as cards
- **Add Link** — save a site with a title, URL, and category (auto-adds `https://` if I forget it; I can pick an existing category or make a new one)
- **All Links** — search bar + category filter chips
- **Categories** — each category shown as a card with a link count; click one to jump straight to a filtered All Links view
- **Stats** — total links, total opens, most-opened link, and a breakdown of links per category
- **Settings** —
  - Light/dark theme toggle
  - Custom background image upload
  - Export my links + theme + background as a backup file, and import it back later
  - "Reset Everything" — wipes it back to the 3 starting demo links
- Drag-and-drop reordering — grab the grip handle on a card to move it around
- Every category gets its own consistent color automatically, across the whole app
- Favicons pulled live from Google's free favicon service, no API key needed
- Everything (links, theme, background) is saved automatically in the browser — no backend, no database
- Responsive — collapses into a hamburger menu on small screens

## Tech Stack

- React (built with Vite)
- Plain CSS with CSS variables — no Bootstrap/Tailwind, wrote the design system myself, split into separate files per page/component
- Browser `localStorage` for saving data — no backend

## Setup Instructions

1. Clone the repo:
```bash
   git clone <your-repo-url>
   cd IbrahimQuickLauncher
```
2. Install dependencies:
```bash
   npm install
```
3. Run it locally:
```bash
   npm run dev
```
4. Open the link the terminal gives you (usually `http://localhost:5173`).

## Build for Production

```bash
npm run build
```

## Live Demo

https://ibrahim-quick-launcher.vercel.app

## Screenshots

**Dashboard**
![Dashboard](screenshots/dashboard.png)

**Add Link**
![Add Link](screenshots/add-link.png)

**All Links**
![All Links](screenshots/all-links.png)

**Categories**
![Categories](screenshots/categories.png)

**Stats**
![Stats](screenshots/stats.png)

**Settings — Light Mode**
![Settings Light](screenshots/settings-light.png)

**Settings — Dark Mode**
![Settings Dark](screenshots/settings-dark.png)

## Author

Ibrahim Shbaklo — CSCI390 Web Programming