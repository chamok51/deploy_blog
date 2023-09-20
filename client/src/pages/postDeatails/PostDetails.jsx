import './postDetails.css'
import SideBar from '../../componente/sidebar/SideBar'
import Single from '../../componente/postdetails/Single'

const PostDetails = () => {
  return (
    <div className='postDetails'>
      <Single />
      <SideBar />
    </div>
  )
}

export default PostDetails
