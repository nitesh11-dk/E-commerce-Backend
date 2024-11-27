import React, { useContext } from 'react'
import ShowProduct from './Componenets/product/ShowProduct'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailedProduct from './Componenets/product/DetailedProduct';
import Navbar from './Componenets/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './Componenets/User/Register';
import Login from './Componenets/User/Login';

const App = () => {
  return (
    <Router>
       <ToastContainer />
      <Navbar/>
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id"
         element={<DetailedProduct />} />
         <Route path='/register' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  );
};

export default App



  