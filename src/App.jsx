import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import NavBar from './Components/NavBar'
import Home from './Pages/index'
import Footer from './Components/Footer'

function App() {
  const [buscaPoke, setBuscaPoke] = useState('')


  const handleBusca = (poke) => {
    setBuscaPoke(poke)
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <NavBar buscaNomeCategoria={handleBusca} />
        <Routes>
          <Route path='/' element={<Home buscaPoke={buscaPoke}/>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
