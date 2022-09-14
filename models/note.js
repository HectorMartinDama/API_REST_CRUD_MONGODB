const mongoose= require('mongoose')

// create schema
const noteSchema= new mongoose.Schema({
	content: {
		type: String,
		minlength: 5,
		required: true,
		unique: true
	},
	date: {
		type: Date,
		required: true
	},
	important: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
})

// delete the information that does not interest me to print o send.
noteSchema.set('toJSON', {
	transform: (document, returnedObject)=>{
		returnedObject.id= returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.id
	}
})

// export Schema
module.exports = mongoose.model('Note', noteSchema)
