import asyncHandler from 'express-async-handler'
import bscript from 'bcryptjs'

import User from '../models/productModel'
export const signUp = asyncHandler(async (req, res) => {
    const {email, password, name, lastName} = req.body

    const user = new User({name, password, email, lastName})

    const salt = await bscript.genSalt(10)
    const hash = await bscript.hash(password, salt)
    user.password = hash
    const userSaved = await user.save()

    console.log(userSaved)
    return res.json({msg: 'yes'})

})

