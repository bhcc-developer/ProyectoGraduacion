const { Schema, model} = require('mongoose')
const Types = Schema.Types

const UserSchema = new Schema({
    email:{type: Types.String, required: true},
    username: {type: Types.String, required:true,unique:true, index:true},
    password: {type: Types.String, required: true},
    rol: {type: Types.String, required:true}
},{
    timestamps:true
})


module.exports = model('User', UserSchema)