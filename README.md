# Mechanical Gear Simulator and Calculator

A web-based educational tool for calculating and visualizing mechanical gear relationships. Built for students in introductory engineering courses who want to explore gear ratio, speed ratio, torque, and how tooth count affects motion.

## Features

- **Simulator** — Enter driving and driven gear tooth counts (8–120 teeth) to compute:
  - Gear ratio
  - Speed ratio
  - Torque ratio
  - Output speed (e.g., driven RPM when input is 1 RPM)
- **Live visualization** — Animated meshing gears that rotate according to the calculated ratios. Supports two gears or a full gear train (add/remove gears).
- **Terminology** — Definitions and explanations for gear ratio, speed ratio, torque, and pitch circle so you can interpret results and apply them to gear system design.
- **Responsive, accessible UI** — React Bootstrap layout, keyboard-friendly forms, skip link, and WCAG-oriented contrast and labels.

## Tech stack

- **React 18** + **Vite 5**
- **React Router** (multi-page: Simulator, Terminology, About)
- **React Bootstrap** (layout, forms, cards, nav)
- No backend — all calculation and animation run in the browser.

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm (included with Node)

### Install and run

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Deploy to GitHub Pages (repo must be named gear-project)
npm run deploy
```

**Live site:** [https://Shash23.github.io/gear-project](https://Shash23.github.io/gear-project)

To publish: rename the GitHub repo to `gear-project`, run `npm run deploy`, then in the repo **Settings → Pages** set **Source** to **Deploy from branch**, **Branch** to `gh-pages`, **Folder** to `/ (root)`.

## Project structure

```
src/
  components/     # NavBar, GearInputForm, ResultsPanel, GearCanvas, etc.
  context/        # GearStateContext (shared gear/input state)
  data/           # Education content (terminology copy)
  lib/             # gearCalculations.js, gearGeometry.js
  pages/           # CalculatorPage, LearnPage, AboutPage
  App.jsx
  main.jsx
  index.css
```

## Credits

- **Shashwat Ghevde** ([@Shash23](https://github.com/Shash23))
- **Sri Parasaram** ([@sparasaram17](https://github.com/sparasaram17))

CS571 Web Project 10.
