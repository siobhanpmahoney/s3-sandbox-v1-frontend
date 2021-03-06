import React from 'react'
import {Link} from 'react-router-dom'
import {withRouter} from 'react-router'
import Loader from '../utils/Loader'


// songId=trackId, songId=trackId

const AlbumSelectionItem = (props) => {

  const songVersionParams = () => {
    let songArray = props.album.songs
    return songArray.map((song) => {
      return `${song.id}=${song.versions[0].id}`
    }).join("&")
  }

  const generatePath = () => {
    return
  }

  console.log(`/albums/${props.album.id}?tracks=${songVersionParams()}`)



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
                 <Link onClick={() => props.generatePlaylist(props.album.id)} className="albumTeaser__titleLink" to ={`/albums/${props.album.id}?tracks=${songVersionParams()}`}>
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
