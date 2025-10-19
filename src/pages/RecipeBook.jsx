import { RecipeList } from '../components/Recipe/RecipeList.jsx'
import { CreateRecipe } from '../components/Recipe/CreateRecipe.jsx'
import { RecipeFilter } from '../components/Recipe/RecipeFilter.jsx'
import { RecipeSorting } from '../components/Recipe/RecipeSorting.jsx'
import { Helmet } from 'react-helmet-async'
import { RecipeHeader } from '../components/Recipe/RecipeHeader.jsx'
import { useState } from 'react'
import { useQuery as useGraphQLQuery } from '@apollo/client/react/index.js'
import { GET_RECIPES, GET_RECIPES_BY_AUTHOR } from '../api/graphql/recipes.js'

export function RecipeBook() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const recipesQuery = useGraphQLQuery(
    author ? GET_RECIPES_BY_AUTHOR : GET_RECIPES,
    {
      variables: { author, options: { sortBy, sortOrder } },
    },
  )
  const recipes =
    recipesQuery.data?.recipesByAuthor ?? recipesQuery.data?.recipes ?? []

  return (
    <div style={{ padding: 8 }}>
      <Helmet>
        <title>Recipe Book</title>
        <meta
          name='description'
          content='A book full of user-submitted recipes.'
        />
      </Helmet>
      <RecipeHeader />
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter
        field='author'
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={['createdAt', 'updatedAt']}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={recipes} />
    </div>
  )
}
