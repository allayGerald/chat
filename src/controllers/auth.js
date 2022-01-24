const User = require('../models/User')
const { hashPassword, compare } = require('../services/authService.js')
const socket = require('../socket')

exports.register = async (req, res) => {
  const { userName, password } = req.body

  const hashedPassword = await hashPassword(password)
  const user = await User.create({ password: hashedPassword, userName })
  req.session.userName = userName
  req.session.userId = user._id

  const today = new Date().toLocaleString('en-TZ', { timeZone: 'Africa/Nairobi' })
  const time = today.split(', ')[1]
  notify('join', `${userName} has joined the chat`, time)

  return res.status(200).redirect('feed')
}

exports.login = async (req, res) => {
  const { userName, password } = req.body

  const user = await User.findOne({ userName })

  if (!user) {
    return res.status(401)
      .redirect('/?wrong userName or password', { error: 'wrong userName or password' })
  }

  const isAuth = await compare(password, user.password)

  if (!isAuth) {
    return res.status(401).redirect('/?error=wrong username or password')
  }

  req.session.userName = userName
  req.session.userId = user._id

  const today = new Date().toLocaleString('en-TZ', { timeZone: 'Africa/Nairobi' })
  const time = today.split(', ')[1]
  notify(`${userName} has joined the chat`, 'Chat Bot', time)
  return res.status(200).redirect('feed')
}


function notify (message, user, time) {
  const io = socket.getIO()
  console.log(message, user, time)
  io.emit('message', { message, user, time })
}