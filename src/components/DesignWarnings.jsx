import { Alert, Card } from 'react-bootstrap'
import { getDesignWarnings, centerDistanceMm } from '../lib/gearCalculations'

export default function DesignWarnings({ teethList, moduleMm }) {
  const warnings = getDesignWarnings(teethList)
  const distances = []
  if (typeof moduleMm === 'number' && moduleMm > 0 && teethList.length >= 2) {
    for (let i = 0; i < teethList.length - 1; i++) {
      const d = centerDistanceMm(moduleMm, teethList[i], teethList[i + 1])
      if (d != null) {
        distances.push({
          label: `G${i + 1}–G${i + 2}`,
          mm: d,
        })
      }
    }
  }

  if (!warnings.length && !distances.length) {
    return null
  }

  return (
    <Card className="mb-4 app-card">
      <Card.Header as="h2">Design checks</Card.Header>
      <Card.Body>
        <p className="text-muted small mb-2">
          Educational rule-of-thumb checks only — not a substitute for full standards or manufacturing data.
        </p>
        {warnings.map((w, i) => (
          <Alert key={i} variant={w.type === 'warning' ? 'warning' : 'info'} className="py-2 mb-2">
            {w.message}
          </Alert>
        ))}
        {distances.length > 0 && (
          <div className="mt-2">
            <h3 className="h6">Center distance (same module, mm)</h3>
            <ul className="mb-0">
              {distances.map((d) => (
                <li key={d.label}>
                  {d.label}: {d.mm.toFixed(3)} mm (a = m/2 × (N₁ + N₂))
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card.Body>
    </Card>
  )
}
