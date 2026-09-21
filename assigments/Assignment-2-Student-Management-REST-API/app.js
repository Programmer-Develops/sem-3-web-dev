const express = require('express')
const studentRoutes = require('./routes/studentRoutes')
const logger = require('./middleware/logger')

const app = express()
const PORT = 8080

app.use(express.json())
app.use(logger)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Student Management REST API' })
})

app.use('/students', studentRoutes)

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})
