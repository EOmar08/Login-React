const router = require('express').Router()
const { jsonResponse } = require('../lib/jsonResponse')
const { pool } = require('../db')
const { comparePassword, createAccessToken, createRefreshToken} = require('../schema/user')
const { getUserInfo } = require('../lib/getUserInfo')


router.post('/', async(req, res) => {
    const { username, password } = req.body

    if (!!!username || !!!password) {
        return res.status(400).json(
            jsonResponse(400, {
                error: 'Los elementos son requeridos'
            })
        )
    }

    try {
        //Consulta SQL para buscar el usuario
        const [rows] = await pool.execute('SELECT * FROM singup WHERE username = ?', [username]);
        if (rows.length > 0) {        
            const user = rows[0];
            console.log('Usuario encontrado:', user);
            
            //verificar si la contraseña es igual por medio de la función comparePassword
            const correctPassword = await comparePassword(password, user.password);
            console.log(correctPassword)

            if (correctPassword) {
                
                const accessToken = createAccessToken(user)
                const refreshToken = await createRefreshToken(user)
                res.status(200).json(jsonResponse(200, { user: getUserInfo(user) , accessToken, refreshToken }))
            } else {
                res.status(400).json(
                    jsonResponse(400, {
                        error: 'Usuario o contraseña incorrecta'
                    })
                )
            }
        } else {
            res.status(400).json(
                jsonResponse(400, {
                    error: 'Usuario no encontrado'
                })
            )
        }
    } catch (error) {
        console.error('Error al buscar el usuario:', error.message)
        res.status(500).json(
            jsonResponse(500, {
                error: 'Error interno del servidor'
            })
        )
    }
})

module.exports = router
