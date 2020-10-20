import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

export const addCategory = asyncHandler( async(req, res, next) => {
    const {name} = req.body;

    const exists = await Category.findOne({name});
    if (exists) {
        res.status(400)
        throw new Error(`${name} already exists`)
    }

    const category = await Category.create({name})
    if (category) {
        return res.json(category)
    } else {
        throw new Error('error adding category')
    }
})
