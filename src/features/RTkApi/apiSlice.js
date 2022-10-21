
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath:'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:3000'
  }),
  tagTypes:['Post'],
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    addNewMovie: builder.mutation({
      query:(payload) => ({
        url: '/posts',
        method: 'POST',
        body: payload,
        headers: {
          'Content-type':'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Post'],
    }),
    updateMovie: builder.mutation({
      query:(payload) => {
        const {id, ...body} = payload;
        return {
          url: `/posts/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Post']
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `'/posts/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Post']
    }),
  }),
})

export const {
  useGetMoviesQuery,
  useAddNewMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation
} = apiSlice