import { getUserInfoById } from '../services/users.js'
export const recipeSchema = `#graphql
type Recipe {
id: ID!
title: String!
author: User
imageUrl: String
ingredients: [String!]
description: String
createdAt: Float
updatedAt: Float
}
`
export const recipeResolver = {
  Recipe: {
    author: async (recipe) => {
      return await getUserInfoById(recipe.author)
    },
  },
}
