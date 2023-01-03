import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../features/api/apiSlice";
import { toggle, toggleBrands } from "../features/filter/filterSlice";
import { getProducts } from "../features/products/productsSlice";



const Home = () => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const filter = useSelector(state => state.filter);
  // const { products, isLoading } = useSelector(state => state.products);
  const { stock, brands } = filter;

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    dispatch(getProducts())
  }, [dispatch])

  // const {products} = useGetProductsQuery();
  console.log(products);



  const activeClass = "text-white  bg-indigo-500 border-white";
  let content = '';
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  }, [])
  if (loading) {
    content = <h2>Loading...</h2>
  }
  if (products?.length) {
    content = products?.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }
  if (products.length && (stock || brands.length)) {
    content = products
      .filter(product => {
        if (stock) {
          return product.status === true
        }
        return product
      })
      .filter(product => {
        if (brands.length) {
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
          className={`border px-3 py-2 rounded-full font-semibold ${stock ? activeClass : null}`}
          onClick={() => dispatch(toggle())}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('amd') ? activeClass : null}`}
          onClick={() => dispatch(toggleBrands('amd'))}>
          AMD
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('intel') ? activeClass : null}`}
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
