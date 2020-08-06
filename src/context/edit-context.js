import React, {createContext, useContext, useState} from 'react'


export const EditContext = createContext();
export const EditProvider = ({children}) => {
    const [ quoteForEdit, setQuoteForEdit] = useState('')
    return (
        <EditContext.Provider value={{quoteForEdit, setQuoteForEdit}}>
            {children}
        </EditContext.Provider>
    )
}

export const useEditValue = () => useContext(EditContext)