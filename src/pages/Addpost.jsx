import React from 'react'
import {Container} from '../components'
import PostForm from '../components/postform/PostForm'

function Addpost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default Addpost;