import React, { useEffect, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = ({ movies }) => {


  const [movie, setMovie] = useState([])

  const getMovie = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1')
      .then(res => res.json())
      .then(json => setMovie(json.results))
  }

  useEffect(() => {
    getMovie()
  }, [])

  console.log(movie);

  return (
    <div>
      <h1 className='page'>Popular Movies</h1>
      <div className='container'>

        {movie.map((movie, idx) => {
          return <div className='card' key={idx} >
            <Link to={`/movie/${movie.id}`} className='home-link'>
              <img src={' https://image.tmdb.org/t/p/w500' + movie.poster_path} alt={movie.title} />
              <div className='box'>
                <h3>{movie.title}</h3>
                <h4>{'Rating: ' + movie.vote_average.toFixed(1)}</h4>
              </div>
            </Link>
          </div>


        })}
      </div>
    </div>
  )
}

export default Home