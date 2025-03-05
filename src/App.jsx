import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import TopRated from './components/TopRated/TopRated'
import Upcoming from './components/Upcoming/Upcoming'
import './App.css'
import MovieDetails from './components/MovieDetail/MovieDetail'
import SearchResult from './components/SearchResult/SearchResult'
import Footer from './components/Footer/Footer'

const App = () => {

  return (
    <>
      <Navbar />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/toprated' element={<TopRated />} />
          <Route path='/upcoming' element={<Upcoming />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/search/:query" element={<SearchResult />} />
        </Routes>
        <Footer />
      </div>

    </>

  )
}

export default App