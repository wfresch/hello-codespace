import dotenv from 'dotenv'
dotenv.config()
import { initDatabase } from './src/db/init.js'
import { Recipe } from './src/db/models/recipe.js'
import { User } from './src/db/models/user.js'
import { Event } from './src/db/models/event.js'
import { createUser } from './src/services/users.js'
import { createRecipe } from './src/services/recipes.js'
import { createLike } from './src/services/likes.js'
const simulatedUsers = 5
const simulatedRecipes = 10
const simulatedLikes = 30
async function simulateEvents() {
  const connection = await initDatabase()
  await User.deleteMany({})
  const createdUsers = await Promise.all(
    Array(simulatedUsers)
      .fill(null)
      .map(
        async (_, u) =>
          await createUser({
            username: `user-${u}`,
            password: `password-${u}`,
          }),
      ),
  )
  console.log(`created ${createdUsers.length} users`)
  await Recipe.deleteMany({})
  const createdRecipes = await Promise.all(
    Array(simulatedRecipes)
      .fill(null)
      .map(async (_, p) => {
        const randomUser =
          createdUsers[Math.floor(Math.random() * simulatedUsers)]
        return await createRecipe(randomUser._id, {
          title: `Test Recipe ${p}`,
          description: `description${p}`,
        })
      }),
  )
  console.log(`created ${createdRecipes.length} recipes`)
  await Event.deleteMany({})
  const createdLikes = await Promise.all(
    Array(simulatedLikes)
      .fill(null)
      .map(async () => {
        const randomRecipe =
          createdRecipes[Math.floor(Math.random() * simulatedRecipes)]
        const randomUser =
          createdUsers[Math.floor(Math.random() * simulatedUsers)]

        await createLike(randomUser._id, randomRecipe._id)
      }),
  )
  console.log(`successfully simulated ${createdLikes.length} likes`)
  await connection.disconnect()
}
simulateEvents()
