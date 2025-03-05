import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

export const Navbar = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };


  return (
    <div className='navbar'>
      <h1 className='logo'>MOVIEFLIX</h1>
      <nav>
        <ul>
          <li><Link to='/'>Popular</Link></li>
          <li><Link to='/toprated'>Top Rated</Link></li>
          <li><Link to='/upcoming'>Upcoming</Link></li>
          <li>
            <form onSubmit={handleSearch}>
              <input type="text" placeholder='Movies Name' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type='submit'><i class="fa fa-search"></i></button>
            </form>
          </li>

        </ul>
      </nav>
    </div>
  )
}
