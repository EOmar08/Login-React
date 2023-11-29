
const express = require('express')
const cors = require('cors')
const app = express()
const { pool } = require('./db')

require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors({
  origin: 'http://localhost:5173'
}))
app.use(express.json())

const connectToDatabase = async () => {
  try {
    const connection = await pool.getConnection()
    console.log('Conexión a la base de datos exitosa')
    connection.release()
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message)
    process.exit(1)
  }
};

connectToDatabase()

app.use('/api/login', require('./routes/login'))
app.use('/api/signup', require('./routes/signup'))
app.use('/api/signout', require('./routes/signout'))
app.use('/api/user', require('./routes/user'))
app.use('/api/refresh-token', require('./routes/refreshToken'))
app.use('/api/todos', require('./routes/todos'))


app.get('/', (req, res) => {
  res.send('Hello World!')
  
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})