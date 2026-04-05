/**
 * Pure functions for gear ratio, speed ratio, and torque relationships.
 * Gear ratio = driven teeth / driving teeth.
 * Speed: driving RPM / driven RPM = gear ratio (driven spins slower if ratio > 1).
 * Torque: torque ratio is inverse of speed ratio (conservation of power).
 */

/**
 * @param {number} drivingTeeth - Number of teeth on driving gear
 * @param {number} drivenTeeth - Number of teeth on driven gear
 * @returns {{ gearRatio: number, speedRatio: number, torqueRatio: number, drivenRpmFor1Driving: number } | null}
 */
export function calculateGearRelations(drivingTeeth, drivenTeeth) {
  if (
    typeof drivingTeeth !== 'number' ||
    typeof drivenTeeth !== 'number' ||
    drivingTeeth <= 0 ||
    drivenTeeth <= 0 ||
    !Number.isFinite(drivingTeeth) ||
    !Number.isFinite(drivenTeeth)
  ) {
    return null
  }
  const gearRatio = drivenTeeth / drivingTeeth
  const speedRatio = gearRatio
  const torqueRatio = 1 / speedRatio
  const drivenRpmFor1Driving = 1 / gearRatio
  return {
    gearRatio,
    speedRatio,
    torqueRatio,
    drivenRpmFor1Driving,
  }
}

/**
 * Cumulative ratio for a gear train (first gear drives last).
 * @param {number[]} teethPerGear - Teeth count for each gear in order
 * @returns {{ totalRatio: number, outputRpmFactor: number } | null}
 */
export function calculateGearTrain(teethPerGear) {
  if (!Array.isArray(teethPerGear) || teethPerGear.length < 2) return null
  if (teethPerGear.some((t) => typeof t !== 'number' || t <= 0 || !Number.isFinite(t))) return null
  let totalRatio = 1
  for (let i = 0; i < teethPerGear.length - 1; i++) {
    totalRatio *= teethPerGear[i + 1] / teethPerGear[i]
  }
  return {
    totalRatio,
    outputRpmFactor: 1 / totalRatio,
  }
}

const MIN_TEETH_WARN = 17
const MAX_SINGLE_STAGE_RATIO = 6

/**
 * Per-gear RPM (signed for direction) and relative torque on each shaft (vs unit input torque on gear 1).
 * @param {number[]} teethPerGear
 * @param {number} inputRpm - RPM on gear 1
 * @returns {{ rows: { index: number, teeth: number, rpm: number, torqueRelative: number }[] } | null}
 */
export function computeGearTrainAnalysis(teethPerGear, inputRpm) {
  if (!Array.isArray(teethPerGear) || teethPerGear.length < 1) return null
  if (teethPerGear.some((t) => typeof t !== 'number' || t <= 0 || !Number.isFinite(t))) return null
  if (typeof inputRpm !== 'number' || !Number.isFinite(inputRpm) || inputRpm === 0) return null

  const rows = []
  let rpmMag = Math.abs(inputRpm)
  let sign = inputRpm >= 0 ? 1 : -1
  let torqueRel = 1

  for (let i = 0; i < teethPerGear.length; i++) {
    const teeth = teethPerGear[i]
    if (i > 0) {
      rpmMag *= teethPerGear[i - 1] / teeth
      sign = -sign
      torqueRel *= teeth / teethPerGear[i - 1]
    }
    rows.push({
      index: i + 1,
      teeth,
      rpm: rpmMag * sign,
      torqueRelative: torqueRel,
    })
  }
  return { rows }
}

/**
 * Center distance (mm) for a pair of external spur gears with the same module.
 */
export function centerDistanceMm(moduleMm, teeth1, teeth2) {
  if (
    typeof moduleMm !== 'number' ||
    typeof teeth1 !== 'number' ||
    typeof teeth2 !== 'number' ||
    moduleMm <= 0 ||
    teeth1 <= 0 ||
    teeth2 <= 0
  ) {
    return null
  }
  return (moduleMm / 2) * (teeth1 + teeth2)
}

/**
 * Educational warnings (not a substitute for full gear design standards).
 * @param {number[]} teethPerGear
 * @returns {{ type: 'warning' | 'info', message: string }[]}
 */
export function getDesignWarnings(teethPerGear) {
  const warnings = []
  if (!Array.isArray(teethPerGear) || teethPerGear.length < 1) return warnings

  teethPerGear.forEach((t, i) => {
    if (t < MIN_TEETH_WARN) {
      warnings.push({
        type: 'warning',
        message: `Gear ${i + 1} has ${t} teeth — below the common rule-of-thumb minimum (~${MIN_TEETH_WARN}) for standard involute spur gears; undercutting risk increases (educational estimate).`,
      })
    }
  })

  for (let i = 0; i < teethPerGear.length - 1; i++) {
    const a = teethPerGear[i]
    const b = teethPerGear[i + 1]
    const stageRatio = Math.max(a, b) / Math.min(a, b)
    if (stageRatio > MAX_SINGLE_STAGE_RATIO) {
      warnings.push({
        type: 'warning',
        message: `Mesh ${i + 1}→${i + 2}: single-stage ratio ≈ ${stageRatio.toFixed(2)}:1 — unusually high for one pair; consider splitting reduction across more stages (rule of thumb).`,
      })
    }
  }

  return warnings
}

/**
 * Suggest integer tooth pairs (driver, driven) near a target speed ratio N_driven/N_driver.
 * @param {number} targetRatio
 * @param {{ minTeeth?: number, maxTeeth?: number, maxResults?: number }} opts
 */
export function suggestGearPairsForRatio(targetRatio, opts = {}) {
  const minTeeth = opts.minTeeth ?? 8
  const maxTeeth = opts.maxTeeth ?? 120
  const maxResults = opts.maxResults ?? 12
  if (typeof targetRatio !== 'number' || !Number.isFinite(targetRatio) || targetRatio <= 0) return []

  const candidates = []
  for (let driver = minTeeth; driver <= maxTeeth; driver++) {
    const idealDriven = driver * targetRatio
    const driven = Math.round(idealDriven)
    if (driven < minTeeth || driven > maxTeeth) continue
    const actualRatio = driven / driver
    const error = Math.abs(actualRatio - targetRatio)
    candidates.push({ driver, driven, actualRatio, error })
  }
  candidates.sort((a, b) => a.error - b.error || a.driver - b.driver)
  const seen = new Set()
  const out = []
  for (const c of candidates) {
    const key = `${c.driver}:${c.driven}`
    if (seen.has(key)) continue
    seen.add(key)
    out.push(c)
    if (out.length >= maxResults) break
  }
  return out
}
