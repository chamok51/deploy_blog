import { useLocation, useNavigate } from 'react-router-dom'
import './single.css'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const Single = () => {
  const { user } = useContext(Context)
  const [post, setPost] = useState({})
  const [update, setUpdate] = useState(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const location = useLocation()
  const path = location.pathname.split('/')[2]
  const PF = 'http://localhost:5000/images/'
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get('/posts/' + path)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
    }
    fetchPost()
  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      })
      navigate('/')
    } catch (error) {}
  }
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      })
      window.location.reload()
    } catch (error) {}
  }

  return (
    <div className='singlePost' key={post._id}>
      <div className='singlePostWrapper'>
        {post.img && (
          <img src={PF + post.img} alt='' className='singlePostImg' />
        )}
        {update ? (
          <input
            type='text'
            value={title}
            className='updateInputTitle'
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className='singlePostTitle'>
            {post.title}
            {user?.username === post.username && (
              <div className='singlePostEdit'>
                <i
                  className='singlePostIcon fa-solid fa-pen-to-square'
                  onClick={() => setUpdate(true)}
                ></i>
                <i
                  className='singlePostIcon fa-solid fa-trash'
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}
        <div className='singlePostInfo'>
          <span key={post._id}>
            Author:
            <Link className='link' to={`/?user=${post.username}`}>
              <b>{post.username}</b>
            </Link>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        {update ? (
          <textarea
            className='updateDesc'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        ) : (
          <p className='singlePostDetails'>{post.desc}</p>
        )}
        {update && (
          <button className='updateButton' onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  )
}

export default Single
