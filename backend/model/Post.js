const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: '',
    },
    desc: {
      type: String,
      requred: true,
    },
    username: {
      type: String,
      required: true,
    },
    category: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
