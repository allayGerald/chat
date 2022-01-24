const Post = require('../models/Post')

exports.store = async (req, res) => {
  const {content} = req.body
  if (!req.content) {
    return res.sendStatus(500)
  }

  const post = await Post.create({content})
}