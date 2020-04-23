const { Schema, model } = require('mongoose')
const Types = Schema.Types

const FileSchema = new Schema({
    iduser: { type: Types.ObjectId },
    filename: { type: Types.String },
    original: { type: Types.String },
    procesado: { type: Types.Boolean, default: false}
},{
    timestamps:true
})

module.exports = model( 'File', FileSchema )

