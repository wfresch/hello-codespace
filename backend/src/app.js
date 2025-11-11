import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import { recipesRoutes } from './routes/recipes.js'
import { likesRoutes } from './routes/likes.js'
import { eventRoutes } from './routes/events.js'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { optionalAuth } from './middleware/jwt.js'
import { typeDefs, resolvers } from './graphql/index.js'

const app = express()
app.use(bodyParser.json())
//app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(
  cors({
    origin: 'https://miniature-yodel-xr44946xpqcv6q-5173.app.github.dev/',
    credentials: true,
  }),
)

// GraphQL
const apolloServer = new ApolloServer({ typeDefs, resolvers })
await apolloServer.start()
app.use(
  '/graphql',
  optionalAuth,
  expressMiddleware(apolloServer, {
    context: async ({ req }) => ({ auth: req.auth }),
  }),
)

// REST routes
postsRoutes(app)
userRoutes(app)
eventRoutes(app)
likesRoutes(app)
recipesRoutes(app)

// Basic test route
app.get('/', (req, res) => res.send('Hello from Express!'))

export { app }
