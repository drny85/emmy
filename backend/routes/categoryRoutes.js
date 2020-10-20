
import express from 'express'


const router = express.Router()

import {addCategory} from '../controllers/categoryController.js'
import {protect, admin} from '../middleware/protectMiddleware.js'


router.route('/').post(protect,admin, addCategory)

export default router;