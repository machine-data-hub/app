import React, { useState, createContext, useContext } from 'react'

export const TypeContext = createContext()

export const TypeProvider = ({ children }) => {
    const [typeList, setTypeList] = useState([])

    return (
        <TypeContext.Provider value={[typeList, setTypeList]}>
            { children }
        </TypeContext.Provider>
    )
}

export const useType = () => useContext(TypeContext)