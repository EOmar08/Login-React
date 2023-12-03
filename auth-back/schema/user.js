const bcrypt = require('bcrypt')
const { pool } = require('../db')
const { generateAccessToken, generateRefreshToken } = require('../auth/generateTokens')
// const { tokenSchema } = require('./token')

// const userSchema = {
//   id: { type: 'int', primaryKey: true, autoIncrement: true },
//   username: { type: 'string', length: 50, unique: true, notNull: true },
//   password: { type: 'string', length: 50, notNull: true },
//   name: { type: 'string', length: 50, notNull: true },
// };

const saveUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 10)
  user.password = hashedPassword

  const [rows] = await pool.execute('INSERT INTO singup (name, username, password) VALUES (?, ?, ?)', [user.name, user.username, user.password])
  return rows.insertId
};

const usernameExist = async function (username) {
  try {
    const [rows] = await pool.execute('SELECT * FROM singup WHERE username = ?', [username])
    return rows.length > 0
  } catch (error) {
    console.error('Error al verificar si el nombre de usuario existe:', error.message)
    throw error
  }
}

const comparePassword = async function (password, hashedPassword) {
  const samePassword = await bcrypt.compare(password, hashedPassword)
  return samePassword
}


const createAccessToken = function () {
  return generateAccessToken(getUserInfo(this))
}

const createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this))
  try {
    await pool.execute('INSERT INTO token (token) VALUES (?)', [refreshToken])
    return refreshToken;
  } catch (error) {
    console.log(error)
    throw error
  }
};

module.exports = {
  // userSchema,
  saveUser,
  usernameExist,
  comparePassword,
  createAccessToken,
  createRefreshToken,
};




