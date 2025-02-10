import React from 'react'
import { useDispatch } from 'react-redux'
import authservice from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
//for logout we need to import all above things
const Logoutbtn = () => {
    const dispatch = useDispatch()
    const logouthandler =()=>{
        authservice.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full' onClick={logouthandler}>Log-Out</button>
  )
}

export default Logoutbtn