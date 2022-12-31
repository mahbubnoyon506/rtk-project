import React from "react";
import ProductCard from "../components/ProductCard";


const TopRated = () => {

  const {products, loading, error} = ''

  let content;
  if(loading){
    content = <p>Loading...</p>
  }else if(error){
    content = <p>Something went wrong</p>
  }else if(!loading && !error && products.length === 0){
    content = <p>No product found</p>
  }else if(!loading && !error && products.length){
    content = products.filter((product) => product.rating >= 4).map((product) => <ProductCard key={product.id} product={product}></ProductCard>
   )
  }


  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl gap-14 mx-auto my-10'>
      {content}
    </div>
  );
};

export default TopRated;
