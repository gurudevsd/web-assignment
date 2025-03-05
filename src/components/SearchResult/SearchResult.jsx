
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SearchResult.css'


const API_KEY = 'c45a857c193f6302f2b5061c3b85e743';
const BASE_URL = 'https://api.themoviedb.org/3';

const SearchResult = () => {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1`
        );
        setMovies(response.data.results);
      } catch (err) {
        setError('Failed to fetch movies. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{}} className=''>
      <h2 className='h2s'>Search Results for "{query}"</h2>
      <div className="container2">
        {movies.length > 0 ? (
          movies.map((movie) => (

            <div key={movie.id} className="card1">
              <Link to={`/movie/${movie.id}`}>
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="no-image">No Image Available</div>
                )}

                <div style={{}} className='box1'>
                  <h3>{movie.title}</h3>
                  <p>Rating: {movie.vote_average?.toFixed(1) ?? 'N/A'}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <h4 style={{ fontFamily: 'arial', color: 'red' }}>No results found. Please Check Movie Name</h4>
        )}
      </div>
    </div>
  );
};

export default SearchResult