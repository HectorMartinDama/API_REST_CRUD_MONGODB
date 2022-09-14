require('dotenv').config()


const PORT= process.env.EXPRESS_PORT
const MONGO_URI= process.env.MONGO_URI


module.exports={
	PORT,
	MONGO_URI
}