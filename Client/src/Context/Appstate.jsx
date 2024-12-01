  import { useEffect, useState } from "react";
  import AppContext from "./Appcontext.jsx";
  import axios from "axios";
import { toast } from "react-toastify";

  const Appstate = (props) => {
    const [products, setProducts] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
const [cart, setCart] = useState(null)


//  product fetched
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



    
    //  User 
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
                 "Auth" : token
                },
                withCredentials: true ,
         })
        setUser(response.data.user)
         }
      }catch (err){
           console.log("Error in feteching the user profile data",err )
      }
   }

//  cart 
    const  getCart = async ()=>{
       try{
          if(localStorage.getItem("token")){
            let response = await axios.get("http://localhost:3000/api/cart/user", {
              headers: {
                  "Content-Type": "application/json",
                  "Auth" : token
                },
                withCredentials: true ,
          })
         setCart(response.data?.cart)
          }
       }catch (err){
            console.log("Error in feteching the user cart data ",err )
       }
    }

    useEffect(()=>{
      if (token) {
        getCart()
      }
    },[getCart])

    const addToCart = async ( productId ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
    
          let response = await axios.post(
            "http://localhost:3000/api/cart/add",
            {
              productId:productId, 
            },
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );

        }
      } catch (err) {
        console.log("Error in addding items in the cart ", err);
      }
    };
    
    const decreaseQuantity = async ( productId ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
    
          let response = await axios.get(
            `http://localhost:3000/api/cart/--qty/${productId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
        }
      } catch (err) {
        console.log("Error in decreasing the quantity", err);
      }
    };
    const removeItem = async ( productId ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
    
          let response = await axios.delete(
            `http://localhost:3000/api/cart/remove/${productId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
        }
      } catch (err) {
        console.log("Error in removing item from the cart ", err);
      }
    };
    
    const clearCart = async ( ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
    
          let response = await axios.delete(
            `http://localhost:3000/api/cart/clear`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
        }
      } catch (err) {
        console.log("Error in clearning the cart ", err);
      }
    };
    



    const addAddress = async (address ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
          let response = await axios.post(
            `http://localhost:3000/api/address/add`,address,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
          toast.success(response.data.message)
        }
      } catch (err) {
        console.log("Error in adding the address ", err);
      }
    };
    const getAddress = async ( ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
          let response = await axios.get(
            `http://localhost:3000/api/address/get`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
          setUserAddress(response.data.address)
        }
      } catch (err) {
        console.log("Error in getting the address ", err);
      }
    };
    
  




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
          user,userProfile ,
          cart,
          clearCart , 
          addToCart ,
          decreaseQuantity,
          removeItem,addAddress
        }}
      >
        {props.children}
      </AppContext.Provider>
    );
  };

  export default Appstate;
