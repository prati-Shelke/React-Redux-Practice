import React from 'react'
import { useSelector } from "react-redux";

function Navbar() {
  const ProductsOrdered = useSelector((state)=>state.addProductToCart.ProductsOrdered)
  return (
    <div className='container' >
      <h1>
        
        <a href="/home">My Ecommerce Site</a>
        <span className="pull-right">
          <a href="/cart">Cart ({ProductsOrdered ? ProductsOrdered.length : 0})</a>
        </span>
      </h1>
      <hr></hr>
    </div>
  );
}

export default Navbar