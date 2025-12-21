import { useState } from "react";

export function MangeList({ itemList, onClear }) {
  return (
    <ul className='w-full max-w-[90%] flex flex-wrap items-center gap-4'>
      {itemList.map(item => (
        <ListBox key={item.id} item={item} onClear={onClear}/>
      ))}
    </ul>
  );
}

function ListBox({ item, onClear }) {
  const [isEdit, setIsEdit] = useState(false);
  const [info, setInfo] = useState({name:item.name, city:item.city});


  function handleEditBtn() {
    setIsEdit(!isEdit);
  }

  function handleNameEdit(editName) {
    setInfo({
      ...info,
      name:editName
    });
  } 

  function handleCityEdit(editCity) {
    setInfo({
      ...info,
      city:editCity
    });
  }

  function handleSave() {
    setIsEdit(!isEdit);
  }


  let content;
  if(isEdit) {
    content = <>
        <div className='flex flex-col gap-1'>
          <Input placeName={'Name'} value={info.name} handleIt={handleNameEdit} />
          <Input placeName={'City'} value={info.city} handleIt={handleCityEdit} />
        </div>
         
        <div className='w-full flex justify-between items-center'>
          <button onClick={() => {
            onClear(item.id)
          }}
           className='bg-pink-700 text-white py-1 px-4 rounded-sm text-sm cursor-pointer hover:scale-[1.03]'>
            Delete
          </button>

          <div className='flex items-center gap-2'>
            <button onClick={() => handleEditBtn()}
             className='bg-gray-200  py-1 px-3 rounded-sm text-sm cursor-pointer hover:scale-[1.03]'>
              Cancel
            </button>

            <button onClick={() => handleSave()}
             className='bg-sky-700 text-white py-1 px-2.5 rounded-sm text-sm cursor-pointer hover:scale-[1.03]'>
              Save
            </button>
          </div>
        </div> 
    </>
  }

  return (
    <li className='bg-white/85 w-[320px] h-36 p-4 rounded-lg shadow-sm flex flex-col justify-between hover:shadow-lg hover:scale-[1.012]'>
        { isEdit ? content : 
          <>
            <div className='flex flex-col gap-0'>
              <b className='text-lg'>{info.name}</b>
              <span className='text-sm text-gray-500'>{info.city}</span>
            </div>
            
            <div className='flex justify-end'>
              <button type='button' onClick={() => handleEditBtn()}
              className='bg-gray-200 py-1 px-4 rounded-sm text-sm cursor-pointer hover:bg-gray-300/80'>
                Edit
              </button>
            </div> 
          </>
        }
    </li>
  )
}

function Input({ placeName, handleIt, value }) {
  return (
    <input value={value} onChange={(e) => handleIt(e.target.value)}
      type="text" 
      placeholder={placeName} 
      className='border p-1 text-base font-medium text-gray-700 tracking-wide text-center placeholder:text-start border-gray-600 rounded-sm focus:outline-red-400'
    />
  );
}

 