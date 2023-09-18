import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: {
        loggedIn : false,
        data : null,
        uid : null
    },
    reducers:{
        logIn : (state, action) => {
            state.loggedIn = true
            state.uid = action.payload
            // payload - 데이터를 보내주면 payload안에 다 들어옴
        },
        loggedIn : (state, action) => {
            state.loggedIn = true
            state.data = action.payload
        },
        logOut : (state) => {
            state.loggedIn = false
            state.data = null
            state.uid = null
        }
    }
    
})
let animal = createSlice({
    name: "animal",
    initialState: "고양이"
})

let dark = createSlice({
    name: "dark",
    initialState: "light",
    reducers:{
        toggleTheme: (state) => state === "light" ? "dark" : "light"
    }
})

export const {logIn, logOut, loggedIn} = user.actions
export const {changeName} = user.actions
export const {toggleTheme} = dark.actions
export default configureStore({
    reducer:{
        user : user.reducer,
        animal : animal.reducer,
        dark : dark.reducer
    }
})