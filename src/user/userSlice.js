import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
    email: "",
    photo: "",
    movie: {},
    favourites: [],
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.photo = action.payload.photo;
        },

        setSignOutState: state => {
            state.name = null;
            state.email = null;
            state.photo = null;
        },

        setMovieDetail: (state, action) => {
            state.movie = action.payload.movie
        },

        resetMovieDetail: state => {
            state.movie = {};
        },

        setFavourites: (state, action) => {
            state.favourites = action.payload.favourites;
        },

        resetFavourites: state => {
            state.favourites = [];
        }
    },
})

export const { setUserLoginDetails, setSignOutState, setMovieDetail, resetMovieDetail, setFavourites, resetFavourites } = userSlice.actions;

export const selectUserName = state => state.user.name;
export const selectUserEmail = state => state.user.email;
export const selectUserPhoto = state => state.user.photo;
export const selectMovieDetails = state => state.user.movie;
export const selectFavourites = state => state.user.favourites;

export default userSlice.reducer;