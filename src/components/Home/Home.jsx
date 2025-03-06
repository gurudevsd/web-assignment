import React, { useEffect, useState } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [movie, setMovies] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const fetchMovies = async (page) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=${page + 1}`
      );
      const data = await res.json();
      setMovies(data.results);
      setPageCount(Math.ceil(data.total_results / itemsPerPage));
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };


  return (
    <div className='body'>
      <h1 className='page1'>Popular Movies</h1>
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
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={0}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  )
}

export default Home