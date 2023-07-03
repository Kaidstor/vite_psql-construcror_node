import React, {useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getEntities} from "../http/tableAPI.js";
import {Link} from "react-router-dom";
import InputText from "../components/ui/InputText.jsx";

const TablesList = ({tableId, tableInfo}) => {
   const {data, isLoading} = useQuery({
      queryKey: [tableId],
      queryFn: () => getEntities(tableId)
   })

   const [filter, setFilter] = useState('');

   const filterValues = tableInfo?.structure
      ? Object.keys(tableInfo?.structure).filter(infoKey => tableInfo?.structure[infoKey]?.type === 'text')
      : []

   return (
      isLoading
         ? 'Loading...'
         :
            <div className={'mt-4'}>
               <div>
                  <p className={'text-xl'}>Поиск по тексту в записях</p>
                  <InputText
                     type="text"
                     placeholder={'Поиск..'}
                     className={'mt-2 w-full'}
                     value={filter}
                     onChange={(e) => setFilter(e.target.value)}/>
               </div>

               <div className='mt-4 flex flex-col gap-4'>
                  { data?.map(table => {
                           if (!filter)
                              return <Link className='border-2 border-b-amber-400 hover:border-sky-400 p-2 rounded-md ' key={table.id} to={`${table.id}`}>
                                 <p className='text-xl'>{tableInfo?.name} {table.id}</p>
                                 {
                                    filterValues?.map(val => {
                                       return <div key={val} className='mt-2'>
                                          <p>{tableInfo?.structure[val]?.name}</p>
                                          <p>{table[val]}</p>
                                       </div>
                                    })
                                 }
                              </Link>

                           else {
                              let filterError = false
                              filterValues?.forEach(val => {
                                 if(!table[val].includes(filter))
                                    filterError = true
                              })
                              if (filterError) return;

                              return <Link className='border-2 border-b-amber-400 hover:border-sky-400 p-2 rounded-md ' key={table.id} to={`${table.id}`}>
                                 <p className='text-xl'>{tableInfo.name} {table.id}</p>
                                 {
                                    filterValues?.map(val => {
                                       return <div key={val} className='mt-2'>
                                          <p>{tableInfo?.structure[val]?.name}</p>
                                          <p>{table[val]}</p>
                                       </div>
                                    })
                                 }
                              </Link>
                           }
                        }
                     )
                  }
               </div>
            </div>
   );
};

export default TablesList;