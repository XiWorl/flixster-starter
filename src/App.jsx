import { useState } from 'react'
import './App.css'

let test = import.meta.env.VITE_API_KEY

const App = () => {
  return (
    <div className="App">
      API Key: ${test}g
    </div>
  )
}

export default App
