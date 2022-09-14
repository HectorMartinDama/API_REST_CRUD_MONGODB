const mongoose= require('mongoose')


const userSchema= new mongoose.Schema({
	username:{
		type: String,
		unique: true
	},
	name: {
		type: String,
		unique: true
	},
	passwordHash:{
		type: String,
		unique: true
	},
	notes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Note'
		}
	]
})


userSchema.set('toJSON', {
	transform: (document, returnedObject)=>{
		returnedObject.id=returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__V
		delete returnedObject.passwordHash
	}
})

// export schema
module.exports= mongoose.model('User', userSchema)