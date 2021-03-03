import React, { useState, createContext, useContext } from 'react'

export const SortContext = createContext()

export const SortProvider = ({ children }) => {
    const [sort, setSort] = useState('')

    return (
        <SortContext.Provider value={[sort, setSort]}>
            { children }
        </SortContext.Provider>
    )
}

export const useSort = () => useContext(SortContext)