import { useContext } from 'react'
import Appcontext from '../../Context/AppContext'
import Cards from './Cards'

const ShowProduct = () => {
  const { products } = useContext(Appcontext)  
  return (
   <Cards products={products}/>
  )
}

export default ShowProduct