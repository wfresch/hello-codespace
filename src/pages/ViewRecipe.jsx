import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { RecipeHeader } from '../components/Recipe/RecipeHeader.jsx'
import { Recipe } from '../components/Recipe/Recipe.jsx'
import { getRecipeById } from '../api/recipes.js'
//import { useEffect, useState } from 'react'
//import { postTrackEvent } from '../api/events.js'
import { getUserInfo } from '../api/users.js'
import { Helmet } from 'react-helmet-async'
import { RecipeStats } from '../components/Recipe/RecipeStats.jsx'

export function ViewRecipe({ recipeId }) {
  const recipeQuery = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  })
  const recipe = recipeQuery.data

  const userInfoQuery = useQuery({
    queryKey: ['users', recipe?.author],
    queryFn: () => getUserInfo(recipe?.author),
    enabled: Boolean(recipe?.author),
  })
  const userInfo = userInfoQuery.data ?? {}

  function truncate(str, max = 160) {
    if (!str) return str
    if (str.length > max) {
      return str.slice(0, max - 3) + '...'
    } else {
      return str
    }
  }

  return (
    <div style={{ padding: 8 }}>
      {recipe && (
        <Helmet>
          <title>{recipe.title} | Recipe Book</title>
          <meta name='description' content={truncate(recipe.description)} />
          <meta property='og:type' content='article' />
          <meta property='og:title' content={recipe.title} />
          <meta
            property='og:article:published_time'
            content={recipe.createdAt}
          />
          <meta
            property='og:article:modified_time'
            content={recipe.updatedAt}
          />
          <meta property='og:article:author' content={userInfo.username} />
          {(recipe.ingredients ?? []).map((ingredient) => (
            <meta
              key={ingredient}
              property='og:article:tag'
              content={ingredient}
            />
          ))}
        </Helmet>
      )}
      <RecipeHeader />
      <br />
      <hr />
      {/*<Link to='/'>Back to main page</Link>*/}
      <Link to='/recipebook'>Back to recipe book</Link>
      <br />
      <hr />
      {recipe ? (
        <div>
          <Recipe {...recipe} fullRecipe id={recipeId} author={userInfo} />
          <hr /> <RecipeStats recipeId={recipeId} />
        </div>
      ) : (
        `Recipe with id ${recipeId} not found.`
      )}
    </div>
  )
}
ViewRecipe.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
