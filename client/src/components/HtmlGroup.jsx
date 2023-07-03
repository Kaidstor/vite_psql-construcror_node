import React from 'react';
import parse from 'html-react-parser';

const HtmlGroup = ({width, height, groupId, bkgImg, elements}) => {
   return (
      <div style={{position: 'relative', background: bkgImg ? `url(${bkgImg})` : '#00000020', width: `${width}px`, height: `${height}px`}}
           id={`group-${groupId}`}>
         {
            elements?.map((el, i) => {
                  return <div
                     style={{
                        top: el?.coords?.top || 0,
                        left: el?.coords?.left || 0,
                        position: "absolute"
                     }}
                     data-index={i}
                     key={i}>
                     {parse(el?.html || '')}
                  </div>
               }
            )
         }
      </div>
   )
};

export default HtmlGroup;