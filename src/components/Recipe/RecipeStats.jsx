import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import PropTypes from 'prop-types'
import {
  getLikesByRecipe,
  createLike,
  doesUserLikeRecipe,
} from '../../api/likes.js'

export function RecipeStats({ recipeId, userId, token }) {
  const queryClient = useQueryClient()

  // Fetch total likes
  const { data: totalLikes, isLoading: likesLoading } = useQuery({
    queryKey: ['totalLikes', recipeId],
    queryFn: () => getLikesByRecipe(recipeId),
  })

  // Fetch whether the current user has already liked
  const { data: userLikeStatus, isLoading: userLikeLoading } = useQuery({
    queryKey: ['hasLiked', recipeId, userId],
    queryFn: () => doesUserLikeRecipe(recipeId, userId),
    enabled: !!userId, // only fetch if user is logged in
  })

  // Mutation to create a like
  const likeMutation = useMutation({
    mutationFn: () => createLike(token, recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries(['totalLikes', recipeId])
      queryClient.invalidateQueries(['hasLiked', recipeId, userId])
    },
  })

  if (likesLoading || userLikeLoading) return <div>loading stats...</div>

  const hasLiked = userLikeStatus?.hasLiked
  const disableButton = !userId || hasLiked || likeMutation.isPending

  return (
    <div>
      <b>{totalLikes?.likes ?? 0} total likes</b>
      <br />
      <button
        onClick={() => likeMutation.mutate()}
        disabled={disableButton}
        style={{
          opacity: disableButton ? 0.5 : 1,
          cursor: disableButton ? 'not-allowed' : 'pointer',
        }}
      >
        {!userId ? 'Sign in to Like ❤️' : hasLiked ? 'Liked ❤️' : 'Like 👍'}
      </button>
    </div>
  )
}

RecipeStats.propTypes = {
  recipeId: PropTypes.string.isRequired,
  userId: PropTypes.string, // undefined for anonymous users
  token: PropTypes.string, // needed to call createLike
}
