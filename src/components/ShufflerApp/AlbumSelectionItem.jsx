import React from 'react'

const AlbumSelectionItem = ({album}) => {
  console.log(album)
  return (
    <div className="albumTeaser">
         <div className="albumTeaser__inner">

           <div className="albumTeaser__image">
             <div className="albumTeaser__imageLink">
               <img className="albumTeaser__image__element" src={album.image} />
             </div>
           </div>

           <header className="albumTeaser__header">
             <h3 className="albumTeaser__title">
               <a className="albumTeaser__titleLink" href="#" target="_blank">
                 {album.title}
               </a>
             </h3>
           </header>

           <div className="albumTeaser__entrySummary">

           </div>

         </div>

       </div>
  )
}

export default AlbumSelectionItem
