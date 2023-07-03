import React from 'react';
import parse from 'html-react-parser';
import HtmlGroup from "./HtmlGroup.jsx";

const HtmlGroupView = ({width, height, groupId, bkgImg, elements, setElements, ...props}) => {
   function mouseDownHandler(e) {
      const draggable = e.currentTarget
      const parent = document.getElementById(`group-${groupId}`)

         let newLeft, newTop

      // офаем выделение
      draggable.onselectstart = (e) => e.preventDefault()

      const shiftX = e.clientX - draggable.getBoundingClientRect().left
      const shiftY = e.clientY - draggable.getBoundingClientRect().top

      // @ts-ignore
      moveAt(e)

      function moveAt(e) {
         newLeft = e.clientX - shiftX - parent.getBoundingClientRect().left
         newTop = e.clientY - shiftY - parent.getBoundingClientRect().top

         const rightEdge = parent.offsetWidth - draggable.offsetWidth
         const bottomEdge = parent.offsetHeight - draggable.offsetHeight

         if (newLeft < 0 || rightEdge < 0) newLeft = 0
         else if (newLeft > rightEdge)
            newLeft = rightEdge;

         if (newTop < 0 || bottomEdge < 0) newTop = 0
         else if (newTop > bottomEdge)
            newTop = bottomEdge

         draggable.style.left = newLeft + 'px'
         draggable.style.top = newTop + 'px'
      }

      document.addEventListener('mousemove', moveAt)

      document.onmouseup = () => {
         document.removeEventListener('mousemove', moveAt)

         setElements(elements.map((el, i) => {
            if (String(i) === draggable.dataset.index) {
               console.log(i, draggable.dataset.index)
               el.coords = {
                  left: newLeft,
                  top: newTop
               }
            }
            return el
         }))

         document.onmouseup = null
      }
   }

   return (
      <div style={{position: 'relative', background: bkgImg ? `url(${bkgImg})` : 'gray', backgroundSize: '100% 100%', width: `${width}px`, height: `${height}px`}} {...props}
           id={`group-${groupId}`}>
         {
            elements?.map((el, i) =>
               <div
                  onMouseDown={mouseDownHandler}
                  onDragStart={e => e.preventDefault()}
                  style={{
                     top: el?.coords?.top || 0,
                     left: el?.coords?.left || 0,
                     position: "absolute",
                     cursor: "pointer"
                  }}
                  data-index={i}
                  key={i}>
                  {
                     el.hasOwnProperty('elements')
                        ?
                           <HtmlGroup
                              key={i}
                              width={el.size?.width}
                              height={el.size?.height}
                              id={el.id}
                              bkgImg={el.bkgImg}
                              elements={el.elements}
                           />
                        :
                           parse(el?.html || '')}
               </div>
            )
         }
      </div>
   )
};

export default HtmlGroupView;