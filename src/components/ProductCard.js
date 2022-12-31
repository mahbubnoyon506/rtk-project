import React from "react";
import { BiListPlus } from "react-icons/bi";
import { FaTrashAlt } from "react-icons/fa";

import { useLocation } from "react-router-dom";


const ProductCard = ({ product }) => {


  const dispatch = ''

  const { pathname } = useLocation()

  return (
    <div
      className='shadow-lg rounded-3xl border  p-3 flex flex-col text-indigo-900 relative'
      key={product._id}
    >
      {
        pathname.includes('cart') && 
      <div className="absolute w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center"><p className="text-white">{product.quantity}</p></div>
      }
      <div className='h-52 w-52 mx-auto'>
        <img src={product.image} alt={product.model} />
      </div>
      <h1 className='font-bold text-center'>{product.model}</h1>
      <p className='text-center font-semibold mb-3'>Rating: {product.rating}</p>
      <div className=' flex-1'>
        <ul className='space-y-2'>
          {product.keyFeature.map((feature) => {
            return <li className='text-sm '>{feature}</li>;
          })}
        </ul>
      </div>
      <div className='flex justify-center items-center gap-2 mt-5'>
        {
          !pathname.includes('cart') &&
        <button
          className='bg-indigo-500 rounded-full py-1 px-2 flex-1 text-white text-bold'
        >
          Add to cart
        </button>
        }
        {
          (!pathname.includes('cart') && !pathname.includes('wishlist')) &&
        <button
          title='Add to wishlist'
          className='bg-indigo-500  py-1 px-2 rounded-full'
        >
          <BiListPlus className='text-white' />
        </button>
        }
        {
          pathname.includes('cart') &&
          <>
          
          <button
            title='Make Payment'
            className='bg-indigo-500  py-1 px-2 rounded-full text-white w-full mr-2'
          >
            Make Payment
          </button>
          <FaTrashAlt  className="cursor-pointer text-red-600" size={30}/>
          </>
        }
      </div>
    </div>
  );
};

export default ProductCard;
