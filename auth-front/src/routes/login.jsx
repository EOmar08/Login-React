import { useState } from 'react'
import { UseAuth } from '../auth/useAuth'
import { Navigate,useNavigate } from 'react-router-dom'
import { API_URL } from "../auth/constants"

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorResponse, setErrorResponse] = useState('')

  const auth = UseAuth()
  const goTo = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try{
      const response = await fetch(`${API_URL}/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        }),
      })

      if(response.ok){
        console.log('Logeado correctamente')
        goTo('/')
        setErrorResponse('')
      }else{
        console.log('Error al logearse')
        const json = await response.json()
        setErrorResponse(json.body.error)
        return
      }
      
    } catch (error) {
      console.log(error) 
    }

  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <h1>Login</h1>
      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
      <label>Username</label>
      <input 
      type="text" 
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      />

      <label>Password</label>
      <input 
      type="password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  )
}