import React from 'react'
import Tooltip from '@material-ui/core/Tooltip';

const FavouriteIcon = ({toggleFav, isFav}) => {
  const favon = {fill: '#e50019', stroke: 'rgba(0, 0, 0, 1)', strokeMiterlimit: 10, strokeWidth: '8px'}
  const favoff = {fill: '#FFFFFF', stroke: 'rgba(0, 0, 0, 1)', strokeMiterlimit: 10, strokeWidth: '8px'}

  //Get value of language from local storage
  let lang = localStorage.getItem("language")

  return(
    <Tooltip title={isFav ? lang === "English" ? "Remove from favourites" : "Supprimer des favoris" : lang === "English" ? "Add to favourites" : "Ajouter aux Favoris"}>
      <span className="icon-container">
        <svg viewBox="0 0 120 130" style={{width: '2.5rem', height: '2.5rem'}}>
          <path 
            data-name="heart" 
            className="heart" 
            style={isFav ? favon : favoff }
            data-active={isFav}
            onClick={(ev => toggleFav(ev))}
            d="M50.1,22.64c1.33-1.82,2.5-3.43,3.67-5.04c7.26-10.92,21.99-13.89,32.91-6.63c2.95,1.96,5.42,4.55,7.23,7.59c7.85,12.16,6.66,28.06-2.9,38.93c-7.39,8.27-15.41,15.96-23.98,23c-5.02,4.23-10.2,8.29-15.28,12.45c-0.8,0.89-2.17,0.97-3.06,0.17c-0.01-0.01-0.03-0.02-0.04-0.04C35.32,83.01,22.81,71.9,11.26,59.84c-4.74-4.78-8.05-10.8-9.54-17.37c-2.67-12.39,2.55-25.15,13.12-32.13c10.64-6.35,24.39-3.32,31.37,6.92C47.47,18.95,48.69,20.69,50.1,22.64z"
          />
        </svg>
      </span>
    </Tooltip>
  )
}

export default FavouriteIcon