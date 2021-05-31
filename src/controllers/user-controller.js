const UserModel = require('../models/user-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')

class UserController {
  constructor () {
    this.create = this.create.bind(this)
    this.auth = this.auth.bind(this)
  }

  async create (req, res) {
    try {
      const { email, username } = req.body
      if (await UserModel.findOne({ email }) || await UserModel.findOne({ username })) {
        return res.status(400).json({ error: 'Usario já existente' })
      }

      const user = await UserModel.create(req.body)

      const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: 86400
      })
      res.status(200).json({ user, token })
    } catch (err) {
      return res.status('500').send({
        message: 'Ocorreu um erro no servidor... ',
        erro: err
      })
    }
  }

  async auth (req, res) {
    try {
      const { username, password, email } = req.body
      const userParam = username ? { username } : { email }

      const user = await UserModel.findOne(userParam).select('+password')

      if (!user) {
        return res.status(400).json('Usuario não encontrado')
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).json('Invalid password')
      }

      user.password = undefined

      const token = jwt.sign({ id: user._id }, authConfig.secret, {
        expiresIn: '7d'
      })

      return res.json({ user, token })
    } catch (err) {
      return res.status('500').send({
        message: 'Ocorreu um erro no servidor... ',
        erro: err
      })
    }
  }
}

module.exports = new UserController()
