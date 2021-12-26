import React, { useEffect, useState } from 'react';
import axios from "./axios";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectUserName, setMovieDetail } from "./user/userSlice"
import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const username = useSelector(selectUserName);
    const [movies, setMovies] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results)
            return request;
        }
        fetchData();
        // fetchUrl is variable outside block
    }, [fetchUrl]);

    const handleClick = (movie) => {
        if (username === null) {
            alert("Please Login before")
            history.push("./");
            return;
        }
        dispatch(
            setMovieDetail({
                movie: movie,
            })
        )
        history.push(`./${movie.id}`)

        // if (username) {
        //     if (trailerUrl) {
        //         setTrailerUrl("");
        //     } else {
        //         movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        //             .then((url) => {
        //                 const urlParams = new URLSearchParams(new URL(url).search);
        //                 setTrailerUrl(urlParams.get('v'));
        //             })
        //             .catch((error) => console.log(error));
        //     }
        // }
        // else {
        //     alert("No user found please login")
        // }

    }

    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>

            <div className="row__posters">
                {/* <div> */}
                {/* row posters */}
                {movies.map(movie => (

                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />

                ))}
            </div>
            {/* {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />} */}
        </div>
    )
}

export default Row
