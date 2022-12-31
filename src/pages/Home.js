import React from "react";
import { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { toggle, toggleBrands } from "../features/filter/filterSlice";



const Home = () => {

  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const filter = useSelector(state => state.filter);
  const {stock, brands} = filter;
  console.log(filter);

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
  if (products.length && (stock || brands.length)) {
    content = products
      .filter(product => {
        if(stock){
          return product.status === true
        }
        return product
      })
      .filter(product => {
        if(brands.length){
          return brands.includes(product.brand)
        }
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
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold `}
          onClick={() => dispatch(toggleBrands('amd'))}>
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold `}
          onClick={() => dispatch(toggleBrands('intel'))}>
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
