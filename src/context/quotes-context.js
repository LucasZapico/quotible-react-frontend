import React, {createContext, useContext} from 'react'
import { useQuotes } from '../hooks/index'

export const QuotesContext = createContext();
export const QuotesProvider = ({children}) => {
    const { quotes, setQuotes} = useQuotes()
    return (
        <QuotesContext.Provider value={{quotes, setQuotes}}>
            {children}
        </QuotesContext.Provider>
    )
}

export const useQuotesValue = () => useContext(QuotesContext)