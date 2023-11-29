import { useState } from "react"
import { UseAuth } from '../auth/useAuth'
import { Navigate, useNavigate } from 'react-router-dom'
import { API_URL } from "../auth/constants"

export function Signup() {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorResponse, setErrorResponse] = useState('')

  const auth = UseAuth()
  const goTo = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try{
      const response = await fetch(`${API_URL}/signup`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          username,
          password
        }),
      })

      if(response.ok){
        console.log('Usuario creado con exito')
        goTo('/')
        setErrorResponse('')
      }else{
        console.log('Error al crear el usuario')
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
    <form onSubmit={handleSubmit}>
      <h1>Signup</h1>
      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
      <label>Name</label>
      <input 
      type="text" 
      value={name}
      onChange={(e) => setName(e.target.value)}
      />

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

      <button>Signup</button>
    </form>
  )
}