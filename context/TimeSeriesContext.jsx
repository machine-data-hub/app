import React, { useState, createContext, useContext } from 'react'

export const TimeSeriesContext = createContext()

export const TimeSeriesProvider = ({ children }) => {
    const [timeSeries, setTimeSeries] = useState('')

    return (
        <TimeSeriesContext.Provider value={[timeSeries, setTimeSeries]}>
            { children }
        </TimeSeriesContext.Provider>
    )
}

export const useTimeSeries = () => useContext(TimeSeriesContext)