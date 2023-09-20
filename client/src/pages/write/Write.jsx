import { useContext, useState } from 'react'
import './write.css'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'
import axios from 'axios'

const Write = () => {
  const { user } = useContext(Context)
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newPost = {
      username: user.username,
      title,
      desc,
    }
    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      newPost.img = fileName
      try {
        await axios.post('/upload', data)
      } catch (error) {}
    }
    try {
      const res = await axios.post('/posts/', newPost)
      navigate(`/postDetails/${res.data._id}`)
    } catch (error) {}
  }

  return (
    <div className='write'>
      {file && (
        <img className='writeImg' src={URL.createObjectURL(file)} alt='' />
      )}
      <form className='writeForm' onSubmit={handleSubmit}>
        <div className='writeFormGroup'>
         
          <label htmlFor='fileInput'>
            <i className='writeIcon fas fa-plus'></i>
          </label>
          <input
            id='fileInput'
            type='file'
            style={{ display: 'none' }}
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            className='writeInput'
            autoFocus={true}
            type='text'
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='writeFormGroup'>
          <textarea
            className='writeInput writeText'
            placeholder='Tell your story...'
            type='text'
            autoFocus={true}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <button className='writeSubmit' type='submit'>
          Publish
        </button>
      </form>
    </div>
  )
}

export default Write
