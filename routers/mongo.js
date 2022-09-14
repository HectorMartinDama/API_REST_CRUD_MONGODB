const Note= require('../models/note') // import schema
const User= require('../models/user')
const notesRouter= require('express').Router() // create router


notesRouter.post(('/'), async (req, res)=>{
	const body= req.body
	const user= await User.findById(body.userId)

	if(body.content === undefined){
		res.status(400).json({error: 'content missing'})
	}
	// create new note in database.
	const note= new Note({
		content: body.content,
		date: new Date,
		important: body.important,
		user: user._id
	})
	// save note
	const savedNote= await note.save()
	user.notes= user.notes.concat(savedNote._id)
	await user.save()

	res.json(savedNote)
})

notesRouter.get(('/'), async (req, res) => {
	const notes= await Note.find({}).populate('user', {username: 1, name: 1})
	res.send(JSON.stringify(notes))
})

notesRouter.get(('/:id'), (req, res)=>{
	Note.findById(req.params.id).then(note=>{
		res.send(JSON.stringify(note))
	})
})


notesRouter.delete(('/:id'), (req, res, next)=>{
	Note.findByIdAndDelete(req.params.id).then(()=>{
		res.status(204).end()
	}).catch(err => next(err))
})


// export module
module.exports = notesRouter

