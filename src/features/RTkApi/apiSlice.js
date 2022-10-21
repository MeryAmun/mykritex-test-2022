
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// GET    /posts
// GET    /posts/1
// POST   /posts
// PUT    /posts/1
// PATCH  /posts/1
// DELETE /posts/1
const baseUrl = 'http://localhost:3001'
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: 'api',
  // All of our requests will have URLs starting with '/fakeApi'
  baseQuery: fetchBaseQuery(baseUrl),
  // The "endpoints" represent operations and requests for this server
  endpoints: builder => ({
    // The `getPosts` endpoint is a "query" operation that returns data
    getPosts: builder.query({
      // The URL for the request is '/fakeApi/posts'
      query: () => '/posts'
    })
  })
})


export const { useGetPostsQuery } = apiSlice