import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeName } from '../store'

function Main() {
  const a = useSelector(state => state.user)
  const animal = useSelector(state => state.animal)
  const dispatch = useDispatch()


  return (
    <>
      <p>{a}</p>
      <p>{animal}</p>
      <button onClick={()=>{dispatch(changeName())}}>변경</button>
    </>
  )
}

export default Main