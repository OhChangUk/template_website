import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

function Modify() {
  const navigate = useNavigate()

  const userState = useSelector(state => state.user)
  console.log(userState.loggedIn)

  return (
    <>
      {
        userState.loggedIn === true ? "" : 
        <Modal error="로그인이 필요한 서비스입니다." onClose={()=>{navigate('/')}} />
      }
    </>
  )
}

export default Modify