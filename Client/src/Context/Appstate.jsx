import { useEffect, useState } from "react";
import AppContext from "./Appcontext.jsx";
import axios from "axios";

const Appstate = (props) => {
  const [products, setProducts] = useState([]);
  const [searchFilter, setSearchFilter] = useState(""); // Add searchFilter state

  // Fetch products from API
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
      // Handle error gracefully
    }
  };

  useEffect(() => {
    fetchedProduct();
  }, []);

  return (
    <AppContext.Provider
      value={{
        products,
        searchFilter,
        setSearchFilter,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default Appstate;
