const router = require('express').Router()
const getTokenFromHeader = require('../auth/getTokenFromHeader')
const { verifyRefreshToken } = require('../auth/verifyTokens')
const { jsonResponse } = require('../lib/jsonResponse')
const { pool } = require('../db')
const { generateAccessToken } = require('../auth/generateTokens')

router.post('/', async (req, res) => {

  const refreshToken = getTokenFromHeader(req.headers)
  // console.log(req.headers);
  // console.log("refreshToken:", refreshToken);

  if (refreshToken) {
    try {
      const [found] = await pool.query('SELECT * FROM token WHERE token = ?', [refreshToken])
      // console.log("FOUND:", found.id_token);
      const tokenResult = found[0]; 
        // console.log("IDDDDDDDDDDDDDDD TOKEN:", tokenResult.id_token);
        // console.log("TOKEEEEEEEN:", tokenResult.token);
        // console.log(" ");
      if (!tokenResult) {
        return res.status(401).json(jsonResponse(401, { error: "No autorizado" }))
      }else{
        
        const payload = verifyRefreshToken(tokenResult.token)
        // console.log("PAYLOAD:", tokenResult.token); 
        if (payload) {
          const accessToken = generateAccessToken(payload)
          return res.status(200).json(jsonResponse(200, { accessToken }))
        } else {
          return res.status(401).json(jsonResponse(401, { error: "No autorizado" }))
        }
      }

    } catch (error) {

      return res.status(401).json(jsonResponse(401, { error: "No autorizado" }))
    }
  } else {
    res.status(401).json(jsonResponse(401, { error: "No autorizado" }))
  }
})
module.exports = router
