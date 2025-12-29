// import { useContext } from "react";
// import { ThemeContext } from "./App";
import { useContext } from "react";
import { ThemeContext } from "./context";

let week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let keyId = 1;
 
export function WeatherBoardComponent({ weatherData }) {
    const { theme } = useContext(ThemeContext);
    console.log('theme at dashboard --> ', theme);

    let location = weatherData.location;
    let weather = weatherData.current;
    let time = location ? new Date(location.localtime) : '';

    let mon = time ? time.getMonth() : 0;
    let weekDay = time ? time.getDay() : 0;
    let date = time ? time.getDate() : 1;
    let iconSrc = weather?.condition?.icon;

    return (
        <section className={`${theme === 'light' ? 'bg-white/90 text-black' : 'bg-gray-700 text-white'} w-full max-w-[95%] lg:max-w-[900px] flex flex-col gap-12  py-8 px-6 shadow-md rounded-sm smooth`}>
            {/* header */}
            <div className="flex justify-between items-center tracking-wide px-2">
                <div className="flex flex-col gap-1 p-2">
                    <h2 className="font-normal sm:font-medium">
                        <b className="text-base sm:text-lg lg:text-2xl">{location?.name + ' , ' || '#'}</b> 
                        <span className="text-sm sm:text-base lg:text-lg">{location?.country || '#'}</span>
                    </h2>
                    <span className="text-sm sm:text-base font-light">
                        {/* sat | 22 dec */}
                        {`${week[weekDay]} | ${date} ${month[mon]}`}
                    </span>
                </div>
                 
                <div className="flex flex-col items-end gap-2 text-base">
                    <div className="flex items-center gap-2"> 
                        {iconSrc ? <img className="object-center  object-cover" src={iconSrc}/>  :
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                            className="size-5 sm:size-6 rotate-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                            </svg>
                        }
                        <div className="flex items-start relative text-balance">
                            <span className="text-base sm:text-2xl">{weather?.temp_c || '0'}</span>
                            <span className="-translate-y-1 text-xs">o</span>
                        </div>
                    </div>

                    <span className="text-xs md:text-sm mr-2">{weather?.condition.text || 'unknwon'}</span>
                </div>
            </div>

            {/* main section weather detail info! */}
            <div className="flex flex-col md:flex-row items-center justify-around gap-4 p-2">
                <ul className="flex flex-col gap-3 list-disc">
                    <ListItem title={'Temp-Celcius:'} value={weather?.temp_c || '0'}/>
                    <ListItem title={'Temp-Fahrenite:'} value={weather?.temp_f || '0'}/>
                    <ListItem title={'Feels-like:'} value={weather?.feelslike_c || '0'}/>
                </ul>
                 
                <ul className="flex flex-col gap-3 list-disc">
                    <ListItem title={'Humidity'} value={weather?.humidity || '0'}/>
                    <ListItem title={'Pressure'} value={weather?.pressure_in || '00'}/>
                    <ListItem title={'UV'} value={weather?.uv || 0}/>
                </ul>
                 
                <ul className="flex flex-col gap-3 list-disc">
                    <ListItem title={'Wind (kph)'} value={weather?.wind_kph || 0}/>
                    <ListItem title={'Wind (mph)'} value={weather?.wind_mph || 0}/>
                    <ListItem title={'Wind-chill (c)'} value={weather?.windchill_c || 0}/>
                </ul>
            </div>
        </section>
    );
}

function ListItem({title, value}) {
    const { theme } = useContext(ThemeContext);
    return (
        <li className={`flex justify-between items-center gap-2 p-2 hover:shadow-sm w-[200px] smooth
        ${theme === 'light' ? 'bg-gray-50 hover:bg-sky-50' : 'bg-gray-800 hover:bg-gray-900'}`}>
            <span className={`${theme === 'light' ? 'text-sky-600' : 'text-white/80'}`}>{title}</span>
            <b className={`${theme === 'light' ? 'text-sky-800/80' : 'text-white/90'}`}>{value}</b>
        </li>
    );
}

export function ForecastBoardComponet({ forecastData }) {
    const { theme } = useContext(ThemeContext);

    return (
        <section className={`w-full max-w-[95%] lg:max-w-[900px] flex flex-col gap-4 p-4 shadow-md rounded-sm 
        ${theme === 'light' ? 'bg-gray-200/40 hover:bg-gray-200/20' : 'bg-gray-700 hover:bg-gray-700/90'}`}>
            <div className="flex items-center gap-2">
                <img src="https://www.svgrepo.com/show/530233/weather.svg" alt="Weather SVG Vectors and Icons - SVG Repo" className="w-16 h-16 object-center object-cover"></img>

                <h2 className={`text-lg lg:text-xl tracking-wide font-medium underline underline-offset-2  ${theme === 'light' ? 'text-sky-500 decoration-sky-300' : 'text-white/80 decoration-gray-200'}`}>
                    Next 3 Days Forecast Weather Info
                </h2>
            </div>

            <hr className="w-full border-white/90 border"/>

            <div className="flex flex-wrap items-center gap-6 p-1 my-2">
                {forecastData.map((current) => (
                    <Box key={keyId++} data={current.day} location={current.date}/>
                ))}
            </div>
        </section>
    );
}

export function HistoryBoardComponet({ historyData }) {
    const { theme } = useContext(ThemeContext);

    return (
        <section className={`w-full max-w-[95%] lg:max-w-[900px] flex flex-col gap-4 p-4 shadow-md rounded-sm ${theme === 'light' ? 'bg-gray-200/40 hover:bg-gray-200/20' : 'bg-gray-700 hover:bg-gray-700/90'}`}>
            <div className="flex items-center gap-2">
                <img src="https://www.svgrepo.com/show/530233/weather.svg" alt="Weather SVG Vectors and Icons - SVG Repo" className="w-16 h-16 object-center object-cover"></img>

                <h2 className={`text-lg lg:text-xl tracking-wide font-medium underline underline-offset-2 ${theme === 'light' ? 'text-sky-500 decoration-sky-300' : 'text-white/80 decoration-gray-200'}`}>
                    Upto 7 Days History Weather Info
                </h2>
            </div>

            <hr className="w-full border-white/90 border"/>

            <div className="flex flex-wrap justify-around gap-4 lg:gap-0 p-1 my-2">
                {historyData.map((current) => (
                    <Box key={keyId++} data={current.forecast.forecastday[0].day} location={current.forecast.forecastday[0].date}/>
                ))}
            </div>
        </section>
    );
}

function Box({ data, location }) {
    const { theme } = useContext(ThemeContext);

    let date = new Date(location);
    const day = week[date.getDay()];
    const temp = data.avgtemp_c;
    const fah = data.avgtemp_f;
    const icon = data.condition.icon;

    return (
        <div className={`w-28 shadow-sm aspect-square  flex flex-col gap-2 items-center p-2 rounded-sm hover:scale-[1.02] ${theme === 'light' ? 'bg-sky-50' : 'bg-gray-600'}`}>
            <span className="text-base font-light">{day ? day : 'null'}</span>
            <img src={icon ? icon : ''}  className="mx-auto"/>
            <div className="w-full flex items-center justify-around tracking-normal text-sm">
                <span>{temp ? `${temp}C` : 0}</span>
                <span> | </span>
                <span>{fah ? `${fah}F` : 0}</span>
            </div>
        </div>
    );
}


