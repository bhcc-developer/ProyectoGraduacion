const { connect } = require('mongoose')

connect('mongodb://localhost/proyectoGraduacion', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then(db => console.log('mongodb is connected') )
.catch(err => console.error(err) );
