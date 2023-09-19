import { Route, Routes } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
// import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
// import { useState } from "react";
import Nav from "./components/Nav";
import store, { loggedIn } from "./store";
import { Provider, useDispatch, useSelector } from "react-redux";
import Member from "./pages/Member";
import Login from "./pages/Login";
// import Example from "./example/Example";
import Logout from "./pages/Logout";
import Main from "./pages/Main";
import { useEffect } from "react";
import { collection, doc, getDoc, getFirestore } from "firebase/firestore";
import Modify from "./pages/Modify";
import Findemail from "./pages/Findemail";



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
  const userState = useSelector(state => state.user)
  console.log(userState)

  const dispatch = useDispatch()
  const uid = sessionStorage.getItem("users")
  console.log(uid)
  useEffect(()=>{
    const fetchUser = async () => {
      if(!uid) return
      const userDoc = doc(collection(getFirestore(),"users"),uid)
      console.log(userDoc)

      try{
        const docSnapshot = await getDoc(userDoc)
        console.log(docSnapshot)
        if(docSnapshot.exists()){
          const userData = docSnapshot.data()
          dispatch(loggedIn(userData))
        }
      }catch(error){
        console.log(error)
      }
    }
    fetchUser()
  },[dispatch, uid])



  return(
    <ThemeProvider theme={DarkMode}>
      <GlobalStyle />
      <Aside/>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/" element={<Example />} /> */}
        <Route path="/member" element={<Member />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/modify" element={<Modify />} />
        <Route path="/findemail" element={<Findemail />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;
