import React, { useState, createContext, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'

export const PageContext = createContext()

export const PageProvider = ({ children }) => {
    const router = useRouter()
    const currentPage = router.query.page || 1 // if querystring is undefined -> user is on page 1
    const [page, setPage] = useState(currentPage)

    useEffect(() => {
        setPage(localStorage.getItem('page') || 1)
    }, [router])

    return (
        <PageContext.Provider value={[page, setPage]}>
            { children }
        </PageContext.Provider>
    )
}

export const usePage = () => useContext(PageContext)