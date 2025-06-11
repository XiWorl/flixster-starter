import { useState } from 'react'
import { CreateMovieContainer } from './components/MovieContainer'
import { Header } from './components/Header'
import './App.css'

let apiKey = import.meta.env.VITE_API_KEY
window.currentPage = 1


const App = () => {
  const [movieData, setMovieData] = useState([]);
  
  return (
    <div className="App">
      <Header apiKey={apiKey} setMovieData={setMovieData}/>
      <CreateMovieContainer movieData={movieData} setMovieData={setMovieData} apiKey={apiKey}/>
    </div>
  )
}

export default App
