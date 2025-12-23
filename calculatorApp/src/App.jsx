import { useState, useRef } from 'react'
import { evaluate } from 'mathjs';
import './App.css'
// import { evaluate } from 'mathjs';

const nonOperators = ['back', 'ans', 'theme', 'C'];

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);
  const [isDark, setIsDark] = useState(false);
    
  const currentExp = useRef('');

  let mainClass ='w-full min-h-screen flex flex-col gap-10 justify-center items-center';
  if(isDark) {
    mainClass += ' bg-black/90';
  } else {
    mainClass += ' bg-gray-300';
  }
  
  function handleInput(e) {
    // e.stopPropagation();
    let btn = e.target.closest('button');
    let val = btn.value;

    if(nonOperators.includes(val)) {
      handleNonOperators(val);
      return;
    }

    if(result !== 0) setResult(0);

    if(val === undefined || val === null) return;
    setExpression(prv => prv + val);

    currentExp.current += val;
    console.log('Input value --> ', currentExp.current);
  }

  //handles non operators { result, back,  clear etc..}
  function handleNonOperators(val) {
    console.log('logged -> ', val);

    switch(val) {
      case 'ans': {
        setExpression('');
        currentExp.current = '';
        setResult(findAnswer(expression).toFixed(2));
        break;
      }

      case 'C': {
        setResult('');
        setExpression('');
        currentExp.current = '';
        break;
      }

      case 'theme': {
        localStorage.setItem('theme', isDark);
        setIsDark(!isDark);
        break;
      }

      case 'back': {
        let value = expression.slice(0, -1);
        currentExp.current = value;
        setExpression(value);
        break;
      }

      default: console.log('error on input!');
    }
  }

  function findAnswer(expr) {
    return evaluate(expr);
  }

  return (
    <section className={mainClass}>
      <h2 className={`text-3xl ${isDark ? 'text-white/90' : 'text-sky-800'} text-shadow-sm`}>
        Calculator App
      </h2>
      <Main input={handleInput} exprValue={expression} result={result} isDark={isDark}/>
    </section>
  );
}

function Main({ input, exprValue, result, isDark }) {
  return (
    <section className={`w-full max-w-[400px] p-1 ${isDark ? 'bg-gray-600' : 'bg-white/60'} shadow-md rounded-lg flex flex-col gap-2`}>
      <button className={`h-32 ${isDark ? 'bg-gray-700 text-white/80' :'bg-gray-300/90 text-gray-500'} flex justify-end items-end py-1 px-3 text-3xl font-medium overflow-hidden`}>
        {result !== 0 ? result : exprValue}
      </button>

      <div onClick={(e) => input(e)} className={`grid grid-cols-4 p-2 gap-x-2 gap-y-3 text-2xl 
      ${isDark ? 'text-white bg-gray-800' : 'text-gray-600 bg-gray-200/80'} `}>

        <button value={'%'} className={isDark ? 'btn2' : 'btn'}>%</button>
        <button value={'*'} className={isDark ? 'btn2' : 'btn'}>X</button>
        <button value={'C'} className={isDark ? 'btn2' : 'btn'}>C</button>
        <button value={'back'} className={isDark ? 'btn2' : 'btn'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
          </svg>
        </button>

        <button value={'7'} className={isDark ? 'btn2' : 'btn'}>7</button>
        <button value={'8'} className={isDark ? 'btn2' : 'btn'}>8</button>
        <button value={'9'} className={isDark ? 'btn2' : 'btn'}>9</button>
        <button value={'/'} className={isDark ? 'btn2' : 'btn'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.499 11.998h15m-7.5-6.75h.008v.008h-.008v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM12 18.751h.007v.007H12v-.007Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </button>

        <button value={'6'} className={isDark ? 'btn2' : 'btn'}>6</button>
        <button value={'5'} className={isDark ? 'btn2' : 'btn'}>5</button>
        <button value={'4'} className={isDark ? 'btn2' : 'btn'}>4</button>
        <button value={'-'} className={isDark ? 'btn2' : 'btn'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"      stroke="currentColor" class="size-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
          </svg>
        </button>

        <button value={'3'} className={isDark ? 'btn2' : 'btn'}>3</button>
        <button value={'2'} className={isDark ? 'btn2' : 'btn'}>2</button>
        <button value={'1'} className={isDark ? 'btn2' : 'btn'}>1</button>
        <button value={'+'} className={isDark ? 'btn2' : 'btn'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        <button value={'theme'} className={isDark ? 'btn2' : 'btn'}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
          </svg>
        </button>
        <button value={'0'} className={isDark ? 'btn2' : 'btn'}>0</button>
        <button value={'.'} className={isDark ? 'btn2' : 'btn'}>.</button>
        <button value={'ans'} className={isDark ? 'btn2' : 'btn'}>
          <svg 
          style={{pointerEvents: 'all'}} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.499 8.248h15m-15 7.501h15"
          value={'ans'}/>
          </svg>
        </button>
      </div>
    </section>
  );
}
