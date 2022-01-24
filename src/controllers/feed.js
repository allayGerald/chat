const Post = require('../models/Post')
const User = require('../models/User')
const socket = require('../socket')
const path = require('path')

exports.store = async (req, res) => {
  const { content } = req.body

  if (!content) {
    return res.status(422).json({error: 'message is required'})
  }
  const io = req.io
  const user = req.session.userId
  const post = await Post.create({ content, user })

  const today = new Date().toLocaleString('en-TZ', { timeZone: 'Africa/Nairobi' })
  const time = today.split(', ')[1]

  io.emit('message', { message: content, user: req.session.userName, time })

  return true
}

exports.list = async (req, res) => {
  const messages = await Post.find().populate('user', '-password')
const users = await User.find().select('-password')
  res.render('feed', { messages, users })
}
