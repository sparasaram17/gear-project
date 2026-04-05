import { useState } from 'react'
import { Form, Button, Card, ListGroup } from 'react-bootstrap'
import { suggestGearPairsForRatio } from '../lib/gearCalculations'

const MIN_T = 8
const MAX_T = 120

export default function ReverseRatioPanel({ onApplyPair }) {
  const [target, setTarget] = useState('3')
  const [suggestions, setSuggestions] = useState(() => suggestGearPairsForRatio(3))

  const runSearch = () => {
    const v = parseFloat(String(target).replace(',', '.'), 10)
    if (Number.isNaN(v) || v <= 0) {
      setSuggestions([])
      return
    }
    setSuggestions(suggestGearPairsForRatio(v))
  }

  return (
    <Card className="mb-4 app-card">
      <Card.Header as="h2">Reverse calculator</Card.Header>
      <Card.Body>
        <p className="text-muted small">
          Enter a target tooth ratio N<sub>driven</sub> / N<sub>driver</sub> (same as overall speed ratio magnitude for one pair). We suggest integer pairs in {MIN_T}–{MAX_T} teeth.
        </p>
        <Form
          className="d-flex flex-wrap gap-2 align-items-end mb-3"
          onSubmit={(e) => {
            e.preventDefault()
            runSearch()
          }}
        >
          <Form.Group>
            <Form.Label htmlFor="target-ratio">Target ratio</Form.Label>
            <Form.Control
              id="target-ratio"
              type="text"
              inputMode="decimal"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              aria-describedby="target-ratio-desc"
              style={{ maxWidth: '8rem' }}
            />
            <Form.Text id="target-ratio-desc" className="text-muted">
              e.g. 3 for about 3:1 reduction
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="primary">
            Find pairs
          </Button>
        </Form>
        {suggestions.length > 0 && (
          <ListGroup variant="flush">
            {suggestions.map((s) => (
              <ListGroup.Item
                key={`${s.driver}-${s.driven}`}
                className="d-flex justify-content-between align-items-center flex-wrap gap-2"
              >
                <span>
                  {s.driver} : {s.driven} teeth → ratio {s.actualRatio.toFixed(4)} (error {s.error.toFixed(4)})
                </span>
                {onApplyPair && (
                  <Button
                    type="button"
                    size="sm"
                    variant="outline-primary"
                    onClick={() => onApplyPair(s.driver, s.driven)}
                  >
                    Use for driver / driven
                  </Button>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card.Body>
    </Card>
  )
}
