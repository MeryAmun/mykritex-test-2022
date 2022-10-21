import React, {useState } from 'react';
import { useGetMoviesQuery,useAddNewMovieMutation, useDeleteMovieMutation,useUpdateMovieMutation } from '../RTkApi/apiSlice';



const MoviesScreen = () => {
  const [addNewMovie, response] = useAddNewMovieMutation();
  const [ deleteMovie ] = useDeleteMovieMutation();
  const [inputField, setInputField] = useState({
    id:'',
    title:'',
    message:''
  });

  const handleInputChange = (e) => {
    setInputField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const [updateMovie, {isLoading: isUpdating}] = useUpdateMovieMutation()

  const setMovieData = (data) => {
    setInputField({
      id:data.id,
      title:data.title,
      message:data.message
    })
  } 

  const onEditMovie = () => {
   updateMovie({
    id: inputField.id,
    title:inputField.title,
    message:inputField.message
   })
   setInputField(() => ({
    id:'',
    title:'',
    message:''
   }))
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const {title,message} = e.target.elements
    setInputField((inputField) => ({
      ...inputField,
      [e.target.name]:e.target.value
    }))
    let formData = {
      title:title.value,
      message:message.value
    }
    addNewMovie(formData)
    .unwrap()
    .then(() => {
      setInputField(() => ({
        id:'',
    title:'',
    message:''
      }))
    })
    .then((err) => {
console.log(err)
    })
  }

  const {
    data:movies,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
    error: getError
  } = useGetMoviesQuery({ refetchOnMountOrArgChange: true})

  let movieContent

  if(isGetLoading){
    movieContent = (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }else if (isGetSuccess){
    movieContent = movies.map((movie) => {
      return (
        <div className="col-lg-12 mb-3" key={movie.id}>
        <div className="card alert alert-secondary">
          <div className="card-body">
            <h5 className="card-title">{movie.title}</h5>
            <p className="card-text">{movie.message}</p>
            <button
              onClick={() => deleteMovie(movie.id)}
              className="btn btn-outline-danger me-2"
            >
              Remove
            </button>
            <button
              onClick={() => setMovieData(movie)}
              className="btn btn-outline-primary"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
      )
    })
  }else if(isGetError){
    movieContent = (
      <div className="alert alert-danger" role="alert">
        {getError}
      </div>
    )
  }

  return (
    <div className="row">
      <div className="col-md-4 offset-md-*">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter Title</strong>
            </label>
            <input
              value={inputField.title}
              type="text"
              className="form-control"
              name="title"
              id="title"
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              <strong>Enter message</strong>
            </label>
            <textarea
              value={inputField.message}
              className="form-control"
              rows="3"
              name="message"
              id="message"
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button className="btn btn-danger me-2" type="submit">
            Submit
          </button>
          <button
            onClick={onEditMovie}
            className="btn btn-primary"
            type="button"
          >
            Update
          </button>
        </form>
      </div>
      <div className="col-lg-8">
      <div className="row">{movieContent}</div>
        {/* {console.log(movies)} */}
      </div>
    </div>
  )
}

export default MoviesScreen