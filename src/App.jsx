import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ApolloProvider } from '@apollo/client/react/index.js'
import { ApolloClient, InMemoryCache } from '@apollo/client/core/index.js'
import PropTypes from 'prop-types'
const queryClient = new QueryClient()
//import { io } from 'socket.io-client'
import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'
//import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// const socket = io(import.meta.env.VITE_SOCKET_HOST, {
//   query: 'room=' + new URLSearchParams(window.location.search).get('room'),
//   auth: {
//     token: new URLSearchParams(window.location.search).get('token'),
//   },
// })

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Blog />,
//   },
//   {
//     path: '/signup',
//     element: <Signup />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
// ])

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

import { HelmetProvider } from 'react-helmet-async'

// socket.on('connect', async () => {
//   console.log('connected to socket.io as', socket.id)
//   socket.emit(
//     'chat.message',
//     new URLSearchParams(window.location.search).get('mymessage'),
//   )
//   const userInfo = await socket.emitWithAck('user.info', socket.id)
//   console.log('user info', userInfo)
// })
// socket.on('connect_error', (err) => {
//   console.error('socket.io connect error:', err)
// })
// socket.on('chat.message', (msg) => {
//   console.log(`${msg.username}: ${msg.message}`)
// })

export function App({ children }) {
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <SocketIOContextProvider>{children}</SocketIOContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </HelmetProvider>
  )
}
App.propTypes = {
  children: PropTypes.element.isRequired,
}
