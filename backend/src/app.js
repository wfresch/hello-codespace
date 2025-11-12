import express from 'express'
import { postsRoutes } from './routes/posts.js'
import { userRoutes } from './routes/users.js'
import { recipesRoutes } from './routes/recipes.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import { eventRoutes } from './routes/events.js'
import { likesRoutes } from './routes/likes.js'
import { ApolloServer } from '@apollo/server'
import { typeDefs, resolvers } from './graphql/index.js'
import { optionalAuth } from './middleware/jwt.js'
import { expressMiddleware } from '@apollo/server/express4'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { handleSocket } from './socket.js'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()
app.use(bodyParser.json())
app.use(cors())

apolloServer.start().then(() =>
  //app.use('/graphql', optionalAuth, expressMiddleware(apolloServer)),
  app.use(
    '/graphql',
    optionalAuth,
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        return { auth: req.auth }
      },
    }),
  ),
)

postsRoutes(app)
userRoutes(app)
eventRoutes(app)
likesRoutes(app)
recipesRoutes(app)

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
handleSocket(io)
// io.on('connection', (socket) => {
//   console.log('user connected:', socket.id)
//   socket.on('disconnect', () => {
//     console.log('user disconnected:', socket.id)
//   })
// })
export { server as app }
// export { app }
