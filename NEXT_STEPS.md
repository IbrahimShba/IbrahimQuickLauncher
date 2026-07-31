# What's left to do

Everything on the coding side is done (6 pages, theming, drag-and-drop, export/import, reset). What's left is packaging and submitting.

## 1. Git + GitHub

Open your project folder in VS Code, switch your terminal to Command Prompt (not PowerShell), then:

```
git init
git add .
git commit -m "Initial commit: working URL launcher with 6 pages"
```

Create a new empty repository on GitHub (no README, no .gitignore — you already have your own), then:

```
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

Make 2-3 more small commits as you go (e.g. after adding screenshots, after final tweaks) so your commit history shows real progress, not just one commit.

## 2. Deploy (Vercel)

1. Go to vercel.com, sign in with GitHub
2. "New Project" → select your repo
3. Leave settings as default (Vercel auto-detects Vite) → Deploy
4. Copy the live URL into your README under "Live Demo"

## 3. Screenshots

Once deployed (or just running locally with `npm run dev`), take one screenshot of each of the 6 pages and add them to the README under "Screenshots." Include at least one screenshot in both light and dark theme to show that feature off.

## 4. Project Report PDF

Structure to follow:
- Title page — project name, your name, ID, course, date
- Abstract — what the app does, 3-4 sentences
- System design — the 6 pages, and how the shared `useLinks` hook keeps them all in sync
- Technologies used — React, Vite, localStorage, plain CSS
- Code snippets — 2-3 short pieces (favicon URL trick, category color hash, drag-and-drop reorder)

## 5. Contribution statement

Already done (`CONTRIBUTION.md`) — solo, 100% of the work.

## 6. Submit

Report PDF + GitHub repo link, via Google Classroom, by Thursday, August 6, 2026.
