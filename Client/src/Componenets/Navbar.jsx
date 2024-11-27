import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useContext } from 'react';
import Appcontext from '../Context/Appcontext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearchFilter } = useContext(Appcontext);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchFilter(query); // Update context with the search query
  };

  return (
    <div className="navbar bg-base-200 sm:px-20 sticky top-0 z-50 shadow-md">
      <div className="navbar-start">
        <a className="btn btn-ghost normal-case text-xl">E-comm</a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <div className="form-control w-full max-w-md relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="input input-bordered w-full pl-10"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="navbar-end flex gap-2">
        <Link to="/register" className="btn btn-outline">SignUp</Link>
        <Link to="/login" className="btn btn-outline">SignIn</Link>
      </div>
    </div>
  );
};

export default Navbar;
