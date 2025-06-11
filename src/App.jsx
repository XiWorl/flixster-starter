import { useState } from 'react'
import { CreateMovieContainer } from './components/MovieContainer'
import { Header } from './components/Header'
import './App.css'

let test = import.meta.env.VITE_API_KEY

const App = () => {
  return (
    <div className="App">
      <Header/>
      <CreateMovieContainer/>
    </div>
  )
}

export default App
