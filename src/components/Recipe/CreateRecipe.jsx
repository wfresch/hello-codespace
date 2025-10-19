import { useState } from 'react'
import { useMutation as useGraphQLMutation } from '@apollo/client/react/index.js'
import {
  CREATE_RECIPE,
  GET_RECIPES,
  GET_RECIPES_BY_AUTHOR,
} from '../../api/graphql/recipes.js'
import { useAuth } from '../../contexts/AuthContext.jsx'
import { Link } from 'react-router-dom'
import slug from 'slug'

export function CreateRecipe() {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [description, setDescription] = useState('')
  const [token] = useAuth()
  const [createRecipe, { loading, data }] = useGraphQLMutation(CREATE_RECIPE, {
    variables: { title, imageUrl, description },
    context: { headers: { Authorization: `Bearer ${token}` } },
    refetchQueries: [GET_RECIPES, GET_RECIPES_BY_AUTHOR],
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createRecipe()
  }

  if (!token) return <div>Please log in to create new recipes.</div>

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='create-title'>Title: </label>
        <input
          type='text'
          name='create-title'
          id='create-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <br />
      <label htmlFor='create-description'>Description: </label>
      <textarea
        name='create-description'
        id='create-description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor='create-image-url'>Image URL: </label>
      <textarea
        name='create-image-url'
        id='create-image-url'
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <br />
      <br />
      <input
        type='submit'
        value={loading ? 'Creating....' : 'Create'}
        disabled={!title || loading}
      />
      {data?.createRecipe ? (
        <>
          <br />
          Recipe{' '}
          <Link
            to={`/recipes/${data.createRecipe.id}/${slug(
              data.createRecipe.title,
            )}`}
          >
            {data.createRecipe.title}
          </Link>{' '}
          created successfully!
        </>
      ) : null}
    </form>
  )
}
