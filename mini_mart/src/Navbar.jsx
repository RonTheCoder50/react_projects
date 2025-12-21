  import { useState, useContext } from "react";
  import { AlldataContext } from "./App";

 export default function NavBar() {
  //connect input-onchange with parent state!
  const [isDrop, setIsDrop] = useState(false);
  const {onChange, inputVal, setSelected, isLoad, isDark, toggleTheme} = useContext(AlldataContext);

  function handleDropDown(e) {
    e.stopPropagation();
    setIsDrop(!isDrop);
  }

  function handleSelectCategory(e) {
    if(e.target.tagName !== 'LI') {
        return;
    };
    
    const category = e.target.dataset.category;
    const list = category.split(' ');
    console.log(list);

    setSelected(list); //selected category items
  }

  let classOfAllCategory = `flex flex-col items-center gap-2 relative shadow-sm hover:shadow-md rounded-sm w-[200px] p-2 tracking-wide cursor-default ${isDark ? 'bg-black/80 text-white shadow-white/20' : 'bg-white/60'}`;

  if(isLoad) {
    classOfAllCategory += ' disabled';
  } 
  
  return (
    <section className={`w-full flex flex-wrap justify-around items-center gap-4 p-6 shadow-md fixed ${isDark ? 'bg-black/70 shadow-white/20' :'bg-white/50 shadow-black/20'}`}
    >
      <p className={`text-2xl font-medium tracking-normal ${isDark ? 'text-white' :'text-violet-400/80'}`}>Mini Mart</p>

      <div className='flex flex-wrap justify-center sm:justify-around items-center gap-4 md:gap-6'>
        <input onChange={onChange} value={inputVal}
          type="text" placeholder='Search products' 
          className={`border border-gray-400 w-[280px] px-2 py-1.5 focus:outline-none text-lg rounded-lg tracking-wide ${isDark ? 'text-white/90 placeholder:text-white/90' :'text-gray-500 placeholder:text-gray-500'}`}
        />

        <div onClick={(e) => handleDropDown(e)} className={classOfAllCategory}>
          <p className='text-lg '>All Categories</p>

          { isDrop && <Categories onClick={handleSelectCategory} isLoad={isLoad} isDark={isDark}/> }
        </div>

        {isDark ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-10 rotate-12 hover:bg-white/10 rounded-full p-2 text-white cursor-pointer" 
            onClick={toggleTheme}>               
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
  
            : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className="size-10 rotate-12 hover:bg-black/10 rounded-full p-2 text-gray-600 cursor-pointer"
            onClick={toggleTheme}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
        }
      </div>
    </section>
  )
}

function Categories({ onClick, isDark }) {
    return (
        <ul onClick={(e) => onClick(e)}
          className={`p-1 rounded-sm w-full flex flex-col gap-1 absolute top-full translate-y-1 text-base tracking-wide cursor-pointer ${isDark ? 'bg-gray-900' : 'bg-white/80'}`}>
            <li data-category={'products?limit=0'} className='hover:underline w-full py-1 px-4 box-border'>
              All Products
            </li>

            <li data-category={'beauty skin-care fragrances'} className='hover:underline w-full py-1 px-4 box-border'>
              Beauty
            </li>

            <li data-category={'furniture home-decoration'} className='hover:underline w-full py-1 px-4 box-border'>
              Furniture
            </li>

            <li data-category={'kitchen-accessories'} className='hover:underline w-full py-1 px-4 box-border'>
              Kitchen tools
            </li>

            <li data-category={'laptops smartphones tablets mobile-accessories'} className='hover:underline w-full py-1 px-4 box-border'>
              Electronics
            </li>

            <li data-category={'mens-shirts mens-shoes womens-dresses tops mens-shoes womens-shoes womens-bags'} 
            className='hover:underline w-full py-1 px-4 box-border'>
              Cloths & Shoes
            </li>

            <li data-category={'mens-watches womens-watches womens-jewellery sunglasses'} 
            className='hover:underline w-full py-1 px-4 box-border'>
              Fashion
            </li>
        </ul> 
    );
}