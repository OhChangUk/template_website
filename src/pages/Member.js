import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { createUserWithEmailAndPassword, firebaseAuth } from './../firebase'
import {doc, setDoc, getFirestore, getDoc, updateDoc} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons' // faTriangleExclamation
import Modal from '../components/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../store'
// import { useEffect } from 'react'

const Container = styled.div`
  display: flex;
  background-color: #f5f5f5;
  justify-content: center;
  height: calc(100vh - 85px); align-items: center;
`
const errorMsg = (errorCode) => {
  const firebaseError = {
    'auth/advin-restricted-operation' : "빈 데이터가 있다.",
    'auth/email-already-in-use' : "이미 사용중인 이메일 주소",
    'auth/invlid-email' : "유효하지 않는 이메일 주소",
    'auth/operation-not-allowed' : "이메일/비밀번호 계정이 비활성화 되어 있습니다.",
    'auth/weak-password' : "너무 짧은 비밀번호를 사용하였습니다.(6자리)"
  }
  return firebaseError[errorCode] || '알 수 없는 에러가 발생했습니다.'
}

const SignUp = styled.div`
  width: 35vw; padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  background-color: #fff;
  border-radius: 10px;
  @media screen and (max-width: 1024px){
    width: 60vw;
  }
  @media screen and (max-width: 640px){
    width: 70vw;
  }
`
const Title = styled.h1`
  font-size: 24px; text-align: center; margin-bottom: 20px;
`
const Input = styled.input`
  width: 100%; padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px; box-sizing:border-box;
`
const Button = styled.button`
  width: 100%; padding: 10px;
  border-radius: 5px;
  background-color: #007bff;
  border: none;
  color: #fff; cursor: pointer;
`
const Password = styled.div`
  position: relative;
  width: 100%;
  svg{
    position: absolute;
    right: 10px; top: 11px;
    cursor: pointer;
  }
`




