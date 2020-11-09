import React, { createContext, useContext, useState } from 'react'

const devUser = {
  email: 'quotible_admin@quotible.com',
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InF1b3RpYmxlX2FkbWluQHF1b3RpYmxlLmNvbSIsInVzZXJJZCI6IjVmOTFjYmRhNjI5NGRkMWY2MmE1ZmViMiIsImlhdCI6MTYwMzQxNDQ5MSwiZXhwIjoxNjAzNDE4MDkxfQ.3RKkuB5At56JRlC2fkRfExeVDfBgMj_H_wiqUml3a-o',
}

export const AuthContext = createContext()
export const AuthProvider = ({ children }) => {
  const [currentUserObj, setCurrentUserObj] = useState(devUser)
  return (
    <AuthContext.Provider
      value={{ currentUserObj, setCurrentUserObj }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthValue = () => useContext(AuthContext)
