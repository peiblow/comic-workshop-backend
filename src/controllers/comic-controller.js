const ComicModel = require('../models/comic-model')
const getUserByToken = require('../services/getUserByToken')

class ComicController {
  constructor () {
    this.all = this.all.bind(this)
    this.create = this.create.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async all (req, res) {
    try {
      const comics = await ComicModel.find().sort('-createdAt')
      res.status(200).json(comics)
    } catch (err) {
      return res.status('500').send({
        message: 'Ocorreu um erro no servidor... ',
        erro: err
      })
    }
  }

  async create (req, res) {
    try {
      const { title, authorId, gender, description } = req.body
      const { filename } = req.file

      if (!title | !authorId | !gender | !description) {
        throw Error('Esta faltando paramentro')
      }

      const userId = getUserByToken(req.headers.authorization)
      const ComicInfo = {
        title,
        authorId: userId,
        gender,
        description,
        rating: 1.5,
        comicUrl: `/data/comics/${filename}`
      }

      const comic = await ComicModel.create(ComicInfo)

      res.status(200).json(comic)
    } catch (err) {
      return res.status('500').send({
        message: 'Ocorreu um erro no servidor... ',
        erro: err
      })
    }
  }

  async show (req, res) {
    try {
      const { id } = req.params
      const comic = await ComicModel.findById(id)
      return res.json(comic)
    } catch (err) {
      return res.status('500').send({
        message: 'Ocorreu um erro no servidor... ',
        erro: err
      })
    }
  }

  async update (req, res) {
    try {
      const { id } = req.params
      const comic = await ComicModel.findByIdAndUpdate(id, req.body)
      await comic.save()

      return res.json(comic)
    } catch (err) {
      return res.status('500').send({
        message: 'Ocorreu um erro no servidor... ',
        erro: err
      })
    }
  }

  async delete (req, res) {
    try {
      const { id } = req.params
      const comic = await ComicModel.findByIdAndDelete(id)

      res.status(200).json(comic)
    } catch (err) {
      return res.status('500').send({
        message: 'Ocorreu um erro no servidor... ',
        erro: err
      })
    }
  }
}

module.exports = new ComicController()
