import {
  trackEvent,
  getTotalViews,
  getDailyViews,
  getDailyDurations,
  trackRecipeEvent,
  getTotalLikes,
} from '../services/events.js'
import { getPostById } from '../services/posts.js'
import { getRecipeById } from '../services/recipes.js'

export function eventRoutes(app) {
  app.post('/api/v1/events', async (req, res) => {
    try {
      const { postId, session, action } = req.body
      const post = await getPostById(postId)
      if (post === null) return res.status(400).end()
      const event = await trackEvent({ postId, session, action })
      return res.json({ session: event.session })
    } catch (err) {
      console.error('error tracking action', err)
      return res.status(500).end()
    }
  })
  app.post('/api/v1/recipeEvents', async (req, res) => {
    try {
      const { recipeId, session, action } = req.body
      const recipe = await getRecipeById(recipeId)
      if (recipe === null) return res.status(400).end()
      const event = await trackRecipeEvent({ recipeId, session, action })
      return res.json({ session: event.session })
    } catch (err) {
      console.error('error tracking action', err)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/events/totalViews/:postId', async (req, res) => {
    try {
      const { postId } = req.params
      const post = await getPostById(postId)
      if (post === null) return res.status(400).end()
      const stats = await getTotalViews(post._id)
      return res.json(stats)
    } catch (err) {
      console.error('error getting stats', err)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/events/dailyViews/:postId', async (req, res) => {
    try {
      const { postId } = req.params
      const post = await getPostById(postId)
      if (post === null) return res.status(400).end()
      const stats = await getDailyViews(post._id)
      return res.json(stats)
    } catch (err) {
      console.error('error getting stats', err)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/events/dailyDurations/:postId', async (req, res) => {
    try {
      const { postId } = req.params
      const post = await getPostById(postId)
      if (post === null) return res.status(400).end()
      const stats = await getDailyDurations(post._id)
      return res.json(stats)
    } catch (err) {
      console.error('error getting stats', err)
      return res.status(500).end()
    }
  })
  app.get('/api/v1/events/totalLikes/:recipeId', async (req, res) => {
    try {
      const { recipeId } = req.params
      const recipe = await getRecipeById(recipeId)
      if (recipe === null) return res.status(400).end()
      const stats = await getTotalLikes(recipe._id)
      return res.json(stats)
    } catch (err) {
      console.error('error getting stats', err)
      return res.status(500).end()
    }
  })
}
