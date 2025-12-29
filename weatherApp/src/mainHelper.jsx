import { useContext } from "react";
import { ThemeContext } from "./context.jsx";

export default function InputGroup({ onChange, value, onSmash, setCity, search , loader, autoSuggestions, selectSuggetion, isToggle}) {
  const { theme } = useContext(ThemeContext);
  // console.log(theme);

  return (
    <div className='w-full flex flex-col gap-6 items-center'>
      <p className='text-center text-xl tracking-wide font-medium text-sky-600'>
        Enter Location for Weather update
      </p>

      <div className='flex flex-col items-center gap-0 relative w-full'>
        <input type="text" placeholder='search...' className={`w-full max-w-[90%] sm:max-w-[600px] border border-gray-300  p-2 text-base tracking-normal rounded-md text-center
         ${theme === 'light' ? 'text-gray-500 focus:outline-sky-300' : 'text-white/90 placeholder:text-white/70 focus:outline-gray-500'}`} 
          value={value} 
          onChange={(e) => onChange(e)}
          onKeyDown={(e) => {
            if(e.key === 'Enter') {
              setCity(search);
              loader();
              console.log('Api call fired by enter!!');
            }
          }}
        />

        {/* auto-complete suggestions */}
        {isToggle && 
          <ul className={`z-50 flex flex-col gap-0.5 p-0.5 rounded-sm shadow-sm w-full max-w-[85%] sm:max-w-[600px] border ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-500'} absolute top-full mt-2`}
            onClick={(e) => {
              selectSuggetion(e)
            }}>
            {autoSuggestions.map(item => (
              <ItemBracket key={item.id} item={item} theme={theme} />
            ))}
          </ul>
        }
      </div>

      <button className={`py-1 px-2 w-[150px] border rounded-md cursor-pointer shadow-sm hover:scale-[1.04] transition-all delay-75 duration-150 ease-linear flex justify-center gap-6 items-center ${theme === 'light' ? 'bg-white/80 hover:bg-sky-50 border-sky-200 hover:border-sky-500 text-sky-600' : 'bg-black/80 hover:bg-white/5 border-gray-400 hover:border-gray-200 text-white/80'}`}
      onClick={() => onSmash()}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

        <span className='text-lg tracking-wide font-medium'>Go</span>
      </button>

      <hr className='w-[90%] border-gray-400/60 my-4'/>
    </div>
  );
}

//reusable component for auto-suggest bracket!
function ItemBracket({ item, theme }) {
  return (
    <li className={`w-full ${theme === 'light' ? 'bg-white/90 hover:bg-white' : 'bg-black/60 hover:bg-black/80'}  p-1.5 flex items-center justify-center gap-2 text-base sm:text-lg font-normal tracking-wide cursor-pointer`}>
      <span>
        {item.name}
      </span>

      <span> , </span>

      <span>
        {item.country}
      </span>
    </li>
  );
}