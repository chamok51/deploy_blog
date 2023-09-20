import './singlepost.css'
import { Link } from 'react-router-dom'

const SinglePost = ({ post }) => {
  const PF = 'http://localhost:5000/images/'

  return (
    <div className='singlePosts'>
      {post.img && <img src={PF + post.img} alt='' className='postImg' />}
      <div className='postInfo'>
        <div className='postCats'>
          {post.category.map((c) => (
            <span className='postCat'>{c.name}</span>
          ))}
        </div>
        <Link key={post._id} className='link' to={`/postDetails/${post._id}`}>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>
          {new Date(post.createdAt).toDateString()}
        </span>
        <p className='postDesc'>{post.desc}</p>
      </div>
    </div>
  )
}

export default SinglePost
