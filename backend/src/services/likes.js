import { Like } from '../db/models/like.js'

export async function createLike(recipeId, userId) {
  const like = new Like({ recipe: recipeId, user: userId })
  return await like.save()
}

export async function getLikesByRecipe(recipeId) {
  const likes = await Like.countDocuments({ recipe: recipeId })
  if (!likes) return 0
  return likes
}
