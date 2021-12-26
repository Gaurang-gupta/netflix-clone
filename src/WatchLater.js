import React, { useEffect, useState } from 'react'
import "./Favourites.css"
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserName } from './user/userSlice';
import db from './firebase';
import { useHistory } from 'react-router';
import Card from './utils/Card';
function Favourites() {
    const username = useSelector(selectUserName);
    const userEmail = useSelector(selectUserEmail);
    const history = useHistory();
    const [movies, setMovies] = useState([]);
    const [id, setId] = useState("");
    if (username === null || username.length === 0) {
        history.push("/")
    }

    const getId = (id) => {
        setId(id);
    }

    const fetchMovies = async () => {
        let moviesSub = [];
        const data = await db?.collection('Users')?.doc(userEmail)?.collection("watchlist").get()
            .then(snapshot => {
                snapshot.docs.forEach(movie => {
                    let currentId = movie.id;
                    let appObj = { ...movie.data() };
                    let finalObj = {
                        ...appObj,
                        currentId
                    }
                    moviesSub.push(finalObj);
                })
            }).catch(e => console.error(e));
        setMovies(moviesSub);
    }

    useEffect(() => {
        fetchMovies();
        if (id.length !== 0) {
            db.collection("Users").doc(userEmail).collection("watchlist").doc(id).delete();
            setId('');
            fetchMovies();
        }
    }, [id])
    return (
        <div className="favourites">
            <h1 className="favourites__heading">{username}'s watchlater</h1>
            {
                movies && movies.map((movie) => (
                    <Card key={movie.id} movie={movie} removedId={getId} />
                ))
            }
        </div>
    )
}

export default Favourites
