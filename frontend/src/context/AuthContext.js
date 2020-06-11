import React from 'react'

const AuthContext = React.createContext({
    token : null,
    userId: null,
    logout : (token, userId, tokenExpiration) => {},
    login : () => {}
})

export default AuthContext