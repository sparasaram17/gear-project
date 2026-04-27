# Live Website: [https://sparasaram17.github.io/gear-project/](https://sparasaram17.github.io/gear-project/)

# Mechanical Gear Simulator and Calculator

Web-based educational tool for introductory engineering students to model, visualize, and compare gear setups.

## Quick Links

- [Live Website](https://sparasaram17.github.io/gear-project/)
- [Change History](CHANGELOG.md)
- [Project Description](project_description.md)

## What This Project Includes

- **Task-based pages:** `Simulator`, `Analyze`, `Compare`, `Learn`, and `About`.
- **Core calculations:** gear ratio, speed ratio, torque factor, driven RPM.
- **Multi-gear train support:** add/remove gears and compute cumulative behavior.
- **Engineering analysis:** train table, design checks, module-based spacing, and efficiency/loss model.
- **A/B comparison workflow:** save setups, compare deltas, and apply saved setups back to simulator.
- **PDF export:** downloadable report of inputs and computed outputs.
- **Accessibility support:** labeled inputs, keyboard-friendly forms, skip link, and WCAG-oriented contrast updates.

## Tech Stack

- `React 18`
- `Vite 5`
- `react-router-dom` (HashRouter for GitHub Pages)
- `react-bootstrap` + `bootstrap`
- `jsPDF` + `jspdf-autotable`

## Local Development

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Run Locally

```bash
npm install
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

This project is deployed to GitHub Pages at:

- [https://sparasaram17.github.io/gear-project/](https://sparasaram17.github.io/gear-project/)

Useful scripts:

- `npm run deploy:gear` - build and publish to `gh-pages` for the `gear` remote
- `npm run push:all` - push `main` to both `origin` and `gear`
- `npm run ship` - push both remotes, then deploy GitHub Pages

`vite.config.js` uses `base: '/gear-project/'` to match GitHub Pages hosting.

## Repository Structure

```text
src/
  components/   Reusable UI (forms, tables, cards, nav, visualization, compare)
  context/      Shared simulator state and setup persistence
  data/         Learning content
  lib/          Gear math, geometry, and PDF export logic
  pages/        CalculatorPage, AnalyzePage, ComparePage, LearnPage, AboutPage
public/
  vite.svg
```

## Team

- Shashwat Ghevde ([@Shash23](https://github.com/Shash23))
- Sri Parasaram ([@sparasaram17](https://github.com/sparasaram17))

CS571 Web Project 10

## Accessibility Notes

- Keyboard-friendly forms and controls
- Skip-to-content link
- Labeled inputs with helper descriptions
- Contrast-oriented styling updates for WCAG AA readability goals
