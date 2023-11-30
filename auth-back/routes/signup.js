const router = require('express').Router();
const { json } = require('express');
const { jsonResponse } = require('../lib/jsonResponse');
const { userSchema, saveUser, usernameExist } = require('../schema/user');

router.post('/', async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: 'Los elementos son requeridos',
      })
    );
  }

  try {
    // Verificar si el nombre de usuario ya existe
    const exists = await usernameExist(username);  
    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: 'Este usuario ya existe',
        })
      );
    }else {
        // Crear usuario
        const user = { name, username, password };
        const userId = await saveUser(user);

        res.json(json(
            jsonResponse(200, {
                message: 'Usuario creado exitosamente',
                userId
            })
        ))
    
        res.json(json(200, { userId }));
    }



  } catch (error) {
    console.error('Error creando al usuario:', error.message);
    res.status(500).json(
      jsonResponse(500, {
        error: 'Error al crear usuario',
      })
    );
  }
});

module.exports = router;
