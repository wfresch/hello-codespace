import { listPostsByAuthor } from '../services/posts.js'
import { listRecipesByAuthor } from '../services/recipes.js'
export const userSchema = `#graphql
type User {
username: String!
posts: [Post!]!
recipes: [Recipe!]!
}
`
export const userResolver = {
  User: {
    posts: async (user) => {
      return await listPostsByAuthor(user.username)
    },
    recipes: async (user) => {
      return await listRecipesByAuthor(user.username)
    },
  },
}
