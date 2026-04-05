import { useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'

export default function ExportPdfButton({
  teethList,
  drivingTeeth,
  drivenTeeth,
  drivingRpm,
  moduleMm,
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const { downloadGearReportPdf } = await import('../lib/pdfExport')
      downloadGearReportPdf({
        teethList,
        drivingTeeth,
        drivenTeeth,
        drivingRpm,
        moduleMm,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      type="button"
      variant="outline-dark"
      className="mb-3"
      onClick={handleClick}
      disabled={loading}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <Spinner animation="border" size="sm" className="me-2" aria-hidden />
          Preparing PDF…
        </>
      ) : (
        'Download PDF report'
      )}
    </Button>
  )
}
