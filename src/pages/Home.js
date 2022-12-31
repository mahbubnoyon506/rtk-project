import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../components/ProductCard";


const Home = () => {


const [products, setProducts] = useState([])

  useEffect(() => {
    (
      async () => {
        await fetch('http://localhost:8000/products')
          .then(res => res.json())
          .then(data => setProducts(data))
      }
    )()
  }, [])


  const activeClass = "text-white  bg-indigo-500 border-white";
  let content = '';
  if (products?.length) {
    content = products?.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }
  if (products.length ) {
    content = products
    .filter(product => {
      return product
    })
    .map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button
          className={`border px-3 py-2 rounded-full font-semibold `}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold `}>
          AMD
        </button>
        <button  className={`border px-3 py-2 rounded-full font-semibold `}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;
