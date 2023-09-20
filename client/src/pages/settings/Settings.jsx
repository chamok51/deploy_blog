import { useContext, useState } from 'react'
import SideBar from '../../componente/sidebar/SideBar'
import './settings.css'
import { Context } from '../../context/Context'
import axios from 'axios'

const Settings = () => {
  const { user } = useContext(Context)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [file, setFile] = useState(null)
  const PF = 'http://localhost:5000/images/'

  const handleSubmit = async (e) => {
    e.preventDefault()

    const updateUser = {
      userId: user._id,
      username,
      email,
      password,
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('name', fileName)
      data.append('file', file)
      updateUser.profilePic = fileName
      try {
        await axios.post('/upload', data)
      } catch (error) {}

      try {
        const res = await axios.put('/users/' + user._id, updateUser)
        console.log(res.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <div className='settings'>
      <div className='settingsWrapper'>
        <div className='settingsTitle'>
          <span className='settingsUpdateTitle'>Update Your Profile</span>
          <span className='settingsDeleteTitle'>Delete Your Account</span>
        </div>
        <form className='settingsForm' onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className='settingsDP'>
            <img
              className='writeImg'
              src={
                user.profilePic
                  ? PF + user.profilePic
                  : URL.createObjectURL(file)
              }
              alt=''
            />

            <label htmlFor='fileInput'>
              <i className='settingsDPIcon fa-solid fa-user'></i>
            </label>
            <input
              type='file'
              id='fileInput'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type='text'
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type='email'
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type='password'
            placeholder='*******'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='settingsButton' type='submit'>
            Update
          </button>
        </form>
      </div>
      <SideBar />
    </div>
  )
}

export default Settings
