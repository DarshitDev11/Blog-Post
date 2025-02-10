import React,{useState,useEffect} from 'react'
import appwriteService from '../appwrite/configration'
import { Container,postform } from '../components'
import { useParams,useNavigate } from 'react-router-dom'//it import for link to url
const EditPost = () => {
  return 
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getpost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <postform post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost