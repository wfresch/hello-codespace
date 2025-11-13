//import { Blog } from './pages/Blog.jsx'
import { Signup } from './pages/Signup.jsx'
import { Login } from './pages/Login.jsx'
import { RecipeBook } from './pages/RecipeBook.jsx'
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from '@tanstack/react-query'
import { useLoaderData, Navigate } from 'react-router-dom'
//import { getPosts, getPostById } from './api/posts.js'
import { getPostById } from './api/posts.js'
import { getRecipes, getRecipeById } from './api/recipes.js'
import { getUserInfo } from './api/users.js'
import { ViewPost } from './pages/ViewPost.jsx'
import { ViewRecipe } from './pages/ViewRecipe.jsx'
import { Chat } from './pages/Chat.jsx'

export const routes = [
  {
    path: '/',
    element: <Navigate to='/recipebook' replace />,
    // loader: async () => {
    //   const queryClient = new QueryClient()
    //   const author = ''
    //   const sortBy = 'createdAt'
    //   const sortOrder = 'descending'
    //   const posts = await getPosts({ author, sortBy, sortOrder })
    //   await queryClient.prefetchQuery({
    //     queryKey: ['posts', { author, sortBy, sortOrder }],
    //     queryFn: () => posts,
    //   })
    //   const uniqueAuthors = posts
    //     .map((post) => post.author)
    //     .filter((value, index, array) => array.indexOf(value) === index)
    //   for (const userId of uniqueAuthors) {
    //     await queryClient.prefetchQuery({
    //       queryKey: ['users', userId],
    //       queryFn: () => getUserInfo(userId),
    //     })
    //   }
    //   return dehydrate(queryClient)
    // },
    // Component() {
    //   const dehydratedState = useLoaderData()
    //   return (
    //     <HydrationBoundary state={dehydratedState}>
    //       <Blog />
    //     </HydrationBoundary>
    //   )
    // },
  },
  {
    path: '/recipebook',
    loader: async () => {
      const queryClient = new QueryClient()
      const author = ''
      const sortBy = 'createdAt'
      const sortOrder = 'descending'
      const recipes = await getRecipes({ author, sortBy, sortOrder })
      await queryClient.prefetchQuery({
        queryKey: ['recipes', { author, sortBy, sortOrder }],
        queryFn: () => recipes,
      })
      const uniqueAuthors = recipes
        .map((recipe) => recipe.author)
        .filter((value, index, array) => array.indexOf(value) === index)
      for (const userId of uniqueAuthors) {
        await queryClient.prefetchQuery({
          queryKey: ['users', userId],
          queryFn: () => getUserInfo(userId),
        })
      }
      return dehydrate(queryClient)
    },
    Component() {
      const dehydratedState = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <RecipeBook />
        </HydrationBoundary>
      )
    },
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'chat',
    element: <Chat />,
  },
  {
    path: '/posts/:postId/:slug?',
    loader: async ({ params }) => {
      const postId = params.postId
      const queryClient = new QueryClient()
      const post = await getPostById(postId)
      await queryClient.prefetchQuery({
        queryKey: ['post', postId],
        queryFn: () => post,
      })
      if (post?.author) {
        await queryClient.prefetchQuery({
          queryKey: ['users', post.author],
          queryFn: () => getUserInfo(post.author),
        })
      }
      return { dehydratedState: dehydrate(queryClient), postId }
    },
    Component() {
      const { dehydratedState, postId } = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <ViewPost postId={postId} />
        </HydrationBoundary>
      )
    },
  },
  {
    path: '/recipes/:recipeId/:slug?',
    loader: async ({ params }) => {
      const recipeId = params.recipeId
      const queryClient = new QueryClient()
      const recipe = await getRecipeById(recipeId)
      await queryClient.prefetchQuery({
        queryKey: ['recipe', recipeId],
        queryFn: () => recipe,
      })
      if (recipe?.author) {
        await queryClient.prefetchQuery({
          queryKey: ['users', recipe.author],
          queryFn: () => getUserInfo(recipe.author),
        })
      }
      return { dehydratedState: dehydrate(queryClient), recipeId }
    },
    Component() {
      const { dehydratedState, recipeId } = useLoaderData()
      return (
        <HydrationBoundary state={dehydratedState}>
          <ViewRecipe recipeId={recipeId} />
        </HydrationBoundary>
      )
    },
  },
]
