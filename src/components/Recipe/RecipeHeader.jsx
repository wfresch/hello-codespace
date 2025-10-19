import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { User } from '../User.jsx'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '../../api/users.js'
import { useAuth } from '../../contexts/AuthContext'

export function RecipeHeader() {
  const [token, setToken] = useAuth()

  const { sub } = token ? jwtDecode(token) : {}
  const userInfoQuery = useQuery({
    queryKey: ['users', sub],
    queryFn: () => getUserInfo(sub),
    enabled: Boolean(sub),
  })
  const userInfo = userInfoQuery.data

  if (token && userInfo) {
    return (
      <div>
        <h1>Welcome to The Recipe Book!</h1>
        Logged in as <User {...userInfo} />
        <br />
        <button onClick={() => setToken(null)}>Logout</button>
      </div>
    )
  }

  return (
    <div>
      <h1>Welcome to The Recipe Book!</h1>
      <Link to='/login'>Log In</Link> | <Link to='/signup'>Sign Up</Link>
    </div>
  )
}
