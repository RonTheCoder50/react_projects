import { useState, useEffect } from 'react'
import './App.css'

export default function App() {
  return <MainComponent />
}

const mos = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function MainComponent() {
  const [countries, setCountries] = useState([]); //saved all countries names!
  const [isToggle, setIsToggle] = useState(false); //toggler for toggle from one state to another

  const [holidayList, setHolidayList] = useState([]); //saved selected country public_holidays!
  const [selected, setSelected] = useState({iso: '', name: ''}); //saved selected country - name & iso-name
  const [isLoad, setIsLoad] = useState(false);


  useEffect(() => {
    const fetchCountries = async() => {
      const url = 'https://openholidaysapi.org/Countries';
      const raw = await fetch(url);
      const json = await raw.json();

      setCountries(json);
      console.log('Json data of countries -> ', json);
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    if(selected.iso === '') return;
    const url = `https://openholidaysapi.org/PublicHolidays?countryIsoCode=${selected.iso}&languageIsoCode=EN&validFrom=2025-01-01&validTo=2025-12-30`;

    setIsLoad(true);
    setTimeout(() => {
      const fetchData = async() => {
        try {
          const raw = await fetch(url);
          if(!raw.ok) throw("Failed to fetch raw!");

          const json = await raw.json();
          setHolidayList(json);
        } catch(err) {
          console.log('Failed to fetch due to ==> ', err);
        }
      }

      fetchData();
      setIsLoad(false);
    }, 2000);
  }, [selected.iso]);

  function handleToggle() {
    setIsToggle(prev => !prev);
  }

  function handleSelect(e) {
    if(e.target.tagName !== 'LI') {
      return;
    }

    const countryIso = e.target.dataset.country;
    const countryName = e.target.dataset.txt;

    setIsToggle(false);
    setSelected({
      iso: countryIso,
      name: countryName
    });
    console.log("selected country -> ", countryIso); 
  }

  return (
    <div className='flex flex-col items-center w-full min-h-screen paper container'>
      <h1 className='text-xl tracking-wide font-semibold border-2 py-1 px-8 hover:shadow-md cursor-pointer hover:bg-gray-50' onClick={() => handleToggle()}>
        {selected.name !== '' ? selected.name : 'Countries'}
      </h1> 

      {isLoad && <p className='text-2xl font-semibold text-center'>Loading....</p>}

      {isToggle && 
      <ul className='flex flex-col items-center gap-2 w-full max-w-[400px] bg-gray-50 p-1 h-80 overflow-y-auto shadow-md'
        onClick={(e) => handleSelect(e)}>
        {countries.map(country => (
          <li className='text-lg p-2 w-full hover:bg-white/80 text-center tracking-wide hover:shadow-sm cursor-pointer' data-country={country.isoCode} data-txt={country.name[0].text} key={country.isoCode}>
            {country.name[0].text}
          </li>
        ))}
      </ul>}

      {selected.iso.length > 0 && !isLoad && !isToggle &&
        <ul className='flex flex-col gap-4 w-full max-w-[450px]'>
            {holidayList.map(item => (
              <li className='w-full p-1 flex items-center gap-4 text-sm tracking-normal hover:shadow-sm w-full' 
              key={item.id}>
                <DateOfDay item={item} />
                <b>
                  {item.name[0]?.text}
                </b>
              </li>
            ))}
        </ul>
      }
    </div>
  );
}

function DateOfDay({ item }) {
  const date = new Date(item.startDate);
  const month = mos[date.getMonth()];
  return <span>{date.getDate() + ' ' + month}</span>
} 

 
