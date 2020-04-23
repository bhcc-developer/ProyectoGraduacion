const {Router} = require('express')
const router = Router()
const { uploadFile, files, fileProcess } = require('../controllers/files.controller')
const { verifyToken } = require('../helpers/auth.helper')

router.post('/upload-file',verifyToken, uploadFile )
router.get('/files',verifyToken, files )
router.post('/fileprocess',verifyToken, fileProcess )

module.exports = router