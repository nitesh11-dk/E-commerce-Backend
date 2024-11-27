import React, { useState, useContext } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AppContext from '../Context/Appcontext';
import { toast } from 'react-toastify';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const { setSearchFilter, isLoggedIn, logoutUser, setCategoryFilterState, clearFilters } = useContext(AppContext);

  let navigate = useNavigate();

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchFilter(query); 
  };

  const handleCategoryChange = (category) => {
    setCategoryFilter(category.toLowerCase());
    setCategoryFilterState(category.toLowerCase());
  };



  return (
    <div>
      <div className="navbar bg-base-200 sm:px-20 sticky top-0 z-50 shadow-md">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost normal-case text-xl">E-comm</Link>
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
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="btn btn-outline">Profile</Link>
              <button 
                onClick={() => {
                  logoutUser();
                  toast.success("Logout Successfully");
                  navigate('/');
                }} 
                className="btn btn-outline">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-outline">SignUp</Link>
              <Link to="/login" className="btn btn-outline">SignIn</Link>
            </>
          )}

          <Link to="/cart" className="btn btn-ghost">
            <FaShoppingCart className="text-xl" />
          </Link>
        </div>
      </div>

      <div className="bg-base400 flex items-center justify-center  p-4">
        <div className="flex justify-between gap-10 items-center">
          <div className="flex gap-4">
    
            <button 
              onClick={() => handleCategoryChange('Mobile')}
              className={`btn btn-outline ${categoryFilter === 'Mobile' ? 'bg-blue-500 text-white' : ''}`}
            >
              Mobile
            </button>
            <button 
              onClick={() => handleCategoryChange('Laptop')}
              className={`btn btn-outline ${categoryFilter === 'Laptop' ? 'bg-blue-500 text-white' : ''}`}
            >
              Laptop
            </button>
            <button 
              onClick={() => handleCategoryChange('Tablet')}
              className={`btn btn-outline ${categoryFilter === 'Tablet' ? 'bg-blue-500 text-white' : ''}`}
            >
              Tablet
            </button>
            <button 
              onClick={() => handleCategoryChange('PC')}
              className={`btn btn-outline ${categoryFilter === 'PC' ? 'bg-blue-500 text-white' : ''}`}
            >
              PC
            </button>
            <input 
              type="text" 
              value={categoryFilter} 
              onChange={(e) => handleCategoryChange(e.target.value)}
              placeholder="Custom Category" 
              className="input input-bordered"
            />
          </div>
          <button onClick={clearFilters} className="btn btn-outline">
              Clear Filters
            </button>
          <div>
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
