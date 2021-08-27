import path from 'path'
import express from 'express'
import multer from 'multer'
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    //   const paths=path.join(__dirname,'/upload')
    cb(null, 'uploads')
  },
  filename(req, file, cb) {
    //   console.log(file)
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,

  limits: {
    fileSize: 1024 * 1024 * 5
    },

  fileFilter: function (req, file, done) {
            checkFileType(file,done)
    }
    
})

router.post('/', upload.single('image'), (req, res) => {
    try {
    
        res.send(`${req.file.path}`)
    } catch (error) {
        console.log(error.message)
    }
   
})

export default router