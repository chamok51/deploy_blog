import SinglePost from '../post/SinglePost'
import './posts.css'

function Posts({ posts }) {
  return (
    <div className='posts'>
      {posts.map((post) => (
        <SinglePost post={post} key={post._id} />
      ))}
    </div>
  )
}

export default Posts
