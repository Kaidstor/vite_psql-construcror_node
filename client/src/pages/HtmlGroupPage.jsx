import React, {useEffect, useState} from 'react';
import {Button} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {addElementToHtmlGroup, getHtmlGroup, updateHtmlGroup} from "../http/htmlGroupAPI.js";
import {getHtmlElements} from "../http/htmlElementAPI.js";
import HtmlGroupView from "../components/HtmlGroupView.jsx";
import Select from "../components/ui/Select.jsx";
import InputText from "../components/ui/InputText.jsx";

const HtmlGroupPage = () => {
   const {id} = useParams()
   const [elements, setElements] = useState([])

   const {isLoading, data} = useQuery({
      queryKey: ['htmlGroup', id],
      queryFn: () => getHtmlGroup(id)
   })


   const {data: htmlElements, isLoadingElements} = useQuery({
      queryKey: ['elements'],
      queryFn: getHtmlElements
   })

   const [name, setName] = useState('Loading...')
   const [selectedElement, setSelectedElement] = useState(-1)
   const [width, setWidth] = useState(0)
   const [height, setHeight] = useState(0)

   useEffect(() => {
      setName(data?.name || 'no name')
      setWidth(data?.size?.width || '')
      setHeight(data?.size?.height || '')
      setElements(data?.elements || [])

   }, [isLoading])

   function onResize(e, handler) {
      if (isNaN(e.target.value)) return
      handler(e.target.value)
   }

   if(isLoading) return <div>Loading...</div>

   return (
      <div>
         <div className='flex gap-4 items-center'>
            <InputText
               value={name}
               onChange={() => console.log('ok')}
            />
            <Button variant='outlined'
                    onClick={() => {
                       updateHtmlGroup(id, {name,
                       size: {
                          width, height
                       }, elements: elements})
                    }}
            >Сохранить</Button>
         </div>
         <div className='flex gap-4 items-center max-w-sm'>
            <InputText
               placeholder='Ширина'
               value={width}
               onChange={e => onResize(e, setWidth)}
            />
            <InputText
               placeholder='Высота'
               value={height}
               onChange={e => onResize(e, setHeight)}
            />

            <Select value={selectedElement} onChange={e => setSelectedElement(e.target.value)} data={htmlElements}/>
            <Button
               onClick={() => addElementToHtmlGroup(data.id, selectedElement)}
            >add elem
            </Button>
         </div>



         <HtmlGroupView
            width={width}
            height={height}
            elements={elements}
            setElements={setElements}
            groupId={data.id}
            bkgImg={data.bkgImg}/>
      </div>
   );
};

export default HtmlGroupPage;


