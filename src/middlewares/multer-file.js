const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', 'data', 'comics'))
    },

    filename: (req, file, cb) => {
      crypto.randomBytes(5, (err, hash) => {
        if (err) cb(err)
        const fileName = `${hash.toString('hex')}-${file.originalname}`
        cb(null, fileName)
      })
    }
  }),

  dev: multer.memoryStorage()
}

module.exports = {
  dest: path.resolve(__dirname, '..', 'data', 'comics'),
  storage: storageTypes[process.env.STORAGE_TYPE],

  limits: {
    fileSize: 5 * 1024 * 1024
  }

  // fileFilter: (req, file, cb) => {
  //   const alllowMimes = [
  //     'image/jpeg',
  //     'image/pjpeg',
  //     'image/png',
  //     'image/gif'
  //   ]

  //   if (alllowMimes.includes(file.mimetype)) {
  //     cb(null, true)
  //   } else {
  //     cb(new Error('Invalid image type'))
  //   }
  // }
}
