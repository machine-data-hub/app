import React, { useState, createContext, useContext } from 'react'

export const CardContext = createContext()

export const CardProvider = ({ children }) => {
    const [card, setCard] = useState('')

    return (
        <CardContext.Provider value={[card, setCard]}>
            { children }
        </CardContext.Provider>
    )
}

export const useCard = () => useContext(CardContext)
