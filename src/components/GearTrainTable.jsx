import { Table, Card } from 'react-bootstrap'
import { computeGearTrainAnalysis } from '../lib/gearCalculations'

export default function GearTrainTable({ teethList, inputRpm }) {
  const analysis = computeGearTrainAnalysis(teethList, inputRpm)
  if (!analysis || !analysis.rows.length) {
    return null
  }

  return (
    <Card className="mb-4 app-card">
      <Card.Header as="h2">Gear train analysis</Card.Header>
      <Card.Body className="p-0">
        <Table responsive hover className="mb-0">
          <caption className="px-3 pt-2">
            RPM signed for direction (external mesh alternates). Torque is relative to unit input torque on gear 1 (ideal, constant power).
          </caption>
          <thead>
            <tr>
              <th scope="col">Gear</th>
              <th scope="col">Teeth</th>
              <th scope="col">RPM</th>
              <th scope="col">Torque (rel.)</th>
            </tr>
          </thead>
          <tbody>
            {analysis.rows.map((row) => (
              <tr key={row.index}>
                <td>G{row.index}</td>
                <td>{row.teeth}</td>
                <td>{row.rpm.toFixed(4)}</td>
                <td>{row.torqueRelative.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  )
}
