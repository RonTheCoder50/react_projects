export default function ProductCard({ item, isDark, toggleDark }) {
    
  return (
    <li className={`w-[300px] flex flex-col gap-2 shadow-sm ${isDark ? 'bg-gray-800/90 hover:shadow-white/40' : 'bg-white/90'}`}>
        <img src={item.thumbnail ? item.thumbnail : ''} alt="" className='w-full h-52 object-center object-cover'/>

        <div className='p-2 w-full flex flex-col gap-3'>
          <div className={`flex justify-between items-center tracking-normal ${isDark ? 'text-white/90' : 'text-gray-800'}`}>
            <div className='flex flex-col'>
              <span className='text-base'>
                {item.title}
              </span>

              <span className='text-sm text-gray-400 font-normal'>
                {item.brand}
              </span>
            </div>

            <span className='text-base'>
              ${item.price}/-
            </span>
          </div>

          <div className='text-sm tracking-normal text-gray-500 line-clamp-3'>
            {item.description}
          </div>

          <div className={`flex justify-around items-center ${isDark ? 'text-white/70' : 'text-black/90'}`}> 
            <span>
              {item.availabilityStatus ? 'InStock' : 'Out of Stock'} 
              {item.availabilityStatus === 'In Stock' ? ` ${item.stock}` : ''}
            </span>

            <span className='flex items-center gap-1'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4 text-yellow-400">
                <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
              </svg>

              <span>
                {item.rating}
              </span> 
            </span>
          </div>
          
          <button className={`w-[85%] mx-auto my-1.5 border p-0.5 rounded-2xl text-base hover:border-yellow-400/80 hover:bg-yellow-400/80 hover:text-white/80 transition-all delay-75 duration-200 ease-linear 
          ${isDark ? 'text-white/80' : ''}`}>
            purchase
          </button>
        </div>
    </li>
  );
}