export const postTrackEvent = (event) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((res) => res.json())
export const postRecipeEvent = (event) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/recipeEvents`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  }).then((res) => res.json())
export const getTotalViews = (postId) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events/totalViews/${postId}`).then(
    (res) => res.json(),
  )
export const getTotalLikes = (recipeId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/totalLikes/${recipeId}`,
  ).then((res) => res.json())
export const getDailyViews = (postId) =>
  fetch(`${import.meta.env.VITE_BACKEND_URL}/events/dailyViews/${postId}`).then(
    (res) => res.json(),
  )
export const getDailyDurations = (postId) =>
  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/events/dailyDurations/${postId}`,
  ).then((res) => res.json())
