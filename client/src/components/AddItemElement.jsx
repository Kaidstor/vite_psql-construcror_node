import {useContext, useRef, useState} from 'react';
import {Button} from "@mui/material";
import {CreateFunctionContext} from "../context/CreateFunctionContext.js";

const AddItemElement = ({className}) => {
   const [name, setName] = useState('')
   const modal = useRef(null)

   const createFunction = useContext(CreateFunctionContext)

   return (
      <div className={className}>
         <dialog ref={modal} className='w-3/4 max-w-xl p-0 bg-transparent'>
            <div className='w-full h-full flex flex-col gap-4 p-8 rounded-md bg-sky-500'>
               <input className='w-full rounded-md p-2 text-sm font-medium'
                      value={name}
                      onChange={e => setName(e.target.value)}
                      type="text"
                      placeholder='Наименование'
               />

               <div className='w-full flex justify-between gap-4'>
                  <Button
                     variant="outlined"
                     className='px-8'
                     onClick={() => modal.current?.close()}
                  >Назад</Button>

                  <Button
                     variant="outlined"
                     className='px-8'
                     onClick={() => createFunction(name)}
                  >Добавить</Button>
               </div>
            </div>
         </dialog>

         <Button onClick={() => modal.current?.showModal()}>Добавить</Button>
      </div>
   );
};

export default AddItemElement;