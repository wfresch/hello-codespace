import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ApolloProvider } from '@apollo/client/react/index.js'
import { ApolloClient, InMemoryCache } from '@apollo/client/core/index.js'
import PropTypes from 'prop-types'
const queryClient = new QueryClient()
import { SocketIOContextProvider } from './contexts/SocketIOContext.jsx'
import { Toaster } from 'react-hot-toast'
//import { useNavigate } from 'react-router-dom'

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

import { HelmetProvider } from 'react-helmet-async'

export function App({ children }) {
  //const navigate = useNavigate()
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <SocketIOContextProvider>
              {children}
              <Toaster position='bottom-right' reverseOrder={false} />
            </SocketIOContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </HelmetProvider>
  )
}
App.propTypes = {
  children: PropTypes.element.isRequired,
}
