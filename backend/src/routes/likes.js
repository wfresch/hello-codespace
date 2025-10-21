import { createLike, getLikesByRecipe } from '../services/likes.js'

import { requireAuth } from '../middleware/jwt.js'

export function likesRoutes(app) {
  app.get('/api/v1/likes/:id', async (req, res) => {
    const { id } = req.params
    try {
      const likes = await getLikesByRecipe(id)
      if (likes === null) return res.status(404).end()
      return res.json(likes)
    } catch (err) {
      console.error('error getting likes', err)
      return res.status(500).end()
    }
  })
  app.post('/api/v1/likes', requireAuth, async (req, res) => {
    try {
      const like = await createLike(req.auth.sub, req.body)
      return res.json(like)
    } catch (err) {
      console.error('error creating like', err)
      return res.status(500).end()
    }
  })
}
