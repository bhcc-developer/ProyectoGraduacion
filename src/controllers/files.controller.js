const { File, MP } = require('../models')
const { resolve } = require('path')
const { unlinkSync } = require('fs')


module.exports = {
    
    uploadFile: async (req, res) => {
        try {

            const file = new File({
                iduser: req.iduser,
                filename: req.file.filename,
                original: req.file.originalname,
            });

            await file.save()

            res.status(200)
            .json(file);

        } catch (error) {
            return res.status(502)
            .json({message: error.message , error:true});
        }
    },


    files: async (req, res ) => {
        try {

            const files = await File.find({iduser: req.iduser})

            res.status(200)
            .json({files});
        } catch (error) {
            return res.status(502)
            .json({message: error.message , error:true});
        }
    },

    fileProcess: async (req, res) => {
        try {
            
            const { _id } = req.body

            const file = await File.findOne({_id})

            if (file) {

                const fileProcess = require(`../public/${file.filename}`)  
                
                fileProcess.variables.forEach( async (data) => {
                    const mp = new MP(data)
                    await mp.save()
                    await File.findByIdAndUpdate({_id},{
                        procesado:true
                    })
                });
            }
            
            return res.status(200)
           .json({message:'success'});


        } catch (error) {
            return res.status(502)
            .json({message: error.message , error:true});
        }
    }


}
