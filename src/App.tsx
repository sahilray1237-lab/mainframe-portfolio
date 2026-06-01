import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import FilmGrain from './components/FilmGrain'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Admin from './pages/Admin'

export default function App() {
  return (
    <>
      <FilmGrain />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}
