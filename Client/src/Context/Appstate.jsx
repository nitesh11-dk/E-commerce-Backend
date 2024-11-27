import { useEffect, useState } from "react";
import AppContext from "./Appcontext.jsx";
import axios from "axios";

const Appstate = (props) => {
  const [products, setProducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

 
  const fetchedProduct = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product/all", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add the token to headers if available
        },
        withCredentials: true,
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);

    }
  };


  useEffect(() => {
    if (token) {
      fetchedProduct();
      setIsLoggedIn(true);
    }
  }, [token]);


  const logoutUser = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token"); 
  };

  // Function to log in the user
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        const { token } = response.data;
        setToken(token); 
        setIsLoggedIn(true);
        localStorage.setItem("token", token);

        return response.data.message; 
      } else {
        throw new Error(response.data.message); 
      }
    } catch (error) {
      console.error("Login error:", error.message);
      return error.message; 
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        searchFilter,
        setSearchFilter,
        token,
        isLoggedIn,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default Appstate;
