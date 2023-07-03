import React, {useContext, useEffect, useState} from 'react';
import {Button} from "@mui/material";
import SelectField from "../ui/SelectField.jsx";
import {FieldContext} from "../../context/FieldContext.js";
import HtmlGroupView from "../HtmlGroupView.jsx";
import {HtmlGroupsAndElementsListContext} from "../../context/HtmlGroupsAndElementsListContext.js";
import {SaveTableContext, SaveTableDispatchContext} from "../../context/SaveTableContext.js";

const HtmlContainerField = () => {
   const field = useContext(FieldContext)
   const state = useContext(SaveTableContext);
   const dispatch = useContext(SaveTableDispatchContext);

   const [width, setWidth] = useState(state?.[field.id]?.width?.toString() || '')
   const [height, setHeight] = useState(state?.[field.id]?.height?.toString() || '')
   const [selectedElement, setSelectedElement] = useState(-1)

   const [elements, setElements] = useState(state?.[field.id]?.elements || [])

   const HtmlGroupsAndElements = useContext(HtmlGroupsAndElementsListContext)


   const [drag, setDrag] = useState(false)
   const [img, setImg] = useState(state?.[field.id]?.files ? import.meta.env.VITE_REACT_API_IMG_URL + state?.[field.id].files : '')

   function dragStartHandler(e){
      e.preventDefault()
      setDrag(true)
   }
   function dragLeaveHandler(e){
      e.preventDefault()
      setDrag(false)
   }

   function dropHandler(e){
      e.preventDefault()
      let files = [...e.dataTransfer.files]

      dispatch({
         type: 'setImgHtmlContainer',
         col: field.id,
         value: {files: files}
      })

      setImg(URL.createObjectURL(files[0]))

      setDrag(false)
   }

   function onResize(e, handler){
      handler(e.target.value)
   }

   useEffect(() => {
      dispatch({
         type: 'changeCol',
         col: field.id,
         value: {width, height, elements, files: state?.[field.id]?.files || []}
      })
   }, [width, height])

   return (
      <>
         <div className='flex gap-4 mt-4'>
            <div className='flex flex-col'>
               <label htmlFor={`col_${field.id}_height`}>Высота</label>
               <input
                  id={`col_${field.id}_height`}
                  type='number'
                  className='h-[2.5rem] border-[1px] rounded-md px-2 py-1 border-gray-300'
                  value={height}
                  onChange={e => onResize(e, setHeight)} placeholder='Высота группы'/>
            </div>
            <div className='flex flex-col'>
               <label htmlFor={`col_${field.id}_width`}>Ширина</label>
               <input
                  id={`col_${field.id}_width`}
                  type='number'
                  className='h-[2.5rem] border-[1px] rounded-md px-2 py-1 border-gray-300'
                  value={width}
                  onChange={e => onResize(e, setWidth)} placeholder='Ширина группы'/>
            </div>

            <div>
               <p>Добавить элемент</p>
               <div className='flex gap-4'>
                  <SelectField value={selectedElement} onChange={e => setSelectedElement(e.target.value)}/>
                  <Button variant='outlined' onClick={() => {
                     const newValue = [...elements, {...HtmlGroupsAndElements[selectedElement]}]
                     dispatch({type: 'changeCol', col: field.id, value: {width, height, elements: newValue}})
                     setElements(newValue)
                  }}>Добавить</Button>
                  <Button variant='outlined' onClick={() => console.log(elements)}>test</Button>
               </div>
            </div>
         </div>

         <div className='mt-4' style={{background: '#00000008', position: "relative", width: "fit-content"}}>

            <div>
               {
                  drag
                     ? <div
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler( e)}
                        onDragOver={e => dragStartHandler(e)}
                        onDrop={e => dropHandler(e)}
                        className='bg-sky-100'
                        style={{height: `${height}px`,  width: `${width}px`}}
                     >file drop</div>
                     : <HtmlGroupView
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler( e)}
                        onDragOver={e => dragStartHandler(e)}
                        bkgImg={img}
                        width={width} height={height} elements={elements} setElements={setElements}
                     />
               }
            </div>
         </div>
      </>
   );
};

export default HtmlContainerField;