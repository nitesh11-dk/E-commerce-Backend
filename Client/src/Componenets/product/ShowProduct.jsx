import { useContext } from 'react';
import Appcontext from '../../Context/AppContext';
import Cards from './Cards';

const ShowProduct = () => {
  const { products, searchFilter } = useContext(Appcontext);

  if (!products) {
    return <div>Loading...</div>;
  }


  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return <Cards products={filteredProducts} />;
};

export default ShowProduct;
