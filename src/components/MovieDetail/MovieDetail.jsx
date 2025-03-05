import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [cast, setCast] = useState([]);


  useEffect(() => {
    //movie details
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
      .then(res => res.json())
      .then(data => setMovie(data));



    //cast
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
      .then(res => res.json())
      .then(data => setCast(data.cast));



  }, [id]);

  console.log(cast);

  if (!movie || !cast) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='container1'>
        <div className='movie-details'>
          <div className='poster'>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

          </div>

          <div className='movie-info'>
            <h2 className='movie-title'>{movie.title}</h2>
            <p className='rating'>Rating: {movie.vote_average?.toFixed(1) ?? 'N/A'}</p>
            <p className='movie-t'><span className='time'>97 min</span> Science Fiction, Action, Adventure  </p>
            <p className='release-date'><strong>Release Date:</strong> {new Date(movie.release_date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }).replace(/,/g, '')}</p>
            <h3 className='oh'>Overview</h3>
            <p className='overview'>{movie.overview}</p>


          </div>

        </div>
        <div className='background-img'>
          <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
        </div>
      </div>


      <div className='cast'>
        <u> <h3>Cast</h3></u>
        <div className='cast-list'>
          {cast.map(actor => (
            <div key={actor.id} className='cast-card'>
              <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} alt={actor.name} />
              <p className='actor-n'>{actor.name}</p>
              <p className='character'>Character: {actor.character}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
