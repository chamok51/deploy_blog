const router = require('express').Router()
const User = require('../model/User')
const Post = require('../model/Post')

//create post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(500).json(error)
  }
})

//update post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        )
        res.status(200).json(updatedPost)
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(400).json('you can only update your post')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//delete post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await post.deleteOne()
        res.status(200).json('post deleted')
      } catch (error) {
        res.status(500).json(error)
      }
    } else {
      res.status(400).json('you can only delete your post')
    }
  } catch (err) {
    res.status(500).json(err)
  }
})

//get post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json(error)
  }
})

//get all post
router.get('/', async (req, res) => {
  const username = req.query.user
  const catName = req.query.cat
  try {
    let posts
    if (username) {
      posts = await Post.find({ username: username })
    } else if (catName) {
      posts = await Post.find({
        category: {
          $in: [catName],
        },
      })
    } else {
      posts = await Post.find()
    }
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
