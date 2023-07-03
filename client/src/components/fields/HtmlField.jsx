import React, {useContext, useEffect, useRef, useState} from 'react';
import {FieldContext} from "../../context/FieldContext.js";

const HtmlField = (id) => {
   const preview = useRef(null)
   const field = useContext(FieldContext)
   const [html, setHtml] = useState('')

   useEffect(() => {
      preview.current.innerHTML = html
      console.log('changed')
      console.log(preview)
   }, [html])

   return (
      <>
         <div className='flex flex-col gap-4'>
            <p className='text-xl font-medium'>Превью</p>
            <div id='element-preview'></div>

            <p className='text-xl font-medium'>Код элемента</p>
            <textarea
               value={html}
               onChange={e => {
                  const preview = document.getElementById(`col_${field.id}_element-preview`);
                  if (preview) preview.innerHTML = e.target.value.trim() || 'Пока что элемент пуст.'
                  setHtml(e.target.value)
               }}
               placeholder='HTML'
               className='rounded-md p-2 border-[1px] border-gray-300'
               name="html"
               cols={30} rows={10}
            />

            <div ref={preview}></div>
         </div>
      </>
   )
};

export default HtmlField;