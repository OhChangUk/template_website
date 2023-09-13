import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import Nav from "./components/Nav";
import store from "./store";
import { Provider, useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";



function App() {
  
  console.log(process.env)


  return (
    <>
      <Provider store={store}>
        <Inner />
      </Provider>
    </>
  );
}

function Inner(){
  const light = {
    colors: {
      BgColor: "#e9f1f6",
      Primary: "orange",
      Secondary: "orangered",
      Color: '#000',
      ContentBg: '#fff'
    }
  }
  const dark = {
    colors: {
      BgColor: "#333",
      Primary: "#272929",
      Secondary: "#e9e9e9",
      Color: '#e9e9e9',
      ContentBg: '#272929'
    }
  }
  
  const theme = useSelector(state => state.dark)
  const DarkMode = theme === 'light' ? light : dark



  return(
    <ThemeProvider theme={DarkMode}>
      <GlobalStyle />
      <Aside/>
      <Nav/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/member" element={<Member />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;
