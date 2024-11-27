import {Link} from 'react-router-dom'

const Cards = ({products}) => {
  return (
    <div className='flex gap-10  justify-center  px-20 w-[99%]'>
    {products.map((product) => (
      <Link to={`/product/${product._id}`} key={product._id} className="card bg-base-100 p-2 w-92 shadow-xl">
      <figure>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {product.name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
        </div>
        <button className="btn btn-primary w-full mt-4">Add to Cart</button>
      </div>
    </Link>
    ))}
  </div>
  )
}

export default Cards