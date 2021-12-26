import React from 'react'
import "./ImageContainer.css";
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ViewListIcon from '@mui/icons-material/ViewList';

const base_url = "https://image.tmdb.org/t/p/original/";
function ImageContainer({isLargeRow, movie}) {
    return (
        <div className="ImageContainer">
            <img
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow? movie?.poster_path : movie?.backdrop_path}`} 
                alt={movie.name}
            />
            <div className={`ImageContainer__icons ${isLargeRow && `ImageContainer__iconsLarge`}`}>
                <ShareIcon/>
                <FavoriteBorderIcon/>
                <ViewListIcon/>
            </div>
        </div>
    )
}

export default ImageContainer
