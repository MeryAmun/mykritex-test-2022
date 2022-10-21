
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath:'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl:'http://localhost:3001'
  }),
  tagTypes:['Movie'],
  endpoints:(builder) => ({
    getMovies: builder.query({
      query: () => '/movies',
      providesTags: ['Movie'],
    }),
    addNewMovie:builder.mutation({
      query:(payload) => ({
        url: '/movies',
        method: 'Movie',
        body:payload,
        headers:{
          'Content-Type':'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Movie'],
    }),
    updateMovie:builder.mutation({
      query:(payload) => {
        const {id, ...body} = payload;
        return {
          url: `/movies/${id}`,
          method: 'PUT',
          body,
        }
      },
      invalidatesTags: ['Movie']
    }),
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `'/movies/${id}`,
        method:'DELETE',
        credentials:'include',
      }),
      invalidatesTags: ['Movie']
    }),
  }),
})

export const {
  useGetMovieQuery,
  useAddNewMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation
} = apiSlice