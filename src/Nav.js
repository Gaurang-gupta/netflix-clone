import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { auth, provider } from './firebase';
import { Link, useHistory } from 'react-router-dom';
import db from './firebase';
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState, selectUserEmail } from "./user/userSlice"
// import db from './firebase';
import "./Nav.css";
function Nav() {
    const [show, handleShow] = useState(false);
    const history = useHistory();
    const [showDropDown, handleShowDropDown] = useState(false);
    const dispatch = useDispatch();
    const username = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);
    const userEmail = useSelector(selectUserEmail);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) handleShow(true);
            else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        }
    }, [])

    useEffect(() => {
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                // history.push('/home');
            }
        })
        if (username !== null && userEmail !== null && username.length !== 0 && userEmail.length !== 0) {
            db.collection("Users").doc(userEmail).set({
                name: username,
                email: userEmail
            })
        }
    }, [userEmail, username]);



    const handleAuth = () => {
        if (!username) {
            auth.signInWithPopup(provider)
                .then((result) => {
                    console.log(result.user);
                    setUser(result.user);
                }).catch((error) => {
                    console.log(error);
                });
        }
        else if (username) {
            auth.signOut().then(() => {
                dispatch(setSignOutState());
                // history.push('/');
            }).catch((err) => console.log(err.message));
        }
        handleShowDropDown(false);
        // console.log(userEmail,username)
        history.push("/")
    };

    const setUser = (user) => {
        dispatch(
            setUserLoginDetails({
                name: user.displayName,
                email: user.email,
                photo: user.photoURL,
            })
        );
    };

    const setShowDropdown = (option) => {

        handleShowDropDown(() => (!showDropDown))
        if (option === "favourite") {
            history.push("./favourite")
        }
    }

    const home = () => {
        history.push('/');
    }

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="logo.png"
                alt="Netflix Logo"
                onClick={home}
            />
            {!username ?
                <button onClick={handleAuth} className="nav__btn">
                    Login
                </button>
                :
                <>
                    <img
                        onClick={() => setShowDropdown("image")}
                        className="nav__user"
                        src={userPhoto}
                        alt={username}
                    />
                    {showDropDown &&
                        <div className={`nav__options`}>
                            <ul className="nav__list">
                                <li onClick={() => setShowDropdown("favourites")} className="nav__option">
                                    <Link className="nav__link" to="/favourite">Favourites</Link>
                                </li>
                                <li onClick={() => setShowDropdown("watchlater")} className="nav__option">
                                    <Link className="nav__link" to="/watchlater">Watch Later</Link>
                                </li>
                                <li className="nav__option" onClick={handleAuth}>
                                    <Link className="nav__link" to="/mylist">Logout</Link>
                                </li>
                            </ul>
                        </div>
                    }
                </>
            }
        </div>
    )
}

export default Nav
