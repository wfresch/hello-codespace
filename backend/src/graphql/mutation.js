import { GraphQLError } from 'graphql'
import { createUser, loginUser } from '../services/users.js'
import { createPost } from '../services/posts.js'
import { createRecipe } from '../services/recipes.js'
export const mutationSchema = `#graphql
type Mutation {
signupUser(username: String!, password: String!): User
loginUser(username: String!, password: String!): String
createPost(title: String!, contents: String, tags:[String]): Post
createRecipe(title: String!, imageUrl: String, ingredients:[String], description: String): Recipe
}
`
export const mutationResolver = {
  Mutation: {
    signupUser: async (parent, { username, password }) => {
      return await createUser({ username, password })
    },
    loginUser: async (parent, { username, password }) => {
      return await loginUser({ username, password })
    },
    createPost: async (parent, { title, contents, tags }, { auth }) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await createPost(auth.sub, { title, contents, tags })
    },
    createRecipe: async (
      parent,
      { title, imageUrl, ingredients, description },
      { auth },
    ) => {
      if (!auth) {
        throw new GraphQLError(
          'You need to be authenticated to perform this action.',
          {
            extensions: {
              code: 'UNAUTHORIZED',
            },
          },
        )
      }
      return await createRecipe(auth.sub, {
        title,
        imageUrl,
        ingredients,
        description,
      })
    },
  },
}
