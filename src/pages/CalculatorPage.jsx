import { useGearState } from '../context/GearStateContext'
import PageLayout from '../components/PageLayout'
import GearInputForm from '../components/GearInputForm'
import SimulatorOptions from '../components/SimulatorOptions'
import ResultsPanel from '../components/ResultsPanel'
import GearCanvas from '../components/GearCanvas'
import GearTrainTable from '../components/GearTrainTable'
import DesignWarnings from '../components/DesignWarnings'
import ReverseRatioPanel from '../components/ReverseRatioPanel'
import ExportPdfButton from '../components/ExportPdfButton'

export default function CalculatorPage() {
  const {
    drivingTeeth,
    setDrivingTeeth,
    drivenTeeth,
    setDrivenTeeth,
    gears,
    setGears,
    drivingRpm,
    setDrivingRpm,
    moduleMm,
    setModuleMm,
  } = useGearState()

  const teethList = gears.map((g) => g.teeth)

  const applyPair = (driver, driven) => {
    setDrivingTeeth(driver)
    setDrivenTeeth(driven)
    setGears([{ teeth: driver }, { teeth: driven }])
  }

  return (
    <PageLayout
      title="Gear Simulator"
      titleId="calculator-page-heading"
      subtitle="Enter driving and driven gear tooth counts to compute ratio, speed, and torque. Adjust parameters below to update the visualization."
    >
      <h2 className="section-heading">Live Gear Visualization</h2>
      <GearCanvas gears={gears} />
      <GearInputForm
        drivingTeeth={drivingTeeth}
        drivenTeeth={drivenTeeth}
        onDrivingTeethChange={setDrivingTeeth}
        onDrivenTeethChange={setDrivenTeeth}
        gears={gears}
        onGearsChange={(g) => {
          setGears(g)
          if (g.length === 2) {
            setDrivingTeeth(g[0].teeth)
            setDrivenTeeth(g[1].teeth)
          }
        }}
        showTrainEditor
      />
      <SimulatorOptions
        drivingRpm={drivingRpm}
        onDrivingRpmChange={setDrivingRpm}
        moduleMm={moduleMm}
        onModuleMmChange={setModuleMm}
      />
      <ReverseRatioPanel onApplyPair={applyPair} />
      <GearTrainTable teethList={teethList} inputRpm={drivingRpm} />
      <DesignWarnings teethList={teethList} moduleMm={moduleMm} />
      <ResultsPanel
        drivingTeeth={drivingTeeth}
        drivenTeeth={drivenTeeth}
        gears={gears}
        drivingRpm={drivingRpm}
      />
      <ExportPdfButton
        teethList={teethList}
        drivingTeeth={drivingTeeth}
        drivenTeeth={drivenTeeth}
        drivingRpm={drivingRpm}
        moduleMm={moduleMm}
      />
    </PageLayout>
  )
}
