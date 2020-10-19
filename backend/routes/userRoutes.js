
import express from 'express'

const router = express.Router()

import {signUp} from '../controllers/userController'


router.route('/').post(signUp)



export default router;