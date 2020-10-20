
import express from 'express'


const router = express.Router()

import {addCategory} from '../controllers/categoryController.js'


router.route('/').post(addCategory)

export default router;