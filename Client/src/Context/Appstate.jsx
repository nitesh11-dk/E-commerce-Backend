import { useEffect ,useState } from "react";
import AppContext from "./Appcontext.jsx";
import axios from "axios";


const Appstate = (props) => {
const [products,setProduct] = useState([]);
    
    const fetchedProduct = async ()=>{
        const response = await axios.get("http://localhost:3000/api/product/all",{headers:{
            "Content-Type":"application/json",
            withCredentials:true
        }})      
        setProduct(response.data.products)
    }
    
    useEffect(()=>{
fetchedProduct()
    },[])

    return (
        <>
        <AppContext.Provider value={{products}} >{props.children}</AppContext.Provider>
        </>
    )
}
export default Appstate