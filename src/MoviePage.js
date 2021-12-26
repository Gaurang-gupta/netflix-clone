import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { selectMovieDetails, selectUserName, selectUserEmail } from './user/userSlice';
import "./MoviePage.css";
import { useHistory } from 'react-router';
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer'
import db from './firebase';

function MoviePage() {
    const movie = useSelector(selectMovieDetails);
    const username = useSelector(selectUserName);
    const history = useHistory();
    const userEmail = useSelector(selectUserEmail);
    const [trailerUrl, setTrailerUrl] = useState("");
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };
    useEffect(() => {
        if (username === null || username.length === 0) {
            history.push("./");
        }
    }, [username, history])
    console.log(movie)

    const handleClick = (movie) => {
        if (username) {
            if (trailerUrl) {
                setTrailerUrl("");
            } else {
                movieTrailer(movie?.title || movie?.name || movie?.original_name || movie?.original_name || "")
                    .then((url) => {
                        const urlParams = new URLSearchParams(new URL(url).search);
                        setTrailerUrl(urlParams.get('v'));
                    })
                    .catch((error) => console.log(error));
            }
        }
        else {
            alert("No user found please login")
        }
    }

    const favourites = async (movie) => {
        await db.collection("Users").doc(userEmail).collection("favourites").add(movie);
        alert("Added to favourites")
    }

    const watchlist = (movie) => {
        db.collection("Users").doc(userEmail).collection("watchlist").add(movie)
        alert("Added to watchlist")
    }

    return (
        <header style={{
            backgroundSize: "cover",
            backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie.poster_path}"
                )`,
            backgroundPosition: "center center",
            backgroundAttachment: 'fixed',
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            paddingBottom: "40px",
        }}
        >
            <div className="moviePage__div">
                <h1 className="moviePage__name">{movie?.name || movie?.title}</h1>
            </div>
            <div className="moviePage__description">
                {movie?.overview}
            </div>
            <div className={`moviePage__buttonContainer ${trailerUrl && "moviePage__trailer"}`}>
                <button onClick={() => handleClick(movie)} className="moviePage__button">Trailer</button>
                <button onClick={() => favourites(movie)} className="moviePage__button moviePage__favourite">Add to favourites</button>
                <button onClick={() => watchlist(movie)} className="moviePage__button moviePage__favourite">Add to watchlater</button>
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </header>
    )
}

export default MoviePage
