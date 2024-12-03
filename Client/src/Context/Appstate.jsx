  import { useEffect, useState } from "react";
  import AppContext from "./Appcontext.jsx";
  import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/config.js";
  const Appstate = (props) => {
    const [products, setProducts] = useState([]);
    const [searchFilter, setSearchFilter] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [user, setUser] = useState(null);
const [cart, setCart] = useState(null)
const [reload ,setReload] = useState(false) ;
const [userAddress, setUserAddress] = useState(null)
const [userOrder, setUserOrder] = useState(null);



    const fetchedProduct = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/product/all`, {
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


    useEffect(() => {
      fetchedProduct();
      getCart();
      getAddress();
      userProfile();
    }, [token , reload]);


    // reload karne par logout nahi loga 
    useEffect(() => {
      let lstoken = localStorage.getItem("token");
      if (lstoken) {
        setToken(lstoken);
        setIsLoggedIn(true);
    }
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
          `${BASE_URL}/user/login`,
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
          const { token } = response.data;
          setToken(token);
          setIsLoggedIn(true);
          localStorage.setItem("token", token);
          toast.success(response.data.message);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        console.error("Login error:", error.message);
        return error.message;
      }
    };

    const registerUser = async (formData) => {
      try {
        const response = await axios.post(
          `${BASE_URL}/user/register`,
          formData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.data.success) {
            toast.success(response.data.message);
            return true
        } else {
          throw new Error(response.data.message);
          return false 
        }
      } catch (error) {
        console.error("Login error:", error.message);
        return false;
      }
    };

    const  userProfile = async ()=>{
      try{
         if(localStorage.getItem("token")){
          const token = localStorage.getItem("token");
           let response = await axios.get(`${BASE_URL}/user/profile`, {
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
            const token = localStorage.getItem("token");
            let response = await axios.get(`${BASE_URL}/cart/user`, {
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

   
    const addToCart = async ( productId ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
    
          let response = await axios.post(
            `${BASE_URL}/cart/add`,
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
          setReload(!reload)
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
            `${BASE_URL}/cart/--qty/${productId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
          setReload(!reload)
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
            `${BASE_URL}/cart/remove/${productId}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );

          setReload(!reload)
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
            `${BASE_URL}/cart/clear`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
          setReload(!reload)
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
            `${BASE_URL}/address/add`,address,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
          setReload(!reload)
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
            `${BASE_URL}/address/get`,
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
    const getOrders = async ( ) => {
      try {
        if (localStorage.getItem("token")) {
          const token = localStorage.getItem("token");
          let response = await axios.get(
            `${BASE_URL}/payment/getOrders`,
            {
              headers: {
                "Content-Type": "application/json",
                "Auth": token, 
              },
              withCredentials: true,
            }
          );
          setUserOrder(response.data.orders)
          console.log(response.data.orders)

        }
      } catch (err) {
        console.log("Error in getting the address ", err);
      }
    };
    
  





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
          registerUser,
          logoutUser,
          clearFilters, 
          user,userProfile ,
          cart,
          clearCart , 
          addToCart ,
          decreaseQuantity,
          removeItem,addAddress,userAddress,getOrders,userOrder
        }}
      >
        {props.children}
      </AppContext.Provider>
    );
  };

  export default Appstate;
