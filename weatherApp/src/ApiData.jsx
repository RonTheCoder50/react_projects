import { useEffect } from "react";
let date = new Date();

//for current fetch.
export function useFetch({ url, dependency, setData }) {
    useEffect(() => {
        if(!url || !dependency) return;

        async function fetchData() {
            try {
                const raw = await fetch(url);
                const json = await raw.json();

                setData(json);
                console.log('current : ');
                console.log(json);
            } catch(err) {
                console.log('Failed to Fetch due to -> ', err);
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        }

        fetchData();
    }, [url, dependency, setData]);
}

//for history fetch.
export function useFetchHistory({ url, dependency, setData }) {
    useEffect(() => {
        if(!url || !dependency) return;

        async function fetchData() {
            try {
                for(let day=7; day>=1; day--) {
                    let pastDate = new Date(date.getTime() - day * 24 * 60 * 60 * 1000);
                    let updateDate = `${pastDate.getFullYear()}-${pastDate.getMonth()+1}-${pastDate.getDate()}`;
                    
                    const raw = await fetch(url+updateDate);
                    const json = await raw.json();

                    setData(prev => [...prev, json]);
                    // console.log("history data array -> ", json);
                }   
            } catch(err) {
                console.log('error -> ', err);
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        }

        fetchData();

        return () => setData([]);
    }, [url, dependency, setData]);
}

//for future fetch.
export function useFetchForecast({ url, dependency, setData }) {
    useEffect(() => {
        if(!url || !dependency) return;

        async function fetchData() {
            try {
                const raw = await fetch(url);
                const json = await raw.json();

                setData(json.forecast.forecastday); 
                console.log('forecast:');
                console.log(json.forecast.forecastday);
            } catch(err) {
                console.log('error -> ', err); 
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        }

        fetchData();
    }, [url, dependency, setData]);
}

 