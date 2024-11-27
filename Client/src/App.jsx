import React, { useContext } from 'react'
import ShowProduct from './Componenets/product/ShowProduct'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailedProduct from './Componenets/product/DetailedProduct';
import Navbar from './Componenets/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id"
         element={<DetailedProduct />} />
      </Routes>
    </Router>
  );
};

export default App