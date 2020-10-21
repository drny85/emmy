
import express from 'express'


const router = express.Router()

import {addCategory, getCategories} from '../controllers/categoryController.js'
import {protect, admin} from '../middleware/protectMiddleware.js'


router.route('/').post(protect,admin, addCategory).get(protect, admin, getCategories)

export default router;