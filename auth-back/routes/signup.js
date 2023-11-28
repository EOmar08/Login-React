const router = require('express').Router()
const { jsonResponse } = require('../lib/jsonResponse')

router.post('/', (req, res) => {
    const {name, username, password} = req.body

    if (!!!name || !!!username || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: 'Los elementos son requeridos'
            })
        )
    }

    //Crear el usuario: name, username, password
    res.status(200).json(jsonResponse(200, {message: 'Usuario creado'}))

    res.send('Signout')
})

module.exports = router