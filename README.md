# Mechanical Gear Simulator and Calculator

A web-based educational tool for calculating and visualizing mechanical gear relationships. Built for students in introductory engineering courses who want to explore gear ratio, speed ratio, torque, and how tooth count affects motion.

## Features

- **Simulator** — Enter driving and driven gear tooth counts (8–120 teeth) to compute:
  - Gear ratio, speed ratio, torque ratio
  - Driven RPM at your chosen **driving RPM** (gear 1), not only at 1 RPM
- **Gear train analysis** — Table of each gear’s **teeth, signed RPM, and relative torque** along the train (ideal constant-power model)
- **Design checks** — Educational warnings (low tooth count, extreme single-stage ratio) and optional **module** (mm) for **center distance** between adjacent meshing pairs
- **Reverse calculator** — Enter a target tooth ratio; get suggested integer driver/driven pairs, with **Use for driver / driven** to apply
- **PDF export** — **Download PDF report** bundles inputs, primary-pair calculations, train totals, per-gear analysis table, center distances (when module is set), and design-check notes
- **Live visualization** — Animated meshing gears; supports two gears or a full gear train (add/remove gears)
- **Terminology** — Definitions for gear ratio, speed ratio, torque, and pitch circle
- **Responsive, accessible UI** — React Bootstrap layout, keyboard-friendly forms, skip link, and WCAG-oriented contrast and labels

## Tech stack

- **React 18** + **Vite 5**
- **React Router** (multi-page: Simulator, Terminology, About) with **HashRouter** for static hosting
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
```

## Project structure

```
src/
  components/     # NavBar, GearInputForm, SimulatorOptions, GearTrainTable, DesignWarnings, ReverseRatioPanel, ResultsPanel, GearCanvas, etc.
  context/        # GearStateContext (gears, driving RPM, module)
  data/           # Education content (terminology copy)
  lib/            # gearCalculations.js, gearGeometry.js, pdfExport.js
  pages/          # CalculatorPage, LearnPage, AboutPage
  App.jsx
  main.jsx
  index.css
public/
  vite.svg        # Favicon
```

## Credits

- **Shashwat Ghevde** ([@Shash23](https://github.com/Shash23))
- **Sri Parasaram** ([@sparasaram17](https://github.com/sparasaram17))

CS571 Web Project 10.

## Change history

A detailed list of features and file-level notes is in [CHANGELOG.md](CHANGELOG.md).
