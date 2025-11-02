import {
  getPostById,
  listAllPosts,
  listPostsByAuthor,
  listPostsByTag,
} from '../services/posts.js'

import {
  getRecipeById,
  listAllRecipes,
  listRecipesByAuthor,
  listRecipesByIngredient,
} from '../services/recipes.js'

export const querySchema = `#graphql
input PostsOptions {
  sortBy: String
  sortOrder: String
}
type Query {
test: String
posts(options: PostsOptions): [Post!]!
postsByAuthor(username: String!, options: PostsOptions): [Post!]!
postsByTag(tag: String!, options: PostsOptions): [Post!]!
postById(id: ID!): Post
recipes(options: PostsOptions): [Recipe!]!
recipesByAuthor(username: String!, options: PostsOptions): [Recipe!]!
recipesByIngredient(ingredient: String!, options: PostsOptions): [Recipe!]!
recipeById(id: ID!): Recipe
}
`
export const queryResolver = {
  Query: {
    test: () => {
      return 'Hello World from GraphQL!'
    },
    posts: async (parent, { options }) => {
      return await listAllPosts(options)
    },
    postsByAuthor: async (parent, { username, options }) => {
      return await listPostsByAuthor(username, options)
    },
    postsByTag: async (parent, { tag, options }) => {
      return await listPostsByTag(tag, options)
    },
    postById: async (parent, { id }) => {
      return await getPostById(id)
    },
    recipes: async (parent, { options }) => {
      return await listAllRecipes(options)
    },
    recipesByAuthor: async (parent, { username, options }) => {
      return await listRecipesByAuthor(username, options)
    },
    recipesByIngredient: async (parent, { ingredient, options }) => {
      return await listRecipesByIngredient(ingredient, options)
    },
    recipeById: async (parent, { id }) => {
      return await getRecipeById(id)
    },
  },
}
