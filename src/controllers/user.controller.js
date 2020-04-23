const { User } = require('../models')
const { compare, hash, genSalt } = require('bcryptjs')
const { sign } = require('jsonwebtoken')

module.exports = {

    signin:  async (req, res) => {
        try {
            
            const { username, password } = req.body

            const user = await User.findOne({username})
            
            if (!user) {
                return res.status(401)
                .json({message: 'The email doen\' exists',error:true});
            }
            if ( !comparePassword(password,user.password) ){
                return res.status(401)
                .json({message: 'Wrong Password',error:true});
            }

            const token = sign({iduser: user._id, rol: user.rol},'bryanCarias')

            return res.status(200).json({token, role: user.rol});

        } catch (error) {
            return res.status(502)
            .json({message: error.message , error:true});
        }
    },

    signup: async (req, res) => {
        try {
            const { email, username, password, rol } = req.body

            const user = await User.findOne({username: username})
            console.log(user)
            if(user){
                return res.status(401)
                .json({message: 'The Username is already Taken' , error:true});
            }

            const newUser = new User({
                email,
                username,
                password: await bcriptPassword(password),
                rol
            })

            await newUser.save()

            const token = sign({iduser: newUser._id, rol: newUser.rol},'bryanCarias')

            res.status(200).json({token, role: newUser.rol});

        } catch (error) {
            return res.status(502)
            .json({message: error.message , erro:true});
        }
    }
}


const bcriptPassword = async (password) => {
    return await hash(password, await genSalt(10))
}

const comparePassword = async (InPassword, HashPassword) => {
    return await compare(InPassword,HashPassword)
}