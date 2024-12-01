import React, { useContext } from 'react'
import AppContext from '../Context/AppContext'

const Checkout = () => {
  const {address} = useContext(AppContext)
  console.log(address)
  return (
    <div>Checkout

      <button  className='btn p-4 bg-red-600 rounded-2xl'>Checkout</button>
    </div>
  )
}

export default Checkout