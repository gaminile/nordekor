# Nordekor

Familjeföretagets sajt. Stuckatur, fasader, brandtätning. Hantverk sedan 1986.

## Lokal utveckling (om du vill köra på din dator)

Kräver Node.js installerat.

```bash
npm install
npm run dev
```

Sedan öppnar du `http://localhost:5173` i webbläsaren.

## Deploy

Sajten deployas via Vercel som är kopplad till detta GitHub-repo. Varje push till `main`-grenen byggs och publiceras automatiskt.

## Struktur

- `src/App.jsx` – Hela sajten (alla 5 sidor)
- `src/main.jsx` – Entry point
- `src/index.css` – Tailwind base
- `public/logo.jpg` – Logotyp (lockup, terracotta)
- `index.html` – HTML-skal + meta

## Att uppdatera

Ändra i `src/App.jsx` eller filer i `public/`. Pusha till `main` och Vercel deployar automatiskt inom 30 sekunder.
