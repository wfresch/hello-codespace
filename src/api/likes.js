export const getLikesByRecipe = async (recipeId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likes/${recipeId}`,
  )
  return await res.json()
}

export const doesUserLikeRecipe = async (recipeId, userId) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likes/${recipeId}/${userId}`,
  )
  if (!res.ok) throw new Error('Failed to check like status')
  return await res.json()
}

//export const createLike = async (token, recipeId, userId) => {
export const createLike = async (token, recipeId) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/likes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ recipeId }),
  })
  return await res.json()
}
