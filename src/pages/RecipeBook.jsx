import { RecipeList } from '../components/Recipe/RecipeList.jsx'
import { CreateRecipe } from '../components/Recipe/CreateRecipe.jsx'
import { RecipeFilter } from '../components/Recipe/RecipeFilter.jsx'
import { RecipeSorting } from '../components/Recipe/RecipeSorting.jsx'
import { RecipeHeader } from '../components/Recipe/RecipeHeader.jsx'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getRecipes } from '../api/recipes.js'

export function RecipeBook() {
  const [author, setAuthor] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('descending')

  const recipesQuery = useQuery({
    queryKey: ['recipes', { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  })

  const recipes = recipesQuery.data ?? []

  return (
    <div style={{ padding: 8 }}>
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
