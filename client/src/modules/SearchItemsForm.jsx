import React, {FC, useState} from 'react'
import AddItemElement from "../components/AddItemElement";
import {NavLink} from "react-router-dom";


const SearchItemsForm = ({isLoading, data}) => {
   const [filter, setFilter] = useState('')

   const filterHandler = el => el.name?.toLocaleLowerCase().includes(filter)

   return (
      <div>
         <div className='flex gap-4'>
            <input
               className={'border-[1px] rounded-md px-2 min-w-[300px]'}
               onChange={e => setFilter(e.target.value)}
               value={filter}
               placeholder='Поиск'/>
            <AddItemElement/>
         </div>

         {
            isLoading ?
               'Loading..'
               :
               <div className='mt-4 flex flex-col gap-4'>
                  {
                     data &&
                     data?.filter(filterHandler).map(el =>
                        <div className='flex items-center justify-between p-2 bg-sky-600 rounded-md' key={el.id}>
                           <NavLink to={`${el.id}`}>{el.name || 'no name'}</NavLink>
                        </div>
                     )
                  }
               </div>
         }
      </div>
   )
}

export default SearchItemsForm