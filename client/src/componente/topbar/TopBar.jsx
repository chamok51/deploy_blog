import { useContext } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const TopBar = () => {
  const { user, dispatch } = useContext(Context)
  const PF = 'http://localhost:5000/images/'

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  return (
    <div className='topBar'>
      <div className='topLeft'>
        <i className='topIcon fa-brands fa-facebook'></i>
        <i className='topIcon fa-brands fa-square-instagram'></i>
        <i className='topIcon fa-brands fa-x-twitter'></i>
        <i className='topIcon fa-brands fa-youtube'></i>
      </div>
      <div className='topCenter'>
        <ul className='topList'>
          <li className='listItem'>
            <Link className='link' to='/'>
              HOME
            </Link>
          </li>
          <li className='listItem'>
            <Link className='link' to=''>
              ABOUT
            </Link>
          </li>
          <li className='listItem'>
            <Link className='link' to=''>
              CONTACT
            </Link>
          </li>
          <li className='listItem'>
            <Link className='link' to='/write'>
              WRITE
            </Link>
          </li>
          <li className='listItem' onClick={handleLogout}>
            {user && 'LOGOUT'}
          </li>
        </ul>
      </div>
      <div className='topRight'>
        {user ? (
          <Link to='/settings' className='link'>
            <img className='topImg' src={PF + user.profilePic} alt='' />
          </Link>
        ) : (
          <>
            <ul className='topList'>
              <li className='listItem'>
                <Link className='link ' to='/login'>
                  LOGIN
                </Link>
              </li>
              <li className='listItem'>
                <Link className='link ' to='/register'>
                  REGISTER
                </Link>
              </li>
            </ul>
          </>
        )}

        <i className='searchIcon fa-solid fa-magnifying-glass'></i>
      </div>
    </div>
  )
}

export default TopBar
