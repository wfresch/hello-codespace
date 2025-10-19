import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import { getTotalLikes } from '../../api/events.js'

export function RecipeStats({ recipeId }) {
  const totalLikes = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => getTotalLikes(recipeId),
  })
  if (totalLikes.isLoading) {
    return <div>loading stats...</div>
  }
  return (
    <div>
      <b>{totalLikes.data?.views} total likes</b>
    </div>
  )
}
RecipeStats.propTypes = {
  recipeId: PropTypes.string.isRequired,
}
