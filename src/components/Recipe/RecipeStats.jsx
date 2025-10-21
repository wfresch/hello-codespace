import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { getTotalLikes, postRecipeEvent } from '../../api/events.js'

export function RecipeStats({ recipeId }) {
  const queryClient = useQueryClient()
  const [liked, setLiked] = useState(false)

  const totalLikes = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => getTotalLikes(recipeId),
  })

  const handleLike = async () => {
    try {
      await postRecipeEvent({
        recipeId,
        action: 'like',
        date: new Date(),
      })
      setLiked(true)

      queryClient.invalidateQueries(['totalLikes', recipeId])
    } catch (err) {
      console.error('Error tracking like:', err)
    }
  }

  if (totalLikes.isLoading) {
    return <div>loading stats...</div>
  }

  return (
    <div style={{ marginTop: '1em' }}>
      <b>{totalLikes.data?.likes ?? 0} total likes</b>
      <br />
      <button
        onClick={handleLike}
        disabled={liked}
        style={{
          marginTop: '0.5em',
          padding: '0.5em 1em',
          backgroundColor: liked ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: liked ? 'not-allowed' : 'pointer',
        }}
      >
        {liked ? 'Liked 👍' : 'Like'}
      </button>
    </div>
  )
}
RecipeStats.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
