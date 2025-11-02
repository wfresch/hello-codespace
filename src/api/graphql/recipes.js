import { gql } from '@apollo/client/core/index.js'

export const RECIPE_FIELDS = gql`
  fragment RecipeFields on Recipe {
    id
    title
    imageUrl
    ingredients
    description
    updatedAt
    createdAt
    likes
    author {
      username
    }
  }
`
export const GET_RECIPES = gql`
  ${RECIPE_FIELDS}
  query getRecipes($options: PostsOptions) {
    recipes(options: $options) {
      ...RecipeFields
    }
  }
`
export const GET_RECIPES_BY_AUTHOR = gql`
  ${RECIPE_FIELDS}
  query getRecipesByAuthor($author: String!, $options: PostsOptions) {
    recipesByAuthor(username: $author, options: $options) {
      ...RecipeFields
    }
  }
`
export const CREATE_RECIPE = gql`
  mutation createRecipe(
    $title: String!
    $imageUrl: String
    $ingredients: [String!]
    $description: String
  ) {
    createRecipe(
      title: $title
      imageUrl: $imageUrl
      ingredients: $ingredients
      description: $description
    ) {
      id
      title
    }
  }
`
