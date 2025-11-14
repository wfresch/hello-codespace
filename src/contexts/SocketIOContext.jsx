import { createContext, useState, useContext, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import PropTypes from 'prop-types'
import { useAuth } from './AuthContext.jsx'
import toast from 'react-hot-toast'
import slug from 'slug'
//import { Link } from 'react-router-dom'

export const SocketIOContext = createContext({
  socket: null,
  status: 'waiting',
  error: null,
})
export const SocketIOContextProvider = ({ children, navigate }) => {
  const [status, setStatus] = useState('waiting')
  const [error, setError] = useState(null)
  const [token] = useAuth()
  const socketRef = useRef(null)
  useEffect(() => {
    if (token && !socketRef.current) {
      const socket = io(import.meta.env.VITE_SOCKET_HOST, {
        query: window.location.search.substring(1),
        auth: { token },
      })
      socketRef.current = socket

      socket.on('connect', () => {
        setStatus('connected')
        setError(null)
      })
      socket.on('connect_error', (err) => {
        setStatus('error')
        setError(err)
      })
      // socket.on('recipe.new', (data) => {
      //   const id = data?.recipe?.id || 'id'
      //   const title = data?.recipe?.title || 'a new recipe'
      //   const username = data?.username || 'Someone'

      //   toast(
      //     (t) => (
      //       <span>
      //         {username} just added{' '}
      //         <a
      //           href={`/recipes/${id}/${slug(title)}`}
      //           className='text-blue-500 underline'
      //           onClick={() => toast.dismiss(t.id)}
      //         >
      //           {title}
      //         </a>
      //         {/* <Link
      //           to={`/recipes/${id}/${slug(title)}`}
      //           onClick={() => toast.dismiss(t.id)}
      //         >
      //           <h3>{title}</h3>
      //         </Link> */}
      //       </span>
      //     ),
      //     { duration: 10000 },
      //   )
      // })
      socket.on('recipe.new', (data) => {
        const id = data?.recipe?.id || 'id'
        const title = data?.recipe?.title || 'a new recipe'
        const username = data?.username || 'Someone'

        toast(
          (t) => (
            <span>
              {username} just added{' '}
              <button
                className='text-blue-500 underline'
                onClick={() => {
                  toast.dismiss(t.id)
                  navigate(`/recipes/${id}/${slug(title)}`)
                }}
              >
                {title}
              </button>
            </span>
          ),
          { duration: 10000 },
        )
      })
      socket.on('disconnect', () => setStatus('disconnected'))
    }
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect()
        socketRef.current = null
      }
    }
    //}, [token, setSocket, setStatus, setError])
  }, [token])
  return (
    <SocketIOContext.Provider
      value={{ socket: socketRef.current, status, error }}
    >
      {children}
    </SocketIOContext.Provider>
  )
}
SocketIOContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
  navigate: PropTypes.func.isRequired,
}
export function useSocket() {
  return useContext(SocketIOContext)
}
