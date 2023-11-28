import { useState } from 'react'
import { UseAuth } from '../auth/useAuth'
import { Navigate } from 'react-router-dom'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const auth = UseAuth()

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <form action="">
      <h1>Login</h1>
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