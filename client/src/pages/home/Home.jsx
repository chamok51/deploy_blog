import { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../componente/header/Header'
import Posts from '../../componente/posts/Posts'
import SideBar from '../../componente/sidebar/SideBar'
import './home.css'
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts] = useState([])
  const { search } = useLocation()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('/posts' + search)
      setPosts(res.data)
    }
    fetchPost()
  }, [search])

  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <SideBar />
      </div>
    </>
  )
}

export default Home
