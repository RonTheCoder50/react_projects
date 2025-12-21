import { useState } from 'react';
import './App.css';
import { ItemList } from './data';
import { MangeList } from './manageList';

import { useReducer } from 'react';
import { taskReducer } from './reducer';

let nextId = 11;

export default function App() {
  //ItemList is initialstate from data.jsx
  const [items, dispatch] = useReducer(taskReducer, ItemList); 
  const [info, setInfo] = useState({name: '', city: ''});

  const name = info.name;
  const city = info.city;

  function handleUserName(nameText) {
    setInfo({
      city,
      name: nameText
    });
  }

  function handleUserCity(cityName) {
    setInfo({
      name,
      city: cityName
    })
  }

  function addTask() {
    if(name === '' || city === '') return;

    dispatch({
      type: 'add',
      name: name,
      city: city,
      id: nextId++
    });

    setInfo({
      name: '',
      city: ''
    });
  }

  function handleDelete(itemId) {
    dispatch({
      type: 'delete',
      id: itemId
    })
  }

  return (
    <section className='bg-gray-200 min-h-screen w-full p-20 flex flex-col gap-7'> {/* main section*/}
      <div>
        <h1 className='text-3xl font-normal'>Contact Book</h1>
        <p className='text-base font-light'>Keep track of where your friends live</p>
      </div>

      <MainInput onChangeInput1={handleUserName} onChangeInput2={handleUserCity} 
        onClick={addTask} name={name} city={city}
      />
      <MangeList itemList={items} onClear={handleDelete}/>
    </section>
  );
}

function MainInput({ onChangeInput1, onChangeInput2, onClick, name, city}) {

  return (
    <div 
    className='w-full max-w-[600px] flex flex-wrap items-center justify-between gap-6 bg-white p-5'
    >
      <div className='flex items-center gap-2'>
        <Input value={name} placeName={'Name'} handleIt={onChangeInput1}/>
        <Input value={city} placeName={'City'} handleIt={onChangeInput2}/>
      </div>

      <button onClick={onClick} type='button'
      className='bg-blue-800 py-2 px-3 rounded-md text-white text-sm hover:bg-gray-100 hover:text-blue-700 transition-all delay-75 duration-300 ease-in-out hover:shadow-md cursor-pointer'>
        Add Contact
      </button>
    </div>
  )
}

//useful component known as input!!
function Input({ placeName, handleIt, value }) {
  return (
    <input value={value} onChange={(e) => handleIt(e.target.value)}
      type="text" 
      placeholder={placeName} 
      className='border p-1 text-base font-medium text-gray-700 tracking-wide text-center 
      placeholder:text-start border-gray-600 rounded-sm focus:outline-sky-500'
    />
  );
}


 