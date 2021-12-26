import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { selectUserEmail, setMovieDetail } from '../user/userSlice';
import "./Card.css"
function Card({ movie, removedId }) {
    const base_url = "https://image.tmdb.org/t/p/original/";
    const history = useHistory();
    const userEmail = useSelector(selectUserEmail);
    const dispatch = useDispatch();
    if (userEmail === null || userEmail === "") {
        history.push("/");
    }
    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    const movieDescription = (movie) => {
        dispatch(setMovieDetail({
            movie: movie
        }))
        history.push(`./${movie.id}`)
    }

    const removeMovie = async () => {
        removedId(movie.currentId);
    }

    return (
        <div className="card">
            <section onClick={() => movieDescription(movie)} className="card__left">
                <img
                    src={`${base_url}${movie.backdrop_path}`}
                    className="card__image"
                />
                <div className="card__overviewContainer">
                    <h1 className="card__heading">
                        {movie?.name || movie?.title || movie?.original_title}
                    </h1>
                    <p className="card__overview">{truncate(movie?.overview, 50)}</p>
                </div>
            </section>
            <div className="card__buttonContainer">
                <button onClick={() => removeMovie()} className="card__button">Delete</button>
            </div>
        </div>
    )
}

export default Card
