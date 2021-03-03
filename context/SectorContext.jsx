import React, { useState, createContext, useContext } from 'react'

export const SectorContext = createContext()

export const SectorProvider = ({ children }) => {
    const [sectorList, setSecorList] = useState([])

    return (
        <SectorContext.Provider value={[sectorList, setSecorList]}>
            { children }
        </SectorContext.Provider>
    )
}

export const useSector = () => useContext(SectorContext)