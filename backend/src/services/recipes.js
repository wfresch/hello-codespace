import { Recipe } from '../db/models/recipe.js'
import { User } from '../db/models/user.js'

export async function createRecipe(
  userId,
  { title, imageUrl, ingredients, description },
) {
  const recipe = new Recipe({
    title,
    author: userId,
    imageUrl,
    ingredients,
    description,
  })
  return await recipe.save()
}

async function listRecipes(
  query = {},
  { sortBy = 'createdAt', sortOrder = 'descending' } = {},
) {
  const direction = sortOrder === 'ascending' ? 1 : -1

  // If sorting by likes, use aggregation
  if (sortBy === 'likes') {
    return await Recipe.aggregate([
      { $match: query },
      {
        $lookup: {
          from: 'likes', // Name of your Like collection
          localField: '_id',
          foreignField: 'recipe',
          as: 'likes',
        },
      },
      {
        $addFields: {
          likeCount: { $size: '$likes' },
          id: '$_id',
        },
      },
      { $sort: { likeCount: direction } },
    ])
  }

  return await Recipe.find(query).sort({ [sortBy]: sortOrder })
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options)
}

export async function listRecipesByAuthor(authorUsername, options) {
  const user = await User.findOne({ username: authorUsername })
  if (!user) return []
  return await listRecipes({ author: user._id }, options)
}

export async function listRecipesByIngredient(ingredients, options) {
  return await listRecipes({ ingredients }, options)
}

export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId)
}

export async function updateRecipe(
  userId,
  recipeId,
  { title, imageUrl, ingredients, description },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, author: userId },
    { $set: { title, imageUrl, ingredients, description } },
    { new: true },
  )
}

export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, author: userId })
}
