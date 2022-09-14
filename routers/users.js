const bcrypt= require('bcrypt')
const User = require('../models/user')
const userRouter= require('express').Router()

userRouter.post(('/'), async (req, res)=>{
	const body= req.body

	// encrypt password
	const saltRounds= 10
	const passwordHash= await bcrypt.hash(body.password, saltRounds)

	const user= new User({
		username: body.username,
		user: body.user,
		passwordHash
	})
	const savedUser= await user.save()
	res.json(savedUser)
})


userRouter.get(('/'), async (req, res)=>{
    const users= await User.find({}).populate('notes', {content: 1, date: 1})
    res.send(JSON.stringify(users))
})


// export module
module.exports= userRouter