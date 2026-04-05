# Changelog

All notable changes to this project are documented here. The app is **Mechanical Gear Simulator and Calculator** (CS571 Web Project 10).

---

## [Unreleased] — Recent work

### Added

- **PDF export** ([`src/lib/pdfExport.js`](src/lib/pdfExport.js), [`src/components/ExportPdfButton.jsx`](src/components/ExportPdfButton.jsx))
  - Button: **Download PDF report** (below calculation results on the simulator page).
  - Report includes: timestamp, inputs (teeth train, primary pair, driving RPM, module), primary-pair calculations, overall train ratio (when applicable), per-gear analysis table, center distances (when module is set), design-check messages, educational disclaimer.
  - Uses **jsPDF** + **jspdf-autotable**; PDF module is **lazy-loaded** on first click to keep the main bundle smaller.

### Dependencies

- `jspdf`, `jspdf-autotable` (PDF generation).

---

## Earlier milestones (summary)

### Engineering / simulator features

| Area | What changed |
|------|----------------|
| **Gear train analysis** | [`computeGearTrainAnalysis`](src/lib/gearCalculations.js) — per-gear RPM (signed) and relative torque; [`GearTrainTable`](src/components/GearTrainTable.jsx). |
| **Simulation options** | [`GearStateContext`](src/context/GearStateContext.jsx): `drivingRpm`, `moduleMm`; [`SimulatorOptions`](src/components/SimulatorOptions.jsx). |
| **Design checks** | [`getDesignWarnings`](src/lib/gearCalculations.js), [`centerDistanceMm`](src/lib/gearCalculations.js); [`DesignWarnings`](src/components/DesignWarnings.jsx). |
| **Reverse calculator** | [`suggestGearPairsForRatio`](src/lib/gearCalculations.js); [`ReverseRatioPanel`](src/components/ReverseRatioPanel.jsx) with “Use for driver / driven”. |
| **Results** | [`ResultsPanel`](src/components/ResultsPanel.jsx) shows driven RPM at the configured driving RPM (not only 1 RPM). |

### UI / UX

- Simulator layout: **Live visualization** first, then inputs, options, reverse calculator, train table, design checks, results, PDF button.
- **Gray metallic-style** gears on canvas (no drop shadow under gears, per design iteration).
- **Text inputs** for driving/driven teeth (typed values, not only spinners).
- **Professional styling** in [`index.css`](src/index.css) (Plus Jakarta Sans, theme, cards).

### Routing & hosting

- **HashRouter** ([`main.jsx`](src/main.jsx)) for GitHub Pages compatibility.
- **Vite `base`**: set to match the GitHub Pages project path (e.g. `/gear-project/` for `https://<user>.github.io/gear-project/`).
- **`gh-pages`** deploy scripts in [`package.json`](package.json): `predeploy`, `deploy`.
- **Favicon**: [`public/vite.svg`](public/vite.svg).

### Project hygiene

- [`.gitignore`](.gitignore) for `node_modules/`, `dist/`, env files, etc.; optional local-only folder `docs/` ignored if used for private notes.

---

## File map (key additions)

| File | Role |
|------|------|
| `src/lib/gearCalculations.js` | Core math: ratios, train, analysis, warnings, reverse suggestions |
| `src/lib/gearGeometry.js` | Canvas layout for meshing gears |
| `src/lib/pdfExport.js` | PDF report generation |
| `src/context/GearStateContext.jsx` | Shared gear teeth, RPM, module |
| `src/pages/CalculatorPage.jsx` | Main simulator page composition |
| `src/components/ExportPdfButton.jsx` | PDF download trigger |

---

For setup, deploy, and credits, see [`README.md`](README.md).
