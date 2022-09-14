const config= require('./utils/config')
const express= require('express')
const app= express()
const cors= require('cors')
const logger= require('./utils/logger')
const middleware= require('./utils/middleware')
const mongoose= require('mongoose')
const notesRouter= require('./routers/mongo') // import router
const userRouter= require('./routers/users')


logger.info('connecting to: ' + config.MONGO_URI)

// connect database
mongoose.connect(config.MONGO_URI).then(()=>{
	logger.info('DataBase connect successfully.')
}).catch((err)=>{
	logger.error('error connecting MongoDB: ' + err.message)
})

app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

// asign Router
app.use(('/api/notes'), notesRouter) 
app.use('/api/users', userRouter)

app.use(middleware.unknowEndPoint)
app.use(middleware.errorHandler)


app.get(('/'), (req, res)=>{
	res.send('CRUD MongoDB and Mongoose.')
})

module.exports= app