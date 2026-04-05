import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import {
  calculateGearRelations,
  calculateGearTrain,
  computeGearTrainAnalysis,
  centerDistanceMm,
  getDesignWarnings,
} from './gearCalculations'

function fmt(n, decimals = 4) {
  if (typeof n !== 'number' || !Number.isFinite(n)) return '—'
  return Number.isInteger(n) && decimals === 0 ? String(n) : n.toFixed(decimals)
}

/**
 * Build and download a PDF report with inputs and all main calculations.
 * @param {{
 *   teethList: number[],
 *   drivingTeeth: number,
 *   drivenTeeth: number,
 *   drivingRpm: number,
 *   moduleMm: number,
 * }} params
 */
export function downloadGearReportPdf(params) {
  const { teethList, drivingTeeth, drivenTeeth, drivingRpm, moduleMm } = params

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const margin = 14
  let y = 18

  doc.setFontSize(16)
  doc.text('Mechanical Gear Simulator — Report', margin, y)
  y += 8
  doc.setFontSize(10)
  doc.setTextColor(80)
  doc.text(`Generated: ${new Date().toLocaleString()}`, margin, y)
  doc.setTextColor(0)
  y += 10

  doc.setFontSize(12)
  doc.text('Inputs', margin, y)
  y += 6
  doc.setFontSize(10)
  const teethStr = teethList.map((t, i) => `G${i + 1}: ${t}`).join(', ')
  doc.text(`Teeth (train): ${teethStr}`, margin, y)
  y += 5
  doc.text(`Primary pair (driver / driven): ${drivingTeeth} / ${drivenTeeth}`, margin, y)
  y += 5
  doc.text(`Driving RPM (gear 1): ${fmt(drivingRpm, 4)}`, margin, y)
  y += 5
  doc.text(`Module m: ${fmt(moduleMm, 3)} mm`, margin, y)
  y += 10

  const rel = calculateGearRelations(drivingTeeth, drivenTeeth)
  doc.setFontSize(12)
  doc.text('Primary pair calculations', margin, y)
  y += 6
  doc.setFontSize(10)
  if (rel) {
    const drivenAtInput =
      typeof drivingRpm === 'number' && Number.isFinite(drivingRpm) && drivingRpm !== 0
        ? drivingRpm * (drivingTeeth / drivenTeeth)
        : null
    const lines = [
      `Gear ratio (N_driven / N_driver): ${fmt(rel.gearRatio)}`,
      `Speed ratio: ${fmt(rel.speedRatio)}`,
      `Torque ratio (T_out / T_in vs speed): ${fmt(rel.torqueRatio)}`,
      `Driven RPM at 1 RPM input: ${fmt(rel.drivenRpmFor1Driving)}`,
    ]
    if (drivenAtInput != null) {
      lines.push(`Driven RPM at ${fmt(drivingRpm, 2)} RPM input: ${fmt(drivenAtInput, 4)}`)
    }
    lines.forEach((line) => {
      doc.text(line, margin, y)
      y += 5
    })
  } else {
    doc.text('Could not compute primary pair (invalid teeth).', margin, y)
    y += 5
  }
  y += 5

  if (teethList.length >= 2) {
    const train = calculateGearTrain(teethList)
    if (train) {
      doc.setFontSize(12)
      doc.text('Gear train (overall)', margin, y)
      y += 6
      doc.setFontSize(10)
      doc.text(`Total ratio (product of stage ratios): ${fmt(train.totalRatio)}`, margin, y)
      y += 5
      doc.text(`Output RPM factor vs gear 1: ${fmt(train.outputRpmFactor)}`, margin, y)
      y += 8
    }
  }

  const analysis = computeGearTrainAnalysis(teethList, drivingRpm)
  if (analysis && analysis.rows.length) {
    doc.setFontSize(12)
    doc.text('Gear train analysis (per gear)', margin, y)
    y += 2
    autoTable(doc, {
      startY: y + 4,
      head: [['Gear', 'Teeth', 'RPM', 'Torque (rel.)']],
      body: analysis.rows.map((r) => [
        `G${r.index}`,
        String(r.teeth),
        fmt(r.rpm),
        fmt(r.torqueRelative),
      ]),
      margin: { left: margin, right: margin },
      styles: { fontSize: 9 },
      headStyles: { fillColor: [15, 118, 110] },
    })
    y = (doc.lastAutoTable?.finalY ?? y) + 8
  }

  if (typeof moduleMm === 'number' && moduleMm > 0 && teethList.length >= 2) {
    const distRows = []
    for (let i = 0; i < teethList.length - 1; i++) {
      const d = centerDistanceMm(moduleMm, teethList[i], teethList[i + 1])
      if (d != null) {
        distRows.push([`G${i + 1}–G${i + 2}`, `${fmt(d, 3)} mm`])
      }
    }
    if (distRows.length) {
      doc.setFontSize(12)
      doc.text('Center distance (a = m/2 × (N1 + N2))', margin, y)
      y += 2
      autoTable(doc, {
        startY: y + 4,
        head: [['Pair', 'Center distance']],
        body: distRows,
        margin: { left: margin, right: margin },
        styles: { fontSize: 9 },
        headStyles: { fillColor: [71, 85, 105] },
      })
      y = (doc.lastAutoTable?.finalY ?? y) + 8
    }
  }

  const warnings = getDesignWarnings(teethList)
  if (warnings.length) {
    if (y > 250) {
      doc.addPage()
      y = 20
    }
    doc.setFontSize(12)
    doc.text('Design checks (educational)', margin, y)
    y += 6
    doc.setFontSize(9)
    warnings.forEach((w) => {
      const wrapped = doc.splitTextToSize(w.message, pageW - 2 * margin)
      wrapped.forEach((line) => {
        if (y > 280) {
          doc.addPage()
          y = 20
        }
        doc.text(line, margin, y)
        y += 4
      })
      y += 2
    })
  }

  y += 4
  if (y > 270) {
    doc.addPage()
    y = 20
  }
  doc.setFontSize(8)
  doc.setTextColor(120)
  doc.text(
    'Educational tool only — not for manufacturing or certification. Assumes ideal meshing and constant power.',
    margin,
    y,
    { maxWidth: pageW - 2 * margin },
  )

  doc.save(`gear-simulator-report-${Date.now()}.pdf`)
}
