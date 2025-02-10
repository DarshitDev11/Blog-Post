import React from 'react'
import appwriteService from '../appwrite/configration'
import {Link} from 'react-router-dom'//link use for whole card want to clickabel
 
//now we get post from appwrite 
const Postcard = ({$id,title,featuredimg}) => {
  return (
    <Link to={`/post/${$id}`} className="block">
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getfilepreview(featuredimg)} alt={title}
                className='rounded-xl'/>

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
        </Link>
  )
}

export default Postcard