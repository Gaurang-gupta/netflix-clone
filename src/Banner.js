import React, { useEffect, useState } from 'react'
import axios from './axios';
import requests from './requests';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserName, setMovieDetail } from "./user/userSlice"
import "./Banner.css"
import { useHistory } from 'react-router';
function Banner() {
    const [movie, setMovie] = useState([]);
    const username = useSelector(selectUserName);
    const dispatch = useDispatch();
    const history = useHistory();
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[Math.floor(Math.random() * request.data.results.length - 1)]
            );
        }
        fetchData();
    }, [])

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    function moreDetails() {
        dispatch(setMovieDetail({
            movie: movie
        }))
        history.push(`./${movie.id}`)
    }

    function redirect() {
        history.push("./watchlater")
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(
                    "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
                backgroundPosition: "center center",
            }}
        >
            {/*background image*/}
            <div className="banner__contents">
                {/* Title */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                {/* div > 2 buttons */}
                <div className="banner__buttons">
                    {username &&
                        <>
                            <button onClick={() => moreDetails()} className="banner__button">Play</button>
                            <button onClick={() => redirect()} className="banner__button">My List</button>
                        </>
                    }
                </div>
                {/* description */}
                <h1 className="banner__description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    )
}

export default Banner
