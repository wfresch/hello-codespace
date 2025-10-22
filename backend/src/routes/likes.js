import {
  createLike,
  getLikesByRecipe,
  doesUserLikeRecipe,
} from '../services/likes.js'

import { requireAuth } from '../middleware/jwt.js'

export function likesRoutes(app) {
  app.get('/api/v1/likes/:id', async (req, res) => {
    const { id } = req.params
    try {
      const likesCount = await getLikesByRecipe(id)
      return res.json({ likes: likesCount })
    } catch (err) {
      console.error('error getting likes', err)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/likes/:recipeId/:userId', async (req, res) => {
    const { recipeId, userId } = req.params
    try {
      const userLikesRecipe = await doesUserLikeRecipe(recipeId, userId)
      res.json({ hasLiked: !!userLikesRecipe })
    } catch (err) {
      console.error('error checking like', err)
      res.status(500).json({ error: 'Failed to check like' })
    }
  })
  app.post('/api/v1/likes', requireAuth, async (req, res) => {
    try {
      const { recipeId } = req.body
      const userId = req.auth.sub

      const like = await createLike(userId, recipeId)
      return res.json(like)
    } catch (err) {
      console.error('error creating like', err)
      return res.status(500).end()
    }
  })
}
