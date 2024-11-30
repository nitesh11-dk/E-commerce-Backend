  import { useEffect, useState } from "react";
  import AppContext from "./Appcontext.jsx";
  import axios from "axios";

  const Appstate = (props) => {
    const [products, setProducts] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
    const fetchedProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/product/all", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    useEffect(() => {
      fetchedProduct();
    }, []);

    // if token changes 
    useEffect(() => {
      if (token) {
        setIsLoggedIn(true);
      }
    }, [token]);

    const logoutUser = () => {
      setToken(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    };

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


    const  userProfile = async ()=>{
       try{
          if(localStorage.getItem("token")){
            let response = await axios.get("http://localhost:3000/api/user/profile", {
              headers: {
                  "Content-Type": "application/json",
                  withCredentials: true ,
                  "Auth" : token
              }
          })
         setUser(response.data.user)
          }
       }catch (err){
            console.log("Error in feteching the user profile data",err )
       }
    }




    const setCategoryFilterState = (category) => {
      setCategoryFilter(category);
    };


    const clearFilters = () => {
      setSearchFilter(""); // Reset search filter
      setCategoryFilter(""); // Reset category filter
    };

    const filteredProducts = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      return matchesSearch && matchesCategory;
    });

    return (
      <AppContext.Provider
        value={{
          products: filteredProducts,
          searchFilter,
          setSearchFilter,
          categoryFilter,
          setCategoryFilterState,
          token,
          isLoggedIn,
          loginUser,
          logoutUser,
          clearFilters, 
          user,userProfile
        }}
      >
        {props.children}
      </AppContext.Provider>
    );
  };

  export default Appstate;
