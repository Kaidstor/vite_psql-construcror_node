import React, {useContext, useState} from 'react';
import axios from "axios";
import {FieldContext} from "../../context/FieldContext.js";
import {SaveTableContext, SaveTableDispatchContext} from "../../context/SaveTableContext.js";

const ImgField = () => {
   const field = useContext(FieldContext)
   const state = useContext(SaveTableContext)
   const dispatch = useContext(SaveTableDispatchContext)
   const [drag, setDrag] = useState(false)
   const [img, setImg] = useState(state?.[field.id] ? import.meta.env.VITE_REACT_API_IMG_URL + state?.[field.id] : '')

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
         type: 'changeCol',
         col: field.id,
         value: {files: files}
      })

      setImg(URL.createObjectURL(files[0]))

      setDrag(false)
   }

   return (
      <div>
         drop place

         <div>
            {
               drag
               ? <div
                     onDragStart={e => dragStartHandler(e)}
                     onDragLeave={e => dragLeaveHandler( e)}
                     onDragOver={e => dragStartHandler(e)}
                     onDrop={e => dropHandler(e)}
                     className='bg-sky-100 h-[100px] w-[200px]'
                  >file drop</div>
               : <div
                  onDragStart={e => dragStartHandler(e)}
                  onDragLeave={e => dragLeaveHandler( e)}
                  onDragOver={e => dragStartHandler(e)}
                     className='bg-sky-100 h-[100px] w-[200px]'
                  >file here</div>
            }
         </div>

         <img id={`col_img_${field.id}`} src={img} alt=""/>
      </div>
   );
};

export default ImgField;