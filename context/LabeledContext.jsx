import React, { useState, createContext, useContext } from 'react'

export const LabeledContext = createContext()

export const LabeledProvider = ({ children }) => {
    const [labeled, setLabeled] = useState('')

    return (
        <LabeledContext.Provider value={[labeled, setLabeled]}>
            { children }
        </LabeledContext.Provider>
    )
}

export const useLabeled = () => useContext(LabeledContext)