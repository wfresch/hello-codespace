import { Like } from '../db/models/like.js'

export async function createLike(userId, recipeId) {
  const existing = await Like.findOne({ recipe: recipeId, user: userId })
  if (existing) return existing
  const like = new Like({ recipe: recipeId, user: userId })
  return await like.save()
}

export async function getLikesByRecipe(recipeId) {
  const likes = await Like.countDocuments({ recipe: recipeId })
  if (!likes) return 0
  return likes
}

export async function doesUserLikeRecipe(recipeId, userId) {
  const likes = await Like.countDocuments({ recipe: recipeId, user: userId })
  if (!likes || likes == 0) return false
  return true
}
