import { useState, useEffect } from 'react';
import { createContext, useContext } from 'react';

import ProductCard from './ProductCard';
import NavBar from './Navbar';
import './App.css'

export default function App() {
  return <Mart />
}

let ID = 1;
export const AlldataContext = createContext(null);

function Mart() {
  const [inputVal, setInputVal] = useState(''); //track input changes
  const [products, setProducts] = useState([]); //list of product items!
  const [isLoad, setIsLoad] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [category, setCategory] = useState(['products?limit=0']); //

  let filterProducts = inputVal ? products.filter((item) => 
    item.title.toLowerCase().includes(inputVal.toLowerCase()) 
  ) : products;
  
  useEffect(() => {
    const productData = async() => {
      try {
        for(let i=0; i<category.length; i++) {
          // if(category.length === 0) setCategory('products');

          let url = category.length === 1 ? 'https://dummyjson.com/' 
          : 'https://dummyjson.com/products/category/';

          const raw = await fetch(url+category[i]);
          const jsonData = await raw.json();
          console.log(category);

           
          setProducts(prv => prv.concat(jsonData.products));
          console.log('products: ', jsonData.products);
        }

        setIsLoad(false);
        
      } catch(err) {
        console.log('Error occured while fetching json data -> ', err);
        location.reload();
      }
    }

      setTimeout(() => {
        productData();
      }, 1000);
  }, [category]);

  function handleSelectedCategory(list) {
    setIsLoad(true);
    setProducts([]);
    setCategory(list); //list / array of types of products!
  }

  function handleInput(e) {
    // console.log(inputVal);
    setInputVal(e.target.value);
  }

  function handleDark() {
    setIsDark(!isDark);
  }

  // onChange={handleInput} value={inputVal} 
  //         setSelected={handleSelectedCategory} isLoad={isLoad} 
  //         isDark={isDark} toggleDark={handleDark}

  return (
    <section className={`w-full min-h-screen flex flex-col justify-between gap-10 ${isDark ? 'bg-black/95' : 'bg-gray-300/80'} `} >

      <AlldataContext.Provider value={{
        onChange:handleInput, 
        inputVal,
        setSelected:handleSelectedCategory,
        isLoad,
        isDark,
        toggleTheme:handleDark
      }}>
        <NavBar /> 
      </AlldataContext.Provider>

      {isLoad && <h2 className='text-3xl m-auto font-medium p-4 text-gray-600'>Loading....</h2> }
      <ul className='w-full mx-auto p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 place-items-center place-content-evenly gap-4 md:gap-y-8 mt-32'>
        { 
          filterProducts.map(item => (
            <ProductCard key={ID++} item={item} isDark={isDark} toggleDark={handleDark} />
          ))
        }
      </ul>

      <h3 className={`${isDark ? 'bg-black/75 text-white/80' :  'bg-gray-200 text-gray-700'} p-4 w-full text-center`}> 
        Made By Ron!
      </h3>
    </section>
  );
}




 

