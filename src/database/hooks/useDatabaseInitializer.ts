import { useState } from "react"

export enum InitPhase {
  LOCKED,
  UNLOCKING,
  UNLOCKED,
}

export type PhaseTransitions = {
  locked: () => void
  unlocking: () => void
  unlocked: () => void
}

export const useDatabaseInitializer = (): [InitPhase, PhaseTransitions] => {
  const [phase, setPhase] = useState(InitPhase.LOCKED)

  const locked = () => {
    setPhase(InitPhase.LOCKED)
  }

  const unlocking = () => {
    setPhase(InitPhase.UNLOCKING)
  }

  const unlocked = () => {
    setPhase(InitPhase.UNLOCKED)
  }

  return [phase, { locked, unlocking, unlocked }]
}
