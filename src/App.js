import { Route, Routes, useNavigate } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
// import Main from "./pages/Main";
import Aside from "./components/Aside";
import { ThemeProvider } from "styled-components";
// import { useState } from "react";
import Nav from "./components/Nav";
import store, { logIn, loggedIn } from "./store";
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
import Write from "./pages/Write";
import Service from "./pages/Service";
import Notice from "./pages/service/Notice";
import Online from "./pages/service/Online";
import Qna from "./pages/service/Qna";
import Gallery from "./pages/service/Gallery";
import View from "./pages/View";
import { useState } from "react";
import Modal from "./components/Modal";



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
  if(uid){
    dispatch(logIn(uid))
  }
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

  const[isModal, setIsModal] = useState(true)
  const navigate = useNavigate()

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
        <Route path="/write/:board" element={<Write />} />
        <Route path="/view/:board/:view" element={<View />} />
        <Route path="/view/:board" element={isModal && <Modal error="유효하지 않은 경로입니다." onClose={()=>{navigate('/')}}/>} />
        <Route path="/service" element={<Service />}>
          <Route path="notice" element={<Notice />}></Route>
          <Route path="online" element={<Online />}></Route>
          <Route path="qna" element={<Qna />}></Route>
          <Route path="gallery" element={<Gallery />}></Route>
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App;
