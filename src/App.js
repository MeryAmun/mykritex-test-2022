import React from 'react';
import MoviesScreen from './features/movies/MoviesScreen'
import './App.css';

function App() {
  return (
    <div className="App">
       <h2 className="mb-5">React RTK Query CRUD <br/> Operations in a Journal</h2>
     <div className='container'>
     <MoviesScreen/>
     </div>
     
    </div>
  );
}

export default App;
