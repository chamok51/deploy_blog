import './header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className='headerTitles'>
        <span className='headerImgTitleSm'>React & Node</span>
        <span className='headerImgTitleLg'>Blog</span>
      </div>
      <img
        src='https://images.pexels.com/photos/23547/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        alt=''
        className='headerImg'
      />
    </div>
  )
}

export default Header
