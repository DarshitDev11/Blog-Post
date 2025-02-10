import { useState ,useEffect } from 'react'
import {useDispatch} from 'react-redux'
import './App.css'
import authservice from './appwrite/auth'
import { login ,logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'

function App() {
   const [loading,setLoading] = useState(true)
   const dispatch = useDispatch()
   useEffect(()=>{
    authservice.getcurrentuser()//if any user present
    .then((userdata)=>{
      if (userdata) {
        dispatch(login({userdata}))//this will get userdata from store that use reducers
      } else {
        dispatch(logout())
      }
    })
    .finally(()=>{setLoading(false)})//it will work if no current user found setloading false
   },[])
  return !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
  <div className='w-full block'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

    </div>
    
    </div>) : null;
}

export default App
