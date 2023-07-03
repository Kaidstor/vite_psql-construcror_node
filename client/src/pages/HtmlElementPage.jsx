import React, {useEffect, useState, useRef} from 'react';
import {Button, Input} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getHtmlElement, updateHtmlElement} from "../http/htmlElementAPI.js";

const HtmlElementPage = () => {
   const {id} = useParams()
   const preview = useRef(null)
   const {isLoading, data} = useQuery({queryKey: ['htmlElement', id], queryFn: () => getHtmlElement(id)})
   const [name, setName] = useState('Loading...')
   const [html, setHtml] = useState('Loading...')

   useEffect(() => {
      setName(data?.name || 'no name')
      setHtml(data?.html || 'no html')
      preview.current.innerHTML = data?.html || 'no html'
   }, [isLoading])

   if(isLoading) return <div>Loading...</div>
   return (
      <div>
         <div className='flex gap-4 items-center'>
            <Input
               classes={{classes: 'text-2xl'}}
               sx={{fontSize: 40, width: '100%'}} // font size of input label
               className='my-4 text-2xl font-bold'
               value={name}
               onChange={() => console.log('ok')}
            />
            <Button variant='outlined'
               onClick={() => {
                  updateHtmlElement(id, {name, html})
               }}
            >Сохранить</Button>
         </div>

         <textarea
            onChange={e => {
               setHtml(e.target.value)
               preview.current.innerHTML = e.target.value
            }}
            name="preview_textarea" id="preview_textarea" cols="30" rows="10"
            value={html}
         >
         </textarea>

         <div ref={preview}></div>
      </div>
   );
};

export default HtmlElementPage;