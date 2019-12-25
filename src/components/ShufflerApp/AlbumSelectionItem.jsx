import React from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import Loader from '../utils/Loader'

const AlbumSelectionItem = (props) => {
  const songVersionParams = () => {
    let songArray = props.album.songs
    console.log(songArray)
  }



    return (

      !!props.album ? (

      <div className="albumTeaser">
           <div className="albumTeaser__inner">

             <div className="albumTeaser__image">
               <div className="albumTeaser__imageLink">
                 <img className="albumTeaser__image__element" src={props.album.image} />
               </div>
             </div>

             <header className="albumTeaser__header">
               <h3 className="albumTeaser__title">
                 <Link onClick={() => props.generatePlaylist(props.album.id)} className="albumTeaser__titleLink" to ={`/playlist?album=${props.album.id}`}>
                   {props.album.title}
                 </Link>
               </h3>
             </header>

             <div className="albumTeaser__entrySummary">

             </div>

           </div>

         </div>
    )
   : (
    <Loader />
  )
)
}

export default withRouter(AlbumSelectionItem)
