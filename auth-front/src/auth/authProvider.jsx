import { createContext, useState } from "react"
// const AuthResponse = require("../types/types")
// import { AuthResponse } from "../types/types"

const AuthContext = createContext(
    {
        isAuthenticated: false,
        getAccessToken: () => {},
        saveUser: (userData) => {},
    }
)

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [refreshToken, setRefreshToken] = useState('')

    function getAccessToken(){
        return accessToken
    }

    function saveUser(userData) {
        setAccessToken(userData.body.accessToken);
        setRefreshToken(userData.body.refreshToken);

        localStorage.setItem('Token', JSON.stringify(userData.body.refreshToken));
        setIsAuthenticated(true);

      }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser }}>
            {children}
        </AuthContext.Provider>
    )   
}

export { AuthContext }; 
