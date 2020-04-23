const express = require('express')
const multer = require('multer')
const path = require('path')
const { UserRouter, FileRouter } = require('./routes')

const app = express();
require('./database')

app.set('port', process.env.PORT || 4000)

const storage = multer.diskStorage({
    destination: path.join(__dirname, '/public'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime()+path.extname( file.originalname )  )
    }
})

app.use( express.json() )
app.use( multer({storage}).single('image') )


app.use( '/api', UserRouter )
app.use( '/api', FileRouter )

app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
});