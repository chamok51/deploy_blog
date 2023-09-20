import { useContext, useEffect, useState } from 'react'
import './sidebar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'

const SideBar = () => {
  const [cat, setCat] = useState([])
  const { user } = useContext(Context)
  const PF = 'http://localhost:5000/images/'

  useEffect(() => {
    const fetchCat = async () => {
      const res = await axios.get('/category')
      setCat(res.data)
    }
    fetchCat()
  }, [])

  return (
    <div className='sideBar'>
      <div className='sideBarItems'>
        <span className='sideBarTitle'>ABOUT ME</span>
        {user && user.profilePic ? (
          <img src={PF + user.profilePic} alt='' className='sideBarImg' />
        ) : (
          <img
            src='https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
            alt=''
            className='sideBarImg'
          />
        )}
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit
          blanditiis nemo dolor amet excepturi debitis explicabo molestias
          architecto aperiam
        </p>
      </div>
      <div className='sideBarItems'>
        <span className='sideBarTitle'>CATEGORIES</span>
        <ul className='sideBarList'>
          {cat.map((c) => {
            return (
              <Link key={c._id} className='link' to={`/?cat=${c.name}`}>
                <li key={c._id} className='sideBarItemList'>
                  {c.name}
                </li>
              </Link>
            )
          })}
        </ul>
      </div>
      <div className='sideBarItems'>
        <span className='sideBarTitle'>FOLLOW US</span>
        <div className='sideBarSoical'>
          <i className='sideBarSocialIcon fa-brands fa-facebook'></i>
          <i className='sideBarSocialIcon fa-brands fa-square-instagram'></i>
          <i className='sideBarSocialIcon fa-brands fa-x-twitter'></i>
          <i className='sideBarSocialIcon fa-brands fa-youtube'></i>
        </div>
      </div>
    </div>
  )
}

export default SideBar
