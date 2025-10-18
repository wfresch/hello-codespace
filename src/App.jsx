import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthContextProvider } from './contexts/AuthContext.jsx'
import { ApolloProvider } from '@apollo/client/react/index.js'
import { ApolloClient, InMemoryCache } from '@apollo/client/core/index.js'
import PropTypes from 'prop-types'
const queryClient = new QueryClient()

const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_URL,
  cache: new InMemoryCache(),
})

import { HelmetProvider } from 'react-helmet-async'

export function App({ children }) {
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
      </ApolloProvider>
    </HelmetProvider>
  )
}
App.propTypes = {
  children: PropTypes.element.isRequired,
}
