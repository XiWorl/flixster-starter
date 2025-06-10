import { useState } from 'react'
import { CreateMovieContainer } from './components/MovieContainer'
import './App.css'

let test = import.meta.env.VITE_API_KEY

const App = () => {
  return (
    <div className="App">
      <CreateMovieContainer/>
    </div>
  )
}

export default App
