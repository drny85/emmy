import asyncHandler from 'express-async-handler'
import bscript from 'bcryptjs'

import User from '../models/userModel.js'
import { json } from 'express'
export const signUp = asyncHandler(async (req, res) => {
    const {email, password, name, lastName} = req.body

    const user = new User({name, password, email, lastName})

  
    const userSaved = await user.save()
    if (userSaved) {
        return res.json(userSaved)
    }
    
    res.status(400)
    throw new Error('an error ocurred')


})

