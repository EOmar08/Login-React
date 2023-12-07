import { UseAuth } from '../auth/useAuth'

export function Dashboard() {
  const auth = UseAuth()
  console.log(auth.getUser());

  return (
    <h1>Dashboard de {auth.getUser().name } </h1>

  );
}