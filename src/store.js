import { configureStore, createSlice } from "@reduxjs/toolkit";

let user = createSlice({
    name: "user",
    initialState: "홍길동",
    reducers:{
        changeName(state){return "테스트"}
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

export const {changeName} = user.actions
export const {toggleTheme} = dark.actions
export default configureStore({
    reducer:{
        user : user.reducer,
        animal : animal.reducer,
        dark : dark.reducer
    }
})