function Member() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [nickname, setNickname] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [eye, setEye] = useState([0,0])
  const [isModal, setIsModal] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userUid, setUserUid] = useState("")

  const initialMode = window.location.pathname.includes("member")

  useEffect(()=>{
    if(!initialMode){
      firebaseAuth.onAuthStateChanged((user)=>{
        if(user){
          setUserUid(user.uid)
        }
      })
      // 인증된 정보를 초기화해서 다시 가져오겠다는 함수
    }
  },[initialMode])

  useEffect(()=>{
    if(!initialMode && userUid){
      const fetchUserData = async ()=>{
        const userRef = doc(getFirestore(), "users", userUid)
        const userSnap = await getDoc(userRef)
        if(userSnap.exists()){
          const data = userSnap.data()
          setName(data.name)
          setNickname(data.nickname)
          setPhoneNumber(data.phoneNumber)
          setEmail(data.email)
        }
      }
      fetchUserData()
    }
  }, [initialMode,userUid])
  

  const toggleEye = (index) => {
    const newEye = [...eye]
    // 원래 있던 eye의 배열값을 복사해 배열을 벗긴다.
    // [[0,0]] > []하나 없애는게 ...표현 > 다시 말해서 같은값이 복사가 된다.
    newEye[index] = !newEye[index]
    // eye를 첫번째를 클릭했다면 newEye[0] = 부정 즉 false > true로 변경된다. [1,0]
    setEye(newEye)
    // 그리고 그 값을 쓰기 전용인 setEye에 새로운 배열값을 저장한다.
  }

  const PhoneNumber = (e) => {
    let value = e.target.value;

    e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3').replace(/-{1,2}$/g,"")


    // let value = e.target.value;
    // e.target.value = e.target.value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/-{1,2}$/g, "");
    setPhoneNumber(value)
}
  const isValidPhone = (phoneNumber) => {
    const regex = /^01[0-9]-[0-9]{3,4}-[0-9]{4}$/
    return regex.test(phoneNumber)
  }
  const isValidEmail = (email) =>{
    const regex = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/
    return regex.test(email)
  }

  const signUp = async (e) => {
    e.preventDefault()
    let errorMessage = ""
    if(name.length === 0){
      errorMessage = "이름"
    }else if(nickname.length === 0){
      errorMessage = "닉네임"
    }else if(!isValidPhone(phoneNumber)){
      setError("유효한 전화번호를 입력해주세요.")
      setIsModal(!isModal)
      return
    }else if(!isValidEmail(email)){
      setError("유효한 이메일을 입력해주세요.")
      setIsModal(!isModal)
      return
    }else if(password.length === 0 && initialMode){
      errorMessage = "비밀번호"
    }else if(passwordConfirm.length === 0 && initialMode){
      errorMessage = "비밀번호 확인"
    }else if(password !== passwordConfirm && initialMode){
      setError("비밀번호가 일치하지 않습니다.")
      setIsModal(!isModal)
    }
    if(errorMessage){
      setError(errorMessage + "이(가) 비어있습니다.")
      setIsModal(!isModal)
      return
    }
    try{
      
      const userProfile = {
        name,
        nickname,
        phoneNumber,
        email
      }
      
      if(initialMode){
        const {user} = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        await setDoc(doc(getFirestore(), "users", user.uid), userProfile)
        sessionStorage.setItem("users", user.uid)
        dispatch(logIn(user.uid))
        alert("회원가입이 완료되었습니다.")
      }else{
        if(userUid){
          const userRef = doc(getFirestore(), "users", userUid)
          await updateDoc(userRef, userProfile)
          alert("정보수정이 완료되었습니다.")
        }else{
          setError("회원정보가 없습니다.")
          setIsModal(!isModal)
          return
        }
      }
      navigate('/')
    }catch(error){
      setError(errorMsg(error.code))
      setIsModal(!isModal)
      console.log(error.code)
    }
  }
  const userState = useSelector(state => state.user)
  console.log(userState.loggedIn)
  
  

  return (
    <>
      {
        isModal &&
        <Modal error={error}  onClose={()=>{setIsModal(false)}}/> //isModal={isModal} setIsModal={setIsModal}
      }
      {
        userState.loggedIn && initialMode ? <Modal error="이미 로그인 중입니다." onClose={()=>{navigate('/')}} /> : 
        <Container>
          <SignUp>
            <Title>{initialMode ? "회원가입" : "정보수정"}</Title>
            {phoneNumber}
            <Input defaultValue={name} onChange={(e) => {setName(e.target.value)}} type='text' className='name' placeholder='이름' />
            <Input defaultValue={nickname} onChange={(e) => {setNickname(e.target.value)}} type='text' className='nickname' placeholder='닉네임' />
            <Input defaultValue={phoneNumber} onInput={PhoneNumber} maxLength={13} type='text' className='phone' placeholder='전화번호' />
            <Input defaultValue={email} onChange={(e) => {setEmail(e.target.value)}} type='email' className='email' placeholder='이메일' />
            {
              initialMode &&
              <>
                <Password>
                  <Input onChange={(e) => {setPassword(e.target.value)}} type={eye[0] ? 'text' : 'password'} className='password' placeholder='비밀번호' />
                  <FontAwesomeIcon icon={eye[0] ? faEye : faEyeSlash} onClick={()=>{toggleEye(0)}}/>
                </Password>
                <Password>
                  <Input onChange={(e) => {setPasswordConfirm(e.target.value)}} type={eye[1] ? 'text' : 'password'} className='confirm_password' placeholder='비밀번호 확인' />
                  <FontAwesomeIcon icon={eye[1] ? faEye : faEyeSlash} onClick={()=>{toggleEye(1)}}/>
                </Password>
              </>
            }
            <Button onClick={signUp}>{initialMode ? "가입" : "수정"}</Button>
          </SignUp>
        </Container>
      }
    </>
  )
}

export default Member