import { createContext, useEffect, useState } from "react"
import { API_URL } from "../auth/constants"

const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => {},
  getRefreshToken: () => {},
  saveUser: () => {},
  getUser: () => {},
});

export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [accessToken, setAccessToken] = useState('')
    const [user, setUser] = useState({})
    // const [refreshToken, setRefreshToken] = useState('')

    useEffect(() => {
        checkAuth();
      }, [])
    


      


    //Pedir nuevo accesToken
    async function requestNewAccessToken(refreshToken) {
        try {
        const response = await fetch(`${API_URL}/refresh-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${refreshToken}`
            },
          });
          if (response.ok) {
            const json = await response.json();
            if (json.error) {
              throw new Error(json.error);
            }
            return json.body.accessToken;
          } else {
            throw new Error(response.statusText);
          }
    
        } catch (error) {
          console.log(error);
          return null;
        }
      }

    async function getUserInfo(accessToken) {
        try {
            const response = await fetch(`${API_URL}/user`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ accessToken }`
                },
            })
            if(response.ok){
                const json = await response.json()
                if(json.error){
                    throw new Error(json.error)
                }
                return json.body
            }else{ 
                throw new Error(response.statusText)
            }

        } catch (error) {
            console.log(error)
            return null
        }
    }


    async function checkAuth() {
        if(accessToken){
            //El usuario está autenticado
        }else{
            //El usuario no está autenticado
            const token = getRefreshToken()
            if(token){
                const newAccessToken = await requestNewAccessToken(token);
                if(newAccessToken){
                    const userInfo = await getUserInfo(newAccessToken)
                    if(userInfo){
                        saveSessionInfo(userInfo, newAccessToken, token)
                    }
                }
            }
        }

    }

    function saveSessionInfo (userInfo, accessToken, refreshToken){
        setAccessToken(accessToken)    
        // setUser(userData.body.user)
        localStorage.setItem('Token', JSON.stringify(refreshToken))
        setIsAuthenticated(true)
        setUser(userInfo)
    }


    function getAccessToken(){
        return accessToken
    }

    function getRefreshToken(){
        const tokenData = localStorage.getItem('Token')
        
        if(tokenData){
            const token = JSON.parse(tokenData)
            return token
        }
        return null
    }

    function saveUser(userData) {
        saveSessionInfo(userData.body.user, userData.body.accessToken, userData.body.refreshToken)

    }

    function getUser(){
        console.log("El usuario es:",user)
        return user
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser }}>
            {children}
        </AuthContext.Provider>
    )   
}

export { AuthContext }