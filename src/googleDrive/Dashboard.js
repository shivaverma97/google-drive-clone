import React from 'react'
// import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

    // const navigate = useNavigate()

    // function handleOnClick(e){
    //     e.preventDefault()
    //     navigate(("/user"))     
    // }

  return (
    <>
        <ul>
        <li><a class="active" href="#home">Drive</a></li>
        <li class="profile"><a href="/user">Profile</a></li>
        </ul>
    </>
  )
}
