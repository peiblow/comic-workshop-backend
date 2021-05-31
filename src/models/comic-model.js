const mongoose = require('mongoose')

const ComicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  comicUrl: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('comic', ComicSchema)
