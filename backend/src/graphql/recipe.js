import { getUserInfoById } from '../services/users.js'
import { getLikesByRecipe } from '../services/likes.js'

export const recipeSchema = `#graphql
type Recipe {
id: ID!
title: String!
author: User
imageUrl: String
ingredients: [String!]
description: String
likes: Float
createdAt: Float
updatedAt: Float
}
`
export const recipeResolver = {
  Recipe: {
    author: async (recipe) => {
      return await getUserInfoById(recipe.author)
    },
    likes: async (recipe) => {
      return await getLikesByRecipe(recipe.id)
    },
  },
}
