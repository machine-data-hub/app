import React, { useState, createContext, useContext } from 'react'

export const SimulationContext = createContext()

export const SimulationProvider = ({ children }) => {
    const [simulation, setSimulation] = useState('')

    return (
        <SimulationContext.Provider value={[simulation, setSimulation]}>
            { children }
        </SimulationContext.Provider>
    )
}

export const useSimulation = () => useContext(SimulationContext)