import { useState } from 'react'
import { CreateMovieContainer } from './components/MovieContainer'
import { Header } from './components/Header'
import './App.css'

let apiKey = import.meta.env.VITE_API_KEY


const App = () => {
  return (
    <div className="App">
      <Header apiKey={apiKey}/>
      <CreateMovieContainer apiKey={apiKey}/>
    </div>
  )
}

export default App
