const jwt = require('jsonwebtoken')
const { resolve } = require('path')
const { unlinkSync } = require('fs')

module.exports = {

    verifyToken: async (req, res, next) => {
        try {
            if (!req.headers.authorization) {
                if(req.file) unlinkSync( resolve('./src/public/'+ req.file.filename))
                return res.status(401)
                .json({message: 'Unauhtorized Request', error: true});
            }

            let token = req.headers.authorization.split(' ')[1];

            if (token === 'null') {
                if(req.file) unlinkSync( resolve('./src/public/'+ req.file.filename))
                return res.status(401)
                .json({message: 'Unauhtorized Request', error: true});
            }

            const payload = await jwt.verify(token, 'bryanCarias');

            if (!payload) {
                if(req.file) unlinkSync( resolve('./src/public/'+ req.file.filename))
                return res.status(401)
                .json({message: 'Unauhtorized Request', error: true});
            }

            req.iduser = payload.iduser
            req.rol = payload.rol

            next();

        } catch (error) {
            return res.status(502)
            .json({message: error.message, error: true});
        }
    }
}
