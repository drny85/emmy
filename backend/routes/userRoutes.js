
import express from 'express'

const router = express.Router()

import {signUp} from '../controllers/userController.js'


router.route('/').post(signUp)



export default router;