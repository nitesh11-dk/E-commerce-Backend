import React, { useContext } from 'react'
import ShowProduct from './Componenets/product/ShowProduct'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailedProduct from './Componenets/product/DetailedProduct';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id"
         element={<DetailedProduct />} />
      </Routes>
    </Router>
  );
};

export default App