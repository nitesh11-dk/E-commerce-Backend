import { useContext } from 'react'
import Appcontext from '../../Context/AppContext'
const ShowProduct = () => {
  const { products } = useContext(Appcontext)
  

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
        </div>
      ))}
    </div>
  )
}

export default ShowProduct