import { useState } from 'react'
import { CreateMovieContainer } from './components/MovieContainer'
import { Header } from './components/Header'
import { Modal } from './components/Modal'
import './App.css'

let apiKey = import.meta.env.VITE_API_KEY
window.currentPage = 1
window.currentFilter = ""
window.searchEnabled = false


const App = () => {
  const [movieData, setMovieData] = useState([]);
  const [loadButtonEnabled, setLoadButtonEnabled] = useState(true)
  const [modalData, setModalData] = useState({})
  const [input, setInput] = useState("")

  
  
  return (
    <div className="App">
      <Header apiKey={apiKey} setMovieData={setMovieData} setLoadButtonEnabled={setLoadButtonEnabled} movieData={movieData} input={input} setInput={setInput}/>
      <CreateMovieContainer movieData={movieData} setMovieData={setMovieData} apiKey={apiKey} loadButtonEnabled={loadButtonEnabled} setModalData={setModalData} input={input}/>
      <Modal modalData={modalData} setModalData={setModalData} />
    </div>
  )
}

export default App
