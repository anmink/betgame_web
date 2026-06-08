# betgame-web

Web-Frontend für das Betgame-Sportwettspiel — entwickelt mit Vue 3 und TypeScript. Nutzer können sich einloggen, anstehende Fußballspiele durchsuchen, Wetten auf Spielausgänge platzieren und ihre Wetthistorie sowie ihren Kontostand einsehen.

Verbindet sich mit dem [backend_betgame](https://github.com/anmink/backend_betgame) FastAPI-REST-Backend.

---

## Tech Stack

| Bereich | Technologie |
|---|---|
| Framework | Vue 3 (Composition API) |
| Sprache | TypeScript (strict) |
| Build-Tool | Vite |
| State Management | Pinia |
| Routing | Vue Router |
| HTTP-Client | Axios |
| Styling | Tailwind CSS v4 |
| Tests | Vitest · @vue/test-utils |
| Linting | ESLint · OXLint |
| Formatierung | Prettier |
| CI/CD | GitHub Actions |

---

## Features

- **Authentifizierung** — Login und Registrierung mit JWT-Token-Verwaltung über Axios-Interceptors
- **Spielübersicht** — Liste anstehender Fußball-Fixtures mit aktuellen Quoten
- **Wetten platzieren** — Ergebnis wählen (Heim / Unentschieden / Auswärts), Einsatz eingeben
- **Wetthistorie** — Übersicht aller platzierten Wetten mit Status und Ergebnis
- **Kontostand** — Guthaben live im Header
- **Typsicherheit** — Vollständig typisierte Komponenten, Stores und API-Schicht mit TypeScript strict mode

---

## Projektstruktur

```
betgame_web/
├── src/
│   ├── components/       # Wiederverwendbare Vue-Komponenten
│   ├── views/            # Seiten-Komponenten (Matches, Bets, Login, ...)
│   ├── stores/           # Pinia Stores (Auth, Matches, Bets)
│   ├── services/         # Axios API-Client mit Interceptors
│   ├── types/            # TypeScript-Interfaces und -Types
│   ├── composables/      # Wiederverwendbare Composition Functions
│   └── router/           # Vue Router Konfiguration
├── .github/workflows/    # GitHub Actions CI-Pipeline
├── public/
├── index.html
├── vite.config.ts
├── vitest.config.ts
└── tsconfig.json
```

---

## Schnellstart

### Voraussetzungen

- Node.js 20.19+ oder 22.12+
- Laufendes [backend_betgame](https://github.com/anmink/backend_betgame)

### Lokale Einrichtung

```bash
# Repository klonen
git clone https://github.com/anmink/betgame_web.git
cd betgame_web

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die App läuft unter `http://localhost:5173`.

### Produktions-Build

```bash
npm run build
```

---

## Verfügbare Befehle

| Befehl | Beschreibung |
|---|---|
| `npm run dev` | Entwicklungsserver mit Hot-Reload starten |
| `npm run build` | TypeScript-Check + Produktions-Build |
| `npm run test:unit` | Unit-Tests mit Vitest ausführen |
| `npm run lint` | OXLint + ESLint ausführen (mit Auto-Fix) |
| `npm run format` | Code mit Prettier formatieren |
| `npm run type-check` | TypeScript-Typen prüfen (ohne Build) |

---

## CI/CD

Jeder Push auf `main` löst eine GitHub Actions Pipeline aus, die:

1. TypeScript-Typen prüft (`vue-tsc --build`)
2. Unit-Tests ausführt (`vitest run`)
3. Einen Produktions-Build validiert (`vite build`)

---

## Verwandte Repositories

- **Backend:** [backend_betgame](https://github.com/anmink/backend_betgame) — FastAPI · PostgreSQL · Docker · GitHub Actions

---

## Status

In aktiver Entwicklung.
