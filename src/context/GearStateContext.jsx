import { createContext, useContext, useState, useCallback } from 'react'

const GearStateContext = createContext(null)

export function GearStateProvider({ children }) {
  const [drivingTeeth, setDrivingTeeth] = useState(20)
  const [drivenTeeth, setDrivenTeeth] = useState(40)
  const [gears, setGears] = useState([{ teeth: 20 }, { teeth: 40 }])
  const [drivingRpm, setDrivingRpm] = useState(100)
  const [moduleMm, setModuleMm] = useState(2)

  const syncFromTwoGears = useCallback(() => {
    setGears([{ teeth: drivingTeeth }, { teeth: drivenTeeth }])
  }, [drivingTeeth, drivenTeeth])

  const value = {
    drivingTeeth,
    setDrivingTeeth,
    drivenTeeth,
    setDrivenTeeth,
    gears,
    setGears,
    syncFromTwoGears,
    drivingRpm,
    setDrivingRpm,
    moduleMm,
    setModuleMm,
  }
  return (
    <GearStateContext.Provider value={value}>
      {children}
    </GearStateContext.Provider>
  )
}

export function useGearState() {
  const ctx = useContext(GearStateContext)
  if (!ctx) throw new Error('useGearState must be used within GearStateProvider')
  return ctx
}
