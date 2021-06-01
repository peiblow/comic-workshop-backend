const express = require('express')
const routes = express.Router()

const multer = require('multer')
const multerService = require('./middlewares/multer-file')
const authMiddleware = require('./middlewares/auth')

const UserController = require('./controllers/user-controller')
const ComicController = require('./controllers/comic-controller')

routes.get('/', (_, res) => res.status(200).send('ok'))

routes.post('/register', UserController.create)
routes.post('/auth', UserController.auth)

routes.get('/comics', authMiddleware, ComicController.all)
routes.post('/comics', authMiddleware, multer(multerService).single('comic'), ComicController.create)
routes.get('/comics/:id', authMiddleware, ComicController.show)
routes.delete('/comics/:id', authMiddleware, ComicController.delete)
routes.put('/comics/:id', authMiddleware, ComicController.update)

module.exports = routes
