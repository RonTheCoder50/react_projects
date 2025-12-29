import { useState, useEffect } from 'react';
import './App.css'
import { WeatherBoardComponent, HistoryBoardComponet, ForecastBoardComponet} from './weatherBoard';
import { useFetch, useFetchHistory, useFetchForecast } from './ApiData';
import InputGroup from './mainHelper';
import { ThemeContext } from './context';

let key = '9a6f88364ecc4ccd982124145250811';
let url = 'http://api.weatherapi.com/v1';

// export const ThemeContext = createContext(null);

export default function App() {
  return <Main />
}

function Main() {
  const [data, setCurrentData] = useState([]); //it saves current weather data
  const [city, setCity] = useState(''); //it saves search city/country
  const [search, setSearch] = useState(''); //it handles input type
  const [forcastData, setForcastData] = useState([]); //it saves forcast weather data
  const [historyData, setHistoryData] = useState([]); //it saves past-days weather data
  const [isLoader, setLoader] = useState(true); //an loader (pending..)

  //auto-complete/suggest hooks
  const [autoSuggestions, setAutoSuggestions] = useState([]);
  const [isToggle, setIsToggle] = useState(false);

  //theme changer
  const [theme, setTheme] = useState('light'); //for light/dark theme apperance

  function handleLoader() {
    setTimeout(() => {
      setLoader(false); //result visible!
      setSearch(''); //input-clear!
    }, 2000);
  }

  function handleSearchInput(e) {
    setSearch(e.target.value);
    if(!isToggle) setIsToggle(true);
    console.log(search);
  }

  function handleSearchBtn() {
    setCity(search);
    setIsToggle(false);
    console.log('call logged');

    handleLoader();
  }

  function handleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  //fetch data for current weather info!
  useFetch({
    url: `${url}/current.json?key=${key}&q=${city}`,
    dependency: city,
    setData: setCurrentData,
    type: 'current'
  });
  
  //fetch data for forecast/future weather info!
  useFetchForecast({
    url: `${url}/forecast.json?key=${key}&q=${city}&days=3`,
    dependency: city,
    setData: setForcastData
  });

  //fetch data for history weather info!
  useFetchHistory({
    url: `${url}/history.json?key=${key}&q=${city}&dt=`,
    dependency: city,
    setData: setHistoryData
  });

  //auto-complete search-suggestion api
  useEffect(() => {
    if(!search) return;
    try {
      async function fetchData() {
        const raw = await fetch(`${url}/search.json?key=${key}&q=${search}`);
        const json = await raw.json();

        setAutoSuggestions(json);
        console.log(json);
      } 

      setTimeout(() => fetchData(), 150);
    } catch(err) {
      console.log('Error during autocomplete-fetch data: ', err);
    }
  }, [search]);

  function handleSuggestClick(e) {
    e.stopPropagation();
    // if(e.target.tagName !== 'LI' || e.target.tagName !== 'SPAN') return;

    const data = e.target.closest('li');
    setCity(data.firstChild.textContent);
    setIsToggle(false); //off the suggestions
    handleLoader(); //to visible results!!

    console.log('You click -> ', data.firstChild.textContent);
  }
  

  return (
    <section className={`w-full min-h-screen flex flex-col justify-between gap-10 items-center smooth
    ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-black/90 text-white' }`}
     onClick={(e) => {
      e.stopPropagation();
      if(isToggle) setIsToggle(false);
      setSearch('');
     }}>
      <ThemeContext.Provider value={{
        theme
      }}>
        <div className={`w-full ${theme === 'light' ? 'bg-sky-100' : 'bg-sky-950'} text-center shadow-sm flex items-center justify-center gap-4 smooth`}>
          <img src="https://uxwing.com/wp-content/themes/uxwing/download/weather/weather-icon.png" 
          className='w-12 custom_animation_1'/>

          <h3 className='text-2xl tracking-wide font-medium p-4 text-sky-500 text-shadow-sm '>
            Weather App
          </h3>

          { theme === 'dark' 
            ?
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 fixed right-4 md:right-14 top-3.5 md:top-4 bg-black/10 text-sky-600 p-1.5 rounded-full cursor-pointer" 
            onClick={() => handleTheme()}>

              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
            </svg>
            : 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 fixed right-4 md:right-14 top-3.5 md:top-4 bg-black/10 text-sky-600 p-1.5 rotate-6 rounded-full cursor-pointer"
            onClick={() => handleTheme()}>

              <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
            </svg>
          }
        </div>

        <InputGroup 
          onChange={handleSearchInput} 
          value={search} 
          onSmash={handleSearchBtn} 
          setCity={setCity}   
          search={search} 
          loader={handleLoader}
          autoSuggestions={autoSuggestions} 
          selectSuggetion={handleSuggestClick}
          isToggle={isToggle}
        />

        {isLoader && <p>Search first!</p>}

        {!isLoader &&
          <WeatherBoardComponent weatherData={data}/>
        } 
        {!isLoader &&
          <HistoryBoardComponet historyData={historyData}/>
        }
        {!isLoader &&
          <ForecastBoardComponet forecastData={forcastData} />
        }

        <div className='w-full text-center p-4 bg-sky-950 text-white flex justify-center items-center gap-2'>
          <span className='text-base sm:text-lg tracking-wide text-shadow-sm text-shadow-red-400'>
            Made by Ron with 
          </span>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5 text-red-500 shadow-md">
            <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
          </svg>

        </div>

      </ThemeContext.Provider>
    </section>
  );
}